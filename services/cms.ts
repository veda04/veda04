/**
 * Pre-configured API client for CMS One.
 *
 * Uses CMS_ONE_API_URL and CMS_ONE_API_KEY from the environment.
 * Both variables are server-side only (no NEXT_PUBLIC_ prefix), so this
 * module must only be imported from Server Components or Route Handlers.
 */
import { createClient } from "@/services/api";

const baseUrl = process.env.CMS_ONE_API_URL ?? "";
const apiKey = process.env.CMS_ONE_API_KEY ?? "";

if (!baseUrl && process.env.NODE_ENV !== "test") {
	console.warn("[cms] CMS_ONE_API_URL is not set.");
}

export const cmsApi = createClient({
	baseUrl,
	headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
});
