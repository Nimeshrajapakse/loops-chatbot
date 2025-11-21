import { NextResponse } from "next/server";
import { handleContact } from "@/lib/contact";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const result = await handleContact(body);
        return NextResponse.json(result);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Contact error" }, { status: 500 });
    }
}
