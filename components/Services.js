export default function Services() {
  const services = [
    {
      id: 'photo',
      title: 'Photography',
      desc: 'Capture moments and products with high aesthetics.',
      link: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      )
    },
    {
      id: 'video',
      title: 'Video Animation',
      desc: 'Tell your brand story through dynamic motion visuals.',
      link: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
      )
    },
    {
      id: 'branding',
      title: 'Branding',
      desc: 'Building an identity that sticks in the minds of the audience.',
      link: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
      )
    },
    {
      id: 'design',
      title: 'Graphic Design',
      desc: 'Effective visual communication that is pleasing to the eye.',
      link: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      )
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-ruang-blue text-center mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-transparent hover:border-ruang-green hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-lg mb-6 group-hover:bg-ruang-green transition">
                <div className="text-ruang-blue group-hover:text-white">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-6">{service.desc}</p>
              <a href={service.link} className="text-ruang-green font-semibold text-sm hover:underline">Pelajari Lebih Lanjut →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
