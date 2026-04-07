'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Determine if we are on the homepage to use anchor links
  const isHome = pathname === '/';
  const href = (anchor) => isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <nav className="fixed w-full z-50 glass-nav shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Creative Agency Logo"
            className="object-contain block"
            width={160}
            height={48}
            priority
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href={href('home')} className="hover:text-green-600 transition">Home</Link>
          <Link href="/tentang" className="hover:text-green-600 transition">About</Link>
          <Link href="/tim" className="hover:text-green-600 transition">Team</Link>
          <Link href={href('services')} className="hover:text-green-600 transition">Services</Link>
          <Link href="/portofolio" className="hover:text-green-600 transition">Portfolio</Link>
          <Link href="/kontak" className="bg-ruang-green text-white px-5 py-2 rounded-full hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
            Contact Us
          </Link>
        </div>
        {/* Mobile hamburger placeholder */}
        <div className="md:hidden">
          <Link href="/kontak" className="bg-ruang-green text-white px-4 py-2 rounded-full text-sm font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
