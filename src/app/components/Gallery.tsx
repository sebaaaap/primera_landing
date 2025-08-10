export default function Gallery() {
  const images = ["/r11.png", "/r22.png", "/r33.png"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Trabajos Realizados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Trabajo ${idx + 1}`}
              className="rounded-lg shadow-lg hover:scale-105 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
