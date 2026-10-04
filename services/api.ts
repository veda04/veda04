export type ApiQueryValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| Array<string | number | boolean | null | undefined>;

export interface ApiRequestOptions
	extends Omit<RequestInit, "body" | "method"> {
	query?: Record<string, ApiQueryValue>;
	body?: unknown;
	method?: RequestInit["method"];
}

export interface ApiErrorDetails {
	status: number;
	url: string;
	payload?: unknown;
}

export class ApiError extends Error {
	status: number;

	url: string;

	payload?: unknown;

	constructor(message: string, details: ApiErrorDetails) {
		super(message);
		this.name = "ApiError";
		this.status = details.status;
		this.url = details.url;
		this.payload = details.payload;
	}
}

const DEFAULT_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
	process.env.API_BASE_URL?.trim() ||
	"";

function buildQueryString(query?: Record<string, ApiQueryValue>) {
	if (!query) {
		return "";
	}

	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null) {
			continue;
		}

		if (Array.isArray(value)) {
			for (const item of value) {
				if (item !== undefined && item !== null) {
					searchParams.append(key, String(item));
				}
			}
			continue;
		}

		searchParams.set(key, String(value));
	}

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : "";
}

function buildRequestUrl(path: string, query?: Record<string, ApiQueryValue>) {
	if (/^https?:\/\//i.test(path)) {
		const url = new URL(path);
		const queryString = buildQueryString(query);

		if (queryString) {
			const params = new URLSearchParams(url.search);
			for (const [key, value] of new URLSearchParams(queryString)) {
				params.append(key, value);
			}
			url.search = params.toString();
		}

		return url.toString();
	}

	if (DEFAULT_BASE_URL) {
		const url = new URL(path, DEFAULT_BASE_URL);
		const queryString = buildQueryString(query);

		if (queryString) {
			const params = new URLSearchParams(url.search);
			for (const [key, value] of new URLSearchParams(queryString)) {
				params.append(key, value);
			}
			url.search = params.toString();
		}

		return url.toString();
	}

	const [pathWithQuery, hash = ""] = path.split("#");
	const [pathname, existingQuery = ""] = pathWithQuery.split("?");
	const params = new URLSearchParams(existingQuery);

	for (const [key, value] of Object.entries(query ?? {})) {
		if (value === undefined || value === null) {
			continue;
		}

		if (Array.isArray(value)) {
			for (const item of value) {
				if (item !== undefined && item !== null) {
					params.append(key, String(item));
				}
			}
			continue;
		}

		params.set(key, String(value));
	}

	const finalQuery = params.toString();
	return `${pathname}${finalQuery ? `?${finalQuery}` : ""}${hash ? `#${hash}` : ""}`;
}

function isJsonBody(body: unknown) {
	if (!body || typeof body !== "object") {
		return false;
	}

	return !(
		body instanceof URLSearchParams ||
		body instanceof Blob ||
		body instanceof ArrayBuffer ||
		ArrayBuffer.isView(body)
	);
}

async function parseResponseBody(response: Response) {
	const contentType = response.headers.get("content-type") ?? "";

	if (response.status === 204) {
		return null;
	}

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
}

export async function request<TResponse = unknown>(
	path: string,
	options: ApiRequestOptions = {},
): Promise<TResponse> {
	const { query, body, headers, method = "GET", ...requestInit } = options;
	const url = buildRequestUrl(path, query);
	const requestHeaders = new Headers(headers);
	const hasBody = body !== undefined;
	let requestBody: BodyInit | undefined;

	if (hasBody) {
		if (isJsonBody(body)) {
			if (!requestHeaders.has("content-type")) {
				requestHeaders.set("content-type", "application/json");
			}
			requestBody = JSON.stringify(body);
		} else if (
			body instanceof FormData ||
			body instanceof URLSearchParams ||
			body instanceof Blob ||
			body instanceof ArrayBuffer ||
			ArrayBuffer.isView(body)
		) {
			requestBody = body as BodyInit;
		} else {
			requestBody = String(body);
		}
	}

	const response = await fetch(url, {
		...requestInit,
		method,
		headers: requestHeaders,
		body: requestBody,
	});

	const responseBody = await parseResponseBody(response);

	if (!response.ok) {
		const message =
			(responseBody && typeof responseBody === "object" && "message" in responseBody &&
				typeof (responseBody as { message?: unknown }).message === "string" &&
				(responseBody as { message: string }).message) ||
			`Request failed with status ${response.status}`;

		throw new ApiError(message, {
			status: response.status,
			url,
			payload: responseBody,
		});
	}

	return responseBody as TResponse;
}

export const api = {
	request,
	get<TResponse = unknown>(path: string, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
		return request<TResponse>(path, { ...options, method: "GET" });
	},
	post<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
		return request<TResponse>(path, { ...options, method: "POST", body });
	},
	put<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
		return request<TResponse>(path, { ...options, method: "PUT", body });
	},
	patch<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
		return request<TResponse>(path, { ...options, method: "PATCH", body });
	},
	delete<TResponse = unknown>(path: string, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
		return request<TResponse>(path, { ...options, method: "DELETE" });
	},
};

// ─── Client factory ────────────────────────────────────────────────────────────
// Creates a pre-configured api instance with a fixed base URL and default
// headers (e.g. Authorization). Useful for server-side CMS / API wrappers.

export interface ClientDefaults {
	/** Base URL prepended to all relative paths. Trailing slash is optional. */
	baseUrl?: string;
	/** Headers merged into every request (caller headers take precedence). */
	headers?: Record<string, string>;
}

export function createClient(defaults: ClientDefaults) {
	const base = defaults.baseUrl
		? defaults.baseUrl.endsWith("/")
			? defaults.baseUrl
			: `${defaults.baseUrl}/`
		: undefined;

	function resolvePath(path: string): string {
		if (!base || /^https?:\/\//i.test(path)) {
			return path;
		}
		// Strip leading slash so URL joining appends to the base path correctly.
		const relative = path.startsWith("/") ? path.slice(1) : path;
		return new URL(relative, base).toString();
	}

	function mergeHeaders(overrides?: HeadersInit): Headers {
		const merged = new Headers(defaults.headers);
		if (overrides) {
			new Headers(overrides).forEach((value, key) => merged.set(key, value));
		}
		return merged;
	}

	function withDefaults(
		path: string,
		options: ApiRequestOptions = {},
	): [string, ApiRequestOptions] {
		return [
			resolvePath(path),
			{ ...options, headers: mergeHeaders(options.headers) },
		];
	}

	return {
		request<TResponse = unknown>(path: string, options: ApiRequestOptions = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, o);
		},
		get<TResponse = unknown>(path: string, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, { ...o, method: "GET" });
		},
		post<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, { ...o, method: "POST", body });
		},
		put<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, { ...o, method: "PUT", body });
		},
		patch<TResponse = unknown>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, { ...o, method: "PATCH", body });
		},
		delete<TResponse = unknown>(path: string, options: Omit<ApiRequestOptions, "body" | "method"> = {}) {
			const [p, o] = withDefaults(path, options);
			return request<TResponse>(p, { ...o, method: "DELETE" });
		},
	};
}
