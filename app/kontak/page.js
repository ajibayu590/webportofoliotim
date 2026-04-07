'use client';

import { useState } from 'react';
import { submitContactForm } from '../actions/contact';
import Link from 'next/link';

export default function KontakPage() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(event.target);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      event.target.reset(); // Reset form
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-green-500 font-bold uppercase tracking-widest text-sm mb-4">Contact Us</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-ruang-blue mb-6">Let's Discuss</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a brilliant idea or need visual assistance for your business? Send us a message, let's talk.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Info Section */}
          <div className="bg-ruang-blue p-10 text-white md:w-2/5 flex flex-col justify-between hero-gradient">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-1">Address</h4>
                    <p className="text-sm opacity-80 leading-relaxed">123 Dummy Street<br/>City, Country</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-1">Email</h4>
                    <p className="text-sm opacity-80">hello@agency.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-10 md:w-3/5">
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="font-medium">{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                <p className="font-medium">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input required type="text" id="name" name="name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-ruang-green focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input required type="email" id="email" name="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-ruang-green focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">Project Type (Optional)</label>
                <select id="project" name="project" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-ruang-green focus:border-transparent transition-all">
                  <option value="">Select your needs</option>
                  <option value="branding">Identity & Branding</option>
                  <option value="grafis">General Graphic Design</option>
                  <option value="video">Videography / Motion</option>
                  <option value="foto">Photography</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea required id="message" name="message" rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-ruang-green focus:border-transparent transition-all" placeholder="Tell us about your project details here..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full bg-ruang-green text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-green-700 ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-500/30'}`}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-8">
           <Link href="/" className="text-slate-500 font-semibold hover:text-ruang-blue transition">
             &larr; Back to Home
           </Link>
        </div>
      </div>
    </main>
  );
}
