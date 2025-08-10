export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Mecánico Profesional</h1>
        <p className="mt-4 text-lg">Reparación, diagnóstico y mantención de tu vehículo</p>
        <a
          href="https://wa.me/56912345678"
          className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}
