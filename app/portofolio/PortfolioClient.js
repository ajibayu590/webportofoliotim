'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PortfolioClient({ initialItems, categories, teamMembers }) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const sortedItems = [...initialItems].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  const filtered = activeCategory === 'Semua'
    ? sortedItems
    : sortedItems.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 hero-gradient text-white text-center">
        <div className="container mx-auto px-6">
          <p className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">Portfolio</p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Our Creative Works</h1>
          <p className="text-xl text-blue-100 max-w-xl mx-auto">
            Every project is a story we help visualize and bring to life.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white sticky top-20 z-10 border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-ruang-green text-white shadow-lg shadow-green-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-video">
                  {project.isEmbed ? (
                    <div className="w-full h-full bg-slate-100">
                      <iframe 
                        src={project.img} 
                        className="w-full h-full" 
                        allowFullScreen
                        title={project.title}
                      ></iframe>
                    </div>
                  ) : (
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-ruang-green text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  {project.externalLink && project.externalLink !== '' && project.externalLink !== '#' && (
                    <div className="absolute top-4 right-4 z-10">
                      <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="bg-white/90 backdrop-blur text-ruang-blue text-xs font-bold px-3 py-1 rounded-full hover:bg-white hover:shadow-lg transition flex items-center gap-1">
                        View Work
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-2 font-medium">
                    <span>{project.client || 'Personal'}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ruang-blue mb-2 hover:text-ruang-green transition duration-300">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                  
                  {project.tools && project.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map(tool => (
                        <span key={tool} className="text-[9px] bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-100 uppercase font-bold">{tool}</span>
                      ))}
                    </div>
                  )}
                  {project.authorIds && project.authorIds.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Developed by</p>
                      <div className="flex flex-wrap gap-2">
                        {project.authorIds.map(authorId => {
                          const author = teamMembers[authorId];
                          if (!author) return null;
                          return (
                            <Link key={authorId} href={`/tim/${author.slug}`} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-200 px-3 py-1 rounded-full border border-slate-100 transition shadow-sm">
                              <img src={author.img} alt={author.name} className="w-5 h-5 rounded-full object-cover" />
                              <span className="text-[11px] font-bold text-slate-700">{author.name.split(' ')[0]}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ruang-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Interested in a Project?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Let's make your vision a reality with our creative team.</p>
          <Link href="/kontak" className="bg-ruang-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            Start Discussion Now
          </Link>
        </div>
      </section>
    </main>
  );
}
