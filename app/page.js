import ChatWidget from "../widget/ChatWidget";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#111111] to-[#1A1A1A]">
            {/* Header/Navigation */}
            <header className="border-b border-[#2A2A2A] bg-[#0F0F0F]/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <h1 className="text-xl font-bold text-white">Loops Integrated</h1>
                    </div>
                   
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-[#0099FF]/10 text-[#0099FF] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#0099FF]/20">
                        <span className="w-2 h-2 bg-[#0099FF] rounded-full animate-pulse"></span>
                        Digital Marketing Excellence
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Elevate Your Brand with
                        <span className="text-[#0099FF]"> Creative Strategy</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl">
                        From digital marketing to content creation, we deliver performance-driven solutions that transform your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-[#0099FF] text-white rounded-xl font-bold hover:bg-[#33B8FF] transition-all shadow-lg hover:shadow-[#0099FF]/50">
                            Get Started
                        </button>
                        <button className="px-8 py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A]">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#2A2A2A]">
                <div className="text-center mb-12">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Services</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: "📊", title: "Digital Marketing", desc: "Data-driven campaigns that deliver results" },
                        { icon: "🎨", title: "Creative Strategy", desc: "Bold ideas that captivate your audience" },
                        { icon: "📈", title: "Performance Marketing", desc: "ROI-focused strategies for growth" },
                        { icon: "✍️", title: "Content Creation", desc: "Compelling content that converts" }
                    ].map((service, i) => (
                        <div key={i} className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#0099FF]/50 transition-all group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                            <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
                            <p className="text-gray-400 text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* Contact Section */}
            <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#2A2A2A]">
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h3>
                    <p className="text-gray-400 mb-8">
                        Ready to transform your digital presence? Contact us today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="mailto:hello@loops.lk" className="flex items-center gap-2 text-[#0099FF] hover:text-[#33B8FF] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            hello@loops.lk
                        </a>
                        <span className="text-gray-600 hidden sm:block">|</span>
                        <a href="tel:+94771234567" className="flex items-center gap-2 text-[#0099FF] hover:text-[#33B8FF] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +94 77 123 4567
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#2A2A2A] bg-[#0F0F0F] py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                    <p>© 2024 Loops Integrated. All rights reserved.</p>
                </div>
            </footer>

            <ChatWidget />
        </main>
    );
}
