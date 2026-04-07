import { teamMembers } from '../../data/team';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Our Team – Creative Agency',
  description: 'Meet the Creative Agency team dedicated to bringing you the best visuals.',
};

export default function TimPage() {
  const members = Object.values(teamMembers);
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="pt-40 pb-20 hero-gradient text-white text-center">
        <div className="container mx-auto px-6">
          <p className="text-green-400 font-bold uppercase tracking-widest text-sm mb-4">Our Team</p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">The People Behind the Work</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Meet the dedicated individuals who are the soul of every project at our agency.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {members.map((member) => (
              <Link
                key={member.id}
                href={`/tim/${member.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ruang-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                    <span className="text-white font-semibold">View Profile →</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-ruang-green font-bold text-sm uppercase tracking-wider mb-1">{member.role}</p>
                  <h3 className="text-xl font-bold text-ruang-blue group-hover:text-ruang-green transition">{member.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{member.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ruang-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Interested in Joining?</h2>
          <p className="text-blue-100 mb-6">We are always open to collaboration and new talent.</p>
          <Link href="/#contact" className="bg-ruang-green text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
