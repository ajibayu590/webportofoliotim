import Link from 'next/link';

export const metadata = {
  title: 'About Us – Creative Agency',
  description: 'Learn more about the Creative Agency, our mission, vision, and team.',
};

const milestones = [
  { year: '2020', title: 'Agency Founded', desc: 'A small community born from a passion for photography and visual design.' },
  { year: '2021', title: 'Service Expansion', desc: 'Expanding services to include video production and motion graphics.' },
  { year: '2022', title: 'First Major Collaboration', desc: 'Collaborated with 10+ businesses to build their visual identities.' },
  { year: '2023', title: 'Digital Branding', desc: 'Opened branding and digital strategy division to reach a wider audience.' },
  { year: '2024', title: 'Full Studio', desc: 'Evolved into a full creative studio with a dedicated core team.' },
];

const values = [
  {
    icon: '✦',
    title: 'Integrity',
    desc: 'We are honest in every creative process — no shortcuts, only the best work.',
  },
  {
    icon: '⚡',
    title: 'Experimentation',
    desc: 'We continue to learn and try new approaches to produce fresh visuals.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    desc: 'Clients are not just customers; they are our creative partners in every project.',
  },
];

export default function TentangPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="pt-40 pb-20 hero-gradient text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">About Us</p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8">Space for All Expressions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Our Agency is a creative studio that provides a space for ideas, visuals, and stories to grow into meaningful works. We help individuals, businesses, and communities stand out visually through a collaborative and dedicated approach.
          </p>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-ruang-blue mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-ruang-blue text-center mb-16">Our Journey</h2>
          <div className="relative border-l-2 border-ruang-green pl-8 space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-11 top-1 w-5 h-5 rounded-full bg-ruang-green border-4 border-white shadow" />
                <p className="text-ruang-green font-bold text-sm mb-1">{m.year}</p>
                <h4 className="text-lg font-bold text-ruang-blue">{m.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ruang-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Let your story become a part of our work.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-ruang-green text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition">
              Start Project
            </Link>
            <Link href="/tim" className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-ruang-blue transition">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
