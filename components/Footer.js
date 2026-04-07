import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Image 
            src="/logo.png" 
            alt="Creative Agency Logo" 
            className="h-12 lg:h-14 w-auto object-contain brightness-0 invert block" 
            width={180}
            height={56}
          />
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-ruang-green transition">Instagram</a>
          <a href="#" className="hover:text-ruang-green transition">Behance</a>
          <a href="#" className="hover:text-ruang-green transition">Dribbble</a>
        </div>
        <p className="text-gray-500 text-sm">&copy; 2026 ajibayu590. Assisted by AI.</p>
      </div>
    </footer>
  );
}
