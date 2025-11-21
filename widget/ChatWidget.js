"use client";

import { useState } from "react";
import { isSinhala } from "./language";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [langMode, setLangMode] = useState("auto");
    const [showForm, setShowForm] = useState(false);

    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cMsg, setCMsg] = useState("");

    function resetChat() {
        setMessages([]);
        setShowForm(false);
    }

    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim()) return;

        const msg = { role: "user", content: input };
        const updated = [...messages, msg].slice(-10);
        setMessages(updated);
        setInput("");
        setLoading(true);

        let lang = langMode;
        if (langMode === "auto") lang = isSinhala(msg.content) ? "si" : "en";

        try {
            console.log("Sending message to API...");
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updated, languageMode: lang }),
            });

            console.log("API response status:", res.status, res.ok);
            const data = await res.json();
            console.log("API response data:", data);

            if (!res.ok || data.error) {
                console.error("Chat error:", data);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: `Error: ${data.error || data.details || "Something went wrong"}` },
                ]);
                setLoading(false);
                return;
            }

            if (!data.reply) {
                console.error("No reply in response:", data);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Error: No response from chatbot. Check server logs." },
                ]);
                setLoading(false);
                return;
            }

            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

            if (data.offTopic) setShowForm(true);
            else setShowForm(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `Error: ${error.message || "Something went wrong"}` },
            ]);
        }

        setLoading(false);
    }

    async function submitContact(e) {
        e.preventDefault();
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: cName, email: cEmail, message: cMsg }),
        });

        const data = await res.json();

        if (data.success) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Thanks! Our team will contact you soon." },
            ]);
            setShowForm(false);
            setCName("");
            setCEmail("");
            setCMsg("");
        }
    }

    return (
        <>
            {/* floating bubble */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-110 z-50"
                title="Chat with us"
            >
                💬
            </button>

            {/* panel */}
            {open && (
                <div className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] sm:max-h-[80vh] flex flex-col bg-white shadow-xl rounded-xl border overflow-hidden z-50">

                    {/* header */}
                    <div className="flex justify-between items-center bg-black text-white px-3 py-2">
                        <div>
                            <div className="text-sm font-semibold">Loops Assistant</div>
                            <div className="text-[10px] text-white opacity-90">EN / සිංහල support</div>
                        </div>
                        <button onClick={resetChat} className="text-xs px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors font-medium">
                            Reset
                        </button>
                    </div>

                    {/* language */}
                    <div className="flex gap-2 bg-gray-50 border-b px-3 py-2 text-xs text-black">
                        <button onClick={() => setLangMode("auto")}
                                className={`px-2 py-1 rounded transition-colors ${langMode === "auto" ? "bg-black text-white font-bold" : "hover:bg-gray-200"}`}>Auto</button>
                        <button onClick={() => setLangMode("en")}
                                className={`px-2 py-1 rounded transition-colors ${langMode === "en" ? "bg-black text-white font-bold" : "hover:bg-gray-200"}`}>EN</button>
                        <button onClick={() => setLangMode("si")}
                                className={`px-2 py-1 rounded transition-colors ${langMode === "si" ? "bg-black text-white font-bold" : "hover:bg-gray-200"}`}>SI</button>
                    </div>

                    {/* messages */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`px-3 py-2 rounded-xl text-sm sm:text-base max-w-[85%] ${m.role === "user" ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="text-xs text-black font-semibold">Typing...</div>
                        )}

                        {showForm && (
                            <form onSubmit={submitContact} className="bg-gray-50 p-3 border rounded space-y-2">
                                <input className="w-full border px-3 py-2 text-sm sm:text-base text-black bg-white placeholder-gray-500 rounded" placeholder="Name" value={cName} onChange={(e)=>setCName(e.target.value)} required/>
                                <input className="w-full border px-3 py-2 text-sm sm:text-base text-black bg-white placeholder-gray-500 rounded" placeholder="Email" type="email" value={cEmail} onChange={(e)=>setCEmail(e.target.value)} required/>
                                <textarea className="w-full border px-3 py-2 text-sm sm:text-base text-black bg-white placeholder-gray-500 h-20 rounded" placeholder="Message" value={cMsg} onChange={(e)=>setCMsg(e.target.value)} required/>
                                <button className="w-full bg-black text-white py-2 rounded text-sm sm:text-base font-semibold hover:bg-gray-800">Send</button>
                            </form>
                        )}
                    </div>

                    {/* input */}
                    <form onSubmit={sendMessage} className="border-t px-3 py-2 flex gap-2">
                        <input
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            className="flex-1 border rounded-full px-3 py-2 text-sm sm:text-base text-black bg-white placeholder-gray-500"
                            placeholder="Type here..."
                        />
                        <button className="px-4 py-2 bg-black text-white rounded-full text-sm sm:text-base hover:bg-gray-800">➤</button>
                    </form>
                </div>
            )}
        </>
    );
}
