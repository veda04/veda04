import { NextResponse } from "next/server";

import type { ArticlesResponse } from "@/types/blogs";
import { ApiError } from "@/services/api";
import { cmsApi } from "@/services/cms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "10") || 10));
  const type = searchParams.get("type") ?? "blog";
  const sort = searchParams.get("sort") ?? "latest";
  const tag = searchParams.get("tag")?.trim() || undefined;
  const category = searchParams.get("category")?.trim() || undefined;

  try {
    const response = await cmsApi.get<ArticlesResponse>("/articles", {
      query: { page, limit, type, sort, tag, category },
      next: { revalidate: 300 },
    } as Parameters<typeof cmsApi.get>[1] & { next?: { revalidate: number } });

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          message: err.message,
          data: [],
          meta: { page, limit, total: 0, totalPages: 0 },
        },
        { status: err.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while loading posts.",
        data: [],
        meta: { page, limit, total: 0, totalPages: 0 },
      },
      { status: 500 },
    );
  }
}