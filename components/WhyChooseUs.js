export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Collaborative',
      desc: 'We listen and work together with you for personal results.',
    },
    {
      title: 'Adaptive',
      desc: 'Flexible in following trends without losing the essence of the message.',
    },
    {
      title: 'Visual Focus',
      desc: 'Every pixel has a purpose to strengthen your business value.',
    },
  ];

  return (
    <section className="py-20 bg-ruang-blue text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {reasons.map((reason, idx) => (
            <div key={idx}>
              <div className="w-16 h-16 bg-ruang-green flex items-center justify-center rounded-full mx-auto mb-6 shadow-lg shadow-green-500/20">✔</div>
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-blue-100 opacity-80">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
