'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addPortfolioItem } from '../../actions/portfolio';
import { categories } from '../../../data/portfolio-constants';
import TagInput from '../../../components/TagInput';

export default function TambahPortofolio() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) router.push('/admin');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    formData.append('adminPassword', 'ruangrupa2026'); // Demo hack

    const result = await addPortfolioItem(formData);
    
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.message);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 pb-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
           <Link href="/admin/dashboard" className="text-slate-500 hover:text-ruang-blue flex items-center gap-2 font-bold mb-4 transition">
             ← Kembali ke Dashboard
           </Link>
           <h1 className="text-3xl font-bold text-ruang-blue">Tambah Projek Baru</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl space-y-8 border border-slate-100">
           {error && (
             <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-bold">{error}</div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Judul Projek</label>
                <input required name="title" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" placeholder="Contoh: Logo Cafe Mondrian" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Kategori</label>
                <select name="category" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition appearance-none">
                  {categories.map(c => <option key={c} value={c}>{c}</option>).filter(c => c.key !== 'Semua')}
                </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Tahun</label>
                <input name="year" defaultValue={new Date().getFullYear()} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Client / Instansi</label>
                <input name="client" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" placeholder="Contoh: Personal / UKM" />
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">URL Gambar / Embed Link</label>
              <input name="img" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" placeholder="/tim/saf.png atau URL Unsplash/YouTube Embed" />
              <div className="flex items-center gap-2 mt-2">
                 <input type="checkbox" name="isEmbed" id="isEmbed" className="w-4 h-4 text-ruang-green rounded" />
                 <label htmlFor="isEmbed" className="text-xs text-slate-500 font-bold cursor-pointer">Gunakan sebagai Embed (Iframe) bukan Gambar</label>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Deskripsi Projek</label>
              <textarea required name="desc" rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" placeholder="Ceritakan detail pengerjaan projek ini..."></textarea>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Aplikasi / Tools Pengembang</label>
              <TagInput name="tools" placeholder="Contoh: Photoshop, Illustrator (Tekan Tab)" />
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Dikerjakan Oleh (Multi-select)</label>
              <div className="flex gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="safira" className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Safira</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="ahmad" className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Ahmad</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="maulidatul" className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Maulidatul</span>
                 </label>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Link Eksternal (Opsional)</label>
              <input name="externalLink" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" placeholder="https://behance.net/..." />
           </div>

           <button 
             type="submit" 
             disabled={status === 'loading'}
             className={`w-full bg-ruang-blue text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-slate-800 transition-all ${status === 'loading' ? 'opacity-50' : 'hover:shadow-blue-500/20'}`}
           >
             {status === 'loading' ? 'Menyimpan...' : 'Simpan Projek'}
           </button>
        </form>
      </div>
    </div>
  );
}
