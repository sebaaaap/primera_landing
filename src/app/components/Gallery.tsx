import Image from 'next/image';

export default function Gallery() {
  const images = ["/r1.png", "/r2.png", "/r3.png"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Trabajos Realizados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className="relative rounded-lg shadow-lg overflow-hidden hover:scale-105 transition"
              style={{ aspectRatio: '4/3' }} // Ajusta según relación de aspecto de tus imágenes
            >
              <Image
                src={img}
                alt={`Trabajo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}