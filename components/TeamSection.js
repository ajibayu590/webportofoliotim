'use client';

import { useState } from 'react';
import { teamMembers } from '../data/team';
import Link from 'next/link';
import TeamModal from './TeamModal';

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-ruang-blue mb-16">Tim Kreatif Kami</h2>
        
        {/* Slider or Grid Container based on member length */}
        <div className={Object.keys(teamMembers).length > 3 ? "flex overflow-x-auto pb-8 gap-8 snap-x snap-mandatory hide-scrollbar" : "grid grid-cols-1 md:grid-cols-3 gap-12"}>
          {Object.values(teamMembers).map((member) => (
            <div 
              key={member.id} 
              className={`group cursor-pointer ${Object.keys(teamMembers).length > 3 ? "min-w-[300px] flex-none snap-center" : ""}`}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 aspect-[4/5]">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ruang-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                  <span className="text-white font-semibold">Klik untuk Preview →</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-ruang-blue">{member.name}</h3>
              <p className="text-ruang-green font-medium mb-2">{member.role}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/tim" className="inline-block border-2 border-ruang-green text-ruang-green px-8 py-3 rounded-md font-semibold hover:bg-ruang-green hover:text-white transition-all duration-300">
            Lihat Semua Tim
          </Link>
        </div>
      </div>
      
      <TeamModal 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </section>
  );
}
