'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePortfolioItem, getPortfolioItems } from '../../actions/portfolio';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    async function load() {
      const data = await getPortfolioItems();
      setItems(data);
      setLoading(false);
    }
    load();
  }, [router]);

  const filteredItems = items
    .filter(item => {
      const search = searchTerm.toLowerCase();
      const authors = (item.authorIds || []).join(' ').toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.year.toString().toLowerCase().includes(search) ||
        authors.includes(search)
      );
    })
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  const confirmDelete = async () => {
    if (!deletePassword) {
      setDeleteError('Masukkan password konfirmasi!');
      return;
    }

    const id = showDeleteModal;
    setDeleting(id);
    const result = await deletePortfolioItem(id, deletePassword);
    
    if (result.success) {
      setItems(items.filter(i => Number(i.id) !== Number(id)));
      setShowDeleteModal(null);
      setDeletePassword('');
      setDeleteError('');
    } else {
      setDeleteError(result.message);
    }
    setDeleting(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-ruang-blue">
            <div className="bg-ruang-green w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs">A</div>
            Admin Ruang Rupa
          </div>
          <div className="flex gap-4">
            <button onClick={handleLogout} className="text-sm font-semibold text-slate-500 hover:text-red-500 transition">Logout</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
           <div className="relative w-full md:w-96">
             <input 
              type="text" 
              placeholder="Cari judul, tahun, atau author..." 
              className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-ruang-green outline-none transition text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             />
             <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
           <Link href="/admin/tambah" className="w-full md:w-auto bg-ruang-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
             Tambah Projek Baru
           </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-8 py-4">Projek</th>
                <th className="px-8 py-4">Kategori</th>
                <th className="px-8 py-4">Author</th>
                <th className="px-8 py-4">Tahun</th>
                <th className="px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400">Tidak ada projek yang ditemukan.</td>
                </tr>
              )}
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition duration-150 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={item.img} className="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100" />
                      <div>
                        <div className="font-bold text-ruang-blue">{item.title}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[200px]">{item.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold uppercase tracking-tight">{item.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex -space-x-2">
                      {(item.authorIds || []).map(author => (
                        <div key={author} className="w-8 h-8 rounded-full bg-ruang-blue border-2 border-white flex items-center justify-center text-[8px] text-white font-bold uppercase" title={author}>
                          {author.substring(0, 2)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium">{item.year}</td>
                  <td className="px-8 py-6 text-right flex justify-end gap-2">
                    <Link 
                      href={`/admin/edit/${item.id}`}
                      className="text-slate-400 hover:text-ruang-blue transition p-2 hover:bg-slate-100 rounded-lg duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </Link>
                    <button 
                      onClick={() => setShowDeleteModal(item.id)}
                      disabled={deleting === item.id}
                      className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg group-hover:scale-110 duration-200"
                    >
                      {deleting === item.id ? '...' : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-ruang-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-slate-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-ruang-blue mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Konfirmasi Hapus
            </h3>
            <p className="text-slate-500 text-sm mb-6">Penghapusan tidak bisa dibatalkan. Masukkan password admin untuk melanjutkan:</p>
            
            {deleteError && (
              <div className="mb-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                {deleteError}
              </div>
            )}

            <input 
              type="password"
              placeholder="Password Admin"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition mb-6"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmDelete()}
              autoFocus
            />

            <div className="flex gap-3">
              <button 
                onClick={() => { setShowDeleteModal(null); setDeletePassword(''); setDeleteError(''); }}
                className="flex-1 px-4 py-3 text-slate-500 font-bold hover:text-slate-700 transition"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                disabled={deleting !== null}
                className="flex-1 bg-red-500 text-white font-bold px-4 py-3 rounded-2xl hover:bg-red-600 shadow-lg shadow-red-500/20 transition disabled:opacity-50"
              >
                {deleting !== null ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
