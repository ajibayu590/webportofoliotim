export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 shadow-2xl rounded-3xl overflow-hidden border">
          <div className="lg:w-1/2 bg-slate-50 p-12">
            <h2 className="text-3xl font-bold text-ruang-blue mb-6">Start Your Project</h2>
            <p className="mb-8">Let's discuss how our agency can help your brand's visual identity.</p>
            <div className="space-y-4 font-semibold text-ruang-green">
              <p>Email: contact@agency.com</p>
              <p>Instagram: @creative.agency</p>
            </div>
          </div>
          <div className="lg:w-1/2 p-12">
            <form action="#" className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-ruang-green" />
              <input type="email" placeholder="Email Anda" className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-ruang-green" />
              <textarea placeholder="Pesan Anda" rows="4" className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-ruang-green"></textarea>
              <button className="w-full bg-ruang-green text-white py-4 rounded-md font-bold hover:bg-green-700 transition uppercase tracking-wider">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
