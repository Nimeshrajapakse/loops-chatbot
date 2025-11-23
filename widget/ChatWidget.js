"use client";

import { useState, useEffect, useRef } from "react";
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

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        if (langMode === "auto") {
            const detectedSinhala = isSinhala(msg.content);
            lang = detectedSinhala ? "si" : "en";
            console.log("Auto-detect:", { message: msg.content, detectedSinhala, language: lang });
        }

        try {
            console.log("Sending message to API with language:", lang);
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
                className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-[#0099FF] text-white shadow-2xl hover:shadow-[#0099FF]/50 transition-all hover:scale-110 hover:bg-[#33B8FF] z-50 flex items-center justify-center group"
                title="Chat with us"
            >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {/* panel */}
            {open && (
                <div className="fixed bottom-20 right-4 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] sm:max-h-[80vh] flex flex-col bg-[#111111] shadow-2xl rounded-2xl border border-[#2A2A2A] overflow-hidden z-50 animate-slideIn">

                    {/* header */}
                    <div className="flex justify-between items-center bg-[#0F0F0F] text-white px-4 py-3 border-b border-[#2A2A2A]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#0099FF] flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold">Loops Assistant</div>
                                <div className="text-xs text-white/80 font-medium">EN / සිංහල support</div>
                            </div>
                        </div>
                        <button onClick={resetChat} className="text-xs px-3 py-1.5 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-all font-semibold">
                            Reset
                        </button>
                    </div>

                    {/* language */}
                    <div className="flex gap-2 bg-[#0F0F0F] border-b border-[#2A2A2A] px-4 py-2.5 text-xs">
                        <button onClick={() => setLangMode("auto")}
                                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${langMode === "auto" ? "bg-[#0099FF] text-white shadow-md" : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"}`}>Auto</button>
                        <button onClick={() => setLangMode("en")}
                                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${langMode === "en" ? "bg-[#0099FF] text-white shadow-md" : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"}`}>EN</button>
                        <button onClick={() => setLangMode("si")}
                                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${langMode === "si" ? "bg-[#0099FF] text-white shadow-md" : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"}`}>SI</button>
                    </div>

                    {/* messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#111111]">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex gap-2 items-end ${m.role === "user" ? "justify-end" : "justify-start"} animate-messageSlide`}>
                                {m.role === "assistant" && (
                                    <div className="w-8 h-8 rounded-full bg-[#0099FF] flex items-center justify-center flex-shrink-0 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className={`px-4 py-2.5 rounded-2xl text-sm sm:text-base max-w-[75%] shadow-sm ${
                                    m.role === "user"
                                        ? "bg-[#1A1A1A] text-white rounded-br-sm border border-[#2A2A2A]"
                                        : "bg-[#0F0F0F] text-white border border-[#2A2A2A] rounded-bl-sm"
                                }`}>
                                    {m.content}
                                </div>
                                {m.role === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full bg-[#0099FF] flex items-center justify-center flex-shrink-0 shadow-md">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex gap-1 bg-[#0F0F0F] px-4 py-3 rounded-2xl border border-[#2A2A2A] shadow-sm">
                                    <div className="w-2 h-2 bg-[#0099FF] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                    <div className="w-2 h-2 bg-[#0099FF] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                    <div className="w-2 h-2 bg-[#0099FF] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />

                        {showForm && (
                            <form onSubmit={submitContact} className="bg-[#0F0F0F] p-4 border border-[#2A2A2A] rounded-2xl space-y-3 shadow-md animate-messageSlide">
                                <input className="w-full border border-[#2A2A2A] px-4 py-2.5 text-sm sm:text-base text-white bg-[#1A1A1A] placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099FF]" placeholder="Name" value={cName} onChange={(e)=>setCName(e.target.value)} required/>
                                <input className="w-full border border-[#2A2A2A] px-4 py-2.5 text-sm sm:text-base text-white bg-[#1A1A1A] placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099FF]" placeholder="Email" type="email" value={cEmail} onChange={(e)=>setCEmail(e.target.value)} required/>
                                <textarea className="w-full border border-[#2A2A2A] px-4 py-2.5 text-sm sm:text-base text-white bg-[#1A1A1A] placeholder-gray-500 h-24 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0099FF] resize-none" placeholder="Message" value={cMsg} onChange={(e)=>setCMsg(e.target.value)} required/>
                                <button className="w-full bg-[#0099FF] text-white py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-[#33B8FF] shadow-md transition-all">Send Message</button>
                            </form>
                        )}
                    </div>

                    {/* input */}
                    <form onSubmit={sendMessage} className="border-t border-[#2A2A2A] bg-[#0F0F0F] px-4 py-3 flex gap-2">
                        <input
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            className="flex-1 border border-[#2A2A2A] rounded-full px-4 py-2.5 text-sm sm:text-base text-white bg-[#1A1A1A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0099FF] transition-all"
                            placeholder="Type your message..."
                            disabled={loading}
                        />
                        <button
                            disabled={loading}
                            className="px-5 py-2.5 bg-[#0099FF] text-white rounded-full text-sm sm:text-base hover:bg-[#33B8FF] shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
