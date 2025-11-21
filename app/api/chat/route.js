import { NextResponse } from "next/server";
import { handleChat } from "@/lib/chat";

export async function POST(req) {
    try {
        const body = await req.json();
        const result = await handleChat(body);
        return NextResponse.json(result);
    } catch (err) {
        console.error("[ROUTE ERROR] Chat route error:", err);
        return NextResponse.json({
            error: err.message || "Chat error",
            details: err.toString()
        }, { status: 500 });
    }
}
