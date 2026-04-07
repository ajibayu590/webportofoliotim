import Link from 'next/link';
import { getPortfolioData } from '../data/portfolio';

export default async function PortfolioSection() {
  const allItems = getPortfolioData();
  // Hanya ambil 3 proyek terbaru untuk ditampilkan di beranda
  const projects = allItems.slice(-3).reverse(); // Ambil 3 terakhir yang diinput

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-ruang-blue mb-12">Portofolio Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-2xl group hover:shadow-2xl transition-all duration-500 aspect-video">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-ruang-blue/80 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-white p-4 backdrop-blur-sm">
                <h4 className="font-bold text-xl">{project.title}</h4>
                <p className="text-sm text-green-400 font-semibold">{project.category}</p>
                <div className="mt-4 px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest">
                   Lihat Detail
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/portofolio" className="inline-block bg-ruang-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            Lihat Semua Proyek
          </Link>
        </div>
      </div>
    </section>
  );
}
