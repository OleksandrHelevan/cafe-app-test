import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function handleProxy(req: NextRequest) {
  if (!BASE_URL)
    return NextResponse.json(
      { error: "Base URL not defined" },
      { status: 500 },
    );

  const path = req.nextUrl.pathname.replace("/api/ui/", "");
  const search = req.nextUrl.search;
  const targetUrl = `${BASE_URL}/${path}${search}`;

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower !== "host" && lower !== "content-length") headers[key] = value;
  });

  let body: BodyInit | undefined;

  if (req.method === "POST" || req.method === "PUT") {
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.startsWith("multipart/form-data")) {
      const arrayBuffer = await req.arrayBuffer();
      body = Buffer.from(arrayBuffer);
    } else {
      body = await req.text();
      headers["Content-Type"] = contentType || "application/json";
    }
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      credentials: "include",
    });

    const contentType = response.headers.get("content-type") ?? "";
    let resBody: string | Record<string, unknown>;

    if (contentType.includes("application/json")) {
      resBody = (await response.json()) as Record<string, unknown>;
    } else {
      resBody = await response.text();
    }

    return new NextResponse(JSON.stringify(resBody), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unexpected error");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

export async function PUT(req: NextRequest) {
  return handleProxy(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxy(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
