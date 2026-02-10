import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function handleProxy(req: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { error: "Base URL not defined" },
      { status: 500 },
    );
  }
  const path = req.nextUrl.pathname.replace("/api/ui/", "");
  const search = req.nextUrl.search;
  const targetUrl = `${BASE_URL}/${path}${search}`;

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();

    if (
      lower === "host" ||
      lower === "content-length" ||
      lower === "content-type"
    ) {
      return;
    }

    headers[key] = value;
  });

  let body: BodyInit | undefined;

  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const contentType = req.headers.get("content-type") ?? "";

    if (
      contentType.startsWith("multipart/form-data") ||
      contentType.startsWith("image/") ||
      contentType === "application/octet-stream"
    ) {
      body = Buffer.from(await req.arrayBuffer());
      headers["Content-Type"] = contentType;
    } else if (contentType.includes("application/json")) {
      body = await req.text();
      headers["Content-Type"] = "application/json";
    } else {
      body = Buffer.from(await req.arrayBuffer());
      if (contentType) headers["Content-Type"] = contentType;
    }
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    credentials: "include",
  });

  const resContentType = response.headers.get("content-type") ?? "";

  let resBody: BodyInit;
  if (
    resContentType.startsWith("image/") ||
    resContentType === "application/octet-stream"
  ) {
    resBody = Buffer.from(await response.arrayBuffer());
  } else {
    resBody = await response.text();
  }

  return new NextResponse(resBody, {
    status: response.status,
    headers: {
      "Content-Type": resContentType || "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
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

export async function PATCH(req: NextRequest) {
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
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
