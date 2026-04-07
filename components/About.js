import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ruang-blue mb-6">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our Agency is a creative studio that provides a space for ideas, visuals, and stories to grow into meaningful works. We help individuals, businesses, and communities stand out visually through a collaborative approach.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-ruang-green text-4xl mb-3">✦</div>
              <h4 className="font-bold mb-2">Visi</h4>
              <p className="text-sm text-gray-500">Menjadi katalisator visual terbaik di industri kreatif.</p>
            </div>
            <div className="p-4">
              <div className="text-ruang-green text-4xl mb-3">✦</div>
              <h4 className="font-bold mb-2">Misi</h4>
              <p className="text-sm text-gray-500">Menciptakan karya estetis yang fungsional dan berdampak.</p>
            </div>
            <div className="p-4">
              <div className="text-ruang-green text-4xl mb-3">✦</div>
              <h4 className="font-bold mb-2">Nilai</h4>
              <p className="text-sm text-gray-500">Integritas, Eksperimentasi, dan Kolaborasi.</p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/tentang" className="inline-block border-2 border-ruang-green text-ruang-green px-8 py-3 rounded-md font-semibold hover:bg-ruang-green hover:text-white transition-all duration-300">
              Pelajari Lebih Lengkap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
