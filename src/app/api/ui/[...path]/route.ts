import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function handleRequest(req: NextRequest) {
    if (!BASE_URL) {
        return NextResponse.json({ error: "Base URL not defined" }, { status: 500 });
    }

    const path = req.nextUrl.pathname.replace("/api/ui/", "");
    const search = req.nextUrl.search;
    const targetUrl = `${BASE_URL}/${path}${search}`;

    const headers: HeadersInit = {};
    req.headers.forEach((value, key) => {
        if (key.toLowerCase() !== "host") headers[key] = value;
    });

    const body = req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers,
            body,
        });

        const resText = await response.text();

        return new NextResponse(resText, {
            status: response.status,
            headers: {
                ...Object.fromEntries(response.headers),
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unexpected error");
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function GET(req: NextRequest) {
    return handleRequest(req);
}
export async function POST(req: NextRequest) {
    return handleRequest(req);
}
export async function PUT(req: NextRequest) {
    return handleRequest(req);
}
export async function DELETE(req: NextRequest) {
    return handleRequest(req);
}
