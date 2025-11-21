// api/chat.js
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function handleChat(body) {
    try {
        console.log("[CHAT] Request received");
        const messages = body.messages.slice(-10);

        const SYSTEM_PROMPT = `
You are Loops Integrated's digital sales representative.
Always reply in the same language as the user (English or Sinhala).

Brand info:
- Working Hours: Mon–Fri, 9 AM–6 PM
- Location: Colombo 03
- Services: Digital marketing, creative strategy, performance marketing, content creation
- Contact: hello@loops.lk / +94 77 123 4567

Rules:
1. If a question is unrelated to Loops Integrated or marketing, start your reply with [OFF_TOPIC], and ask for name/email/message.
2. Keep responses short and friendly.
3. If language mode is forced (en or si), respond only in that language.
`;

        const languageHint =
            body.languageMode === "en"
                ? "(Reply only in English)"
                : body.languageMode === "si"
                    ? "(Reply only in Sinhala)"
                    : "";

        console.log("[CHAT] Calling OpenAI API...");
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT + languageHint },
                ...messages,
            ],
            temperature: 0.5,
        });

        console.log("[CHAT] OpenAI API responded successfully");
        let full = completion.choices[0].message.content.trim();
        let offTopic = full.startsWith("[OFF_TOPIC]");
        if (offTopic) full = full.replace("[OFF_TOPIC]", "").trim();

        return {
            reply: full,
            offTopic,
        };
    } catch (error) {
        console.error("[CHAT ERROR] OpenAI API Error:", error.message);
        console.error("[CHAT ERROR] Error details:", error);
        throw new Error(`OpenAI API failed: ${error.message}`);
    }
}
