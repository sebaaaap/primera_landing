export default function Services() {
  const services = [
    { title: "Diagnóstico Computarizado", desc: "Equipos modernos para detectar fallas." },
    { title: "Mantención Preventiva", desc: "Alarga la vida útil de tu auto." },
    { title: "Reparación de Motor", desc: "Expertos en motores bencina y diésel." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{srv.title}</h3>
              <p>{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
