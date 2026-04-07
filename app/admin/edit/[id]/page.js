'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { updatePortfolioItem, getPortfolioItems } from '../../../actions/portfolio';
import { categories } from '../../../../data/portfolio-constants';
import TagInput from '../../../../components/TagInput';

export default function EditPortofolio() {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [project, setProject] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    async function load() {
      const allItems = await getPortfolioItems();
      const found = allItems.find(item => Number(item.id) === Number(id));
      if (found) {
        setProject(found);
        setStatus('idle');
      } else {
        setError('Projek tidak ditemukan!');
        setStatus('error');
      }
    }
    load();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target);
    formData.append('id', id);
    formData.append('adminPassword', 'ruangrupa2026');

    const result = await updatePortfolioItem(formData);
    
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.message);
      setStatus('idle');
    }
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Memuat data projek...</div>;
  if (status === 'error') return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-20 pb-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
           <Link href="/admin/dashboard" className="text-slate-500 hover:text-ruang-blue flex items-center gap-2 font-bold mb-4 transition">
             ← Kembali ke Dashboard
           </Link>
           <h1 className="text-3xl font-bold text-ruang-blue">Edit Projek</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl space-y-8 border border-slate-100">
           {error && (
             <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-bold">{error}</div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Judul Projek</label>
                <input required name="title" defaultValue={project.title} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Kategori</label>
                <select name="category" defaultValue={project.category} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition appearance-none">
                  {categories.map(c => <option key={c} value={c}>{c}</option>).filter(c => c.key !== 'Semua')}
                </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Tahun</label>
                <input name="year" defaultValue={project.year} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Client / Instansi</label>
                <input name="client" defaultValue={project.client} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">URL Gambar / Embed Link</label>
              <input name="img" defaultValue={project.img} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
              <div className="flex items-center gap-2 mt-2">
                 <input type="checkbox" name="isEmbed" id="isEmbed" defaultChecked={project.isEmbed} className="w-4 h-4 text-ruang-green rounded" />
                 <label htmlFor="isEmbed" className="text-xs text-slate-500 font-bold cursor-pointer">Gunakan sebagai Embed (Iframe) bukan Gambar</label>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Deskripsi Projek</label>
              <textarea required name="desc" defaultValue={project.desc} rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition"></textarea>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Aplikasi / Tools Pengembang</label>
              <TagInput name="tools" initialTags={project.tools || []} placeholder="Contoh: Photoshop..." />
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Dikerjakan Oleh (Multi-select)</label>
              <div className="flex gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="safira" defaultChecked={project.authorIds && project.authorIds.includes('safira')} className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Safira</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="ahmad" defaultChecked={project.authorIds && project.authorIds.includes('ahmad')} className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Ahmad</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group">
                   <input type="checkbox" name="authorIds" value="maulidatul" defaultChecked={project.authorIds && project.authorIds.includes('maulidatul')} className="w-4 h-4 rounded text-ruang-green" />
                   <span className="text-sm font-bold text-slate-600 group-hover:text-ruang-blue transition">Maulidatul</span>
                 </label>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-widest text-[10px]">Link Eksternal</label>
              <input name="externalLink" defaultValue={project.externalLink} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition" />
           </div>

           <button 
             type="submit" 
             disabled={status === 'submitting'}
             className={`w-full bg-ruang-blue text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-slate-800 transition-all ${status === 'submitting' ? 'opacity-50' : 'hover:shadow-blue-500/20'}`}
           >
             {status === 'submitting' ? 'Memperbarui...' : 'Simpan Perubahan'}
           </button>
        </form>
      </div>
    </div>
  );
}
