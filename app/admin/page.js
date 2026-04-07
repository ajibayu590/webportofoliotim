'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ruangrupa2026') {
      // Simple session simulation
      localStorage.setItem('adminToken', 'ruangrupa-auth-2026');
      router.push('/admin/dashboard');
    } else {
      setError('Password salah!');
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-ruang-green w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold text-ruang-blue">Admin Ruang Rupa</h1>
          <p className="text-slate-500 text-sm mt-2">Masukkan kunci akses untuk masuk</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password Akses</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ruang-green focus:border-transparent outline-none transition"
            />
          </div>
          <button type="submit" className="w-full bg-ruang-blue text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-blue-500/20">
            Masuk Sekarang
          </button>
        </form>
        
        <div className="mt-8 text-center">
           <Link href="/" className="text-sm text-slate-400 hover:text-ruang-blue transition">← Kembali ke Website</Link>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
