import ChatWidget from "../widget/ChatWidget";

export default function Home() {
    return (
        <main className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-3xl font-bold text-black">Loops Integrated — Demo</h1>
            <p className="text-black mt-2 max-w-md">
                Welcome to Loops. Our digital assistant can answer your questions.
            </p>

            <ChatWidget />
        </main>
    );
}
