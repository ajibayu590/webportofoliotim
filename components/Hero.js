export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-gradient overflow-hidden text-white">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">Creative Agency – Expression through Design</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-lg">We provide professional photography, video, design, and branding to strengthen your visual identity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#portfolio" className="bg-ruang-green hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-center">
              Lihat Portofolio
            </a>
            <a href="https://wa.me/628123456789" className="border border-white hover:bg-white hover:text-ruang-blue text-white px-8 py-3 rounded-md font-semibold transition-all duration-300 text-center">
              Chat WhatsApp
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="bg-white/10 p-2 rounded-xl border border-white/20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" alt="Featured Work" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
