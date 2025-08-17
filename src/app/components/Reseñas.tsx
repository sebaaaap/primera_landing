export default function Reviews() {
  // Datos de ejemplo - el cliente debería reemplazarlos
  const reviews = [
    {
      name: "Juan Pérez",
      rating: 5,
      comment: "Excelente servicio, mi auto quedó como nuevo. ¡Muy recomendables!",
      date: "Hace 2 semanas"
    },
    {
      name: "María González",
      rating: 4,
      comment: "Buen trabajo pero un poco lentos. Precios justos.",
      date: "Hace 1 mes"
    },
    {
      name: "Carlos Rodríguez",
      rating: 5,
      comment: "Profesionales y honestos. Solucionaron problemas que otros no detectaron.",
      date: "Hace 3 días"
    }
  ];

  // Componente de estrellas
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Lo que Dicen Nuestros Clientes</h2>
        <p className="text-center text-gray-600 mb-10">Experiencias reales de nuestros clientes</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <div className="flex mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
              
              {/* Badge de Google */}
              <div className="mt-4 flex items-center">
                <div className="bg-blue-50 rounded-full p-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.1 0 5 3.1 5 7c0 1.9.7 3.7 2.1 5 .1.1 4.1 3.7 4.2 3.8.4.3 1 .3 1.4 0 .1-.1 4.2-3.7 4.2-3.8 1.4-1.3 2.1-3.1 2.1-5 0-3.9-3.1-7-7-7zm0 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                </div>
                <span className="ml-2 text-sm text-gray-500">Google Reviews</span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver más reseñas */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Ver más reseñas en Google
            <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}