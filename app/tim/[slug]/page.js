import { teamMembers } from '../../../data/team';
import { getPortfolioData } from '../../../data/portfolio';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MemberProfile({ params }) {
  const { slug } = await params;
  const member = teamMembers[slug];
  const allPortfolioItems = getPortfolioData();

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Member not found</h1>
        <Link href="/" className="ml-4 text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header / Hero */}
      <section className="pt-32 pb-20 hero-gradient text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <img 
              src={member.img} 
              alt={member.name} 
              className="w-full rounded-3xl shadow-2xl border-4 border-white/20" 
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-green-400 font-bold uppercase tracking-widest mb-2">{member.role}</p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{member.name}</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">{member.bio}</p>
            <div className="flex space-x-4">
              {member.ig !== '#' && (
                <a href={member.ig} target="_blank" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.269-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {member.linkedin !== '#' && (
                <a href={member.linkedin} target="_blank" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Experience & Education */}
            <div className="space-y-12">
              {member.experience && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Work Experience</h2>
                  <div className="space-y-6">
                    {member.experience.map((exp, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <h4 className="font-bold text-lg">{exp.title}</h4>
                        <p className="text-ruang-green text-sm font-medium">{exp.company} | {exp.period}</p>
                        <p className="mt-2 text-gray-600 text-sm">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {member.education && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Education</h2>
                  <div className="space-y-6">
                    {member.education.map((edu, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                        <h4 className="font-bold text-lg">{edu.school}</h4>
                        <p className="text-ruang-green text-sm font-medium">{edu.degree} | {edu.period}</p>
                        <p className="mt-2 text-gray-600 text-sm font-bold">{edu.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {member.organizations && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Organizations</h2>
                  <div className="space-y-4">
                    {member.organizations.map((org, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="w-2 h-2 bg-ruang-green rounded-full"></div>
                        <p className="text-gray-700 font-medium text-sm">{org}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Skills & Software</h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {(member.skills || ['Creative Design', 'Branding', 'Photography', 'Visual Strategy']).map((skill) => (
                  <div key={skill} className="bg-white p-4 rounded-xl border border-slate-100 text-center font-semibold hover:bg-slate-100 transition shadow-sm">
                    {skill}
                  </div>
                ))}
              </div>

              {member.contacts && member.contacts.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-4 text-ruang-blue">Contact Details</h3>
                  <div className="space-y-3">
                    {member.contacts.map((contact, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="w-2 h-2 bg-ruang-green rounded-full"></div>
                        <p className="text-gray-700 font-medium text-sm">{contact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-12 bg-ruang-blue p-8 rounded-3xl text-white hero-gradient">
                <h3 className="text-xl font-bold mb-4">Ready to Contribute</h3>
                <p className="opacity-80 text-sm leading-relaxed mb-6">
                  {member.name.split(' ')[0]} is highly motivated to grow in various fields and contribute with full dedication and responsibility.
                </p>
                <Link href="/kontak" className="inline-block bg-white text-ruang-blue px-6 py-2 rounded-full font-bold text-sm hover:bg-green-400 hover:text-white transition">
                  Hire {member.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linked Projects */}
      {(() => {
        const memberProjects = allPortfolioItems.filter(p => p.authorIds && p.authorIds.includes(member.slug));
        if (memberProjects.length === 0) return null;
        return (
          <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 border-l-4 border-green-500 pl-4">Projects involving {member.name.split(' ')[0]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memberProjects.map((project) => (
                  <div key={project.id} className="group bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative">
                    <div className="overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-6 relative">
                       <span className="text-xs text-ruang-green font-bold uppercase tracking-wider">{project.category}</span>
                       <h4 className="font-bold text-lg text-ruang-blue mt-1">{project.title}</h4>
                       
                       {project.externalLink && project.externalLink !== '' && project.externalLink !== '#' && (
                         <div className="mt-4">
                           <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-ruang-blue hover:text-ruang-green transition">
                             Open External Link
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                           </a>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <div className="container mx-auto px-6 text-center">
        <Link 
            href="/" 
            className="inline-block bg-ruang-blue text-white py-4 px-12 rounded-full font-bold hover:bg-slate-800 transition shadow-lg"
        >
            Back to Home
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(teamMembers).map((slug) => ({
    slug: slug,
  }));
}
