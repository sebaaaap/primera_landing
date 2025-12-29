// src/components/Services.jsx
import React from 'react';

export default function Services() {
  const services = [
    {
      title: "Diagnóstico Computarizado",
      desc: "Equipos modernos para detectar fallas con precisión.",
      icon: "🔍"
    },
    {
      title: "Mantención Preventiva",
      desc: "Alarga la vida útil de tu vehículo con nuestros planes personalizados.",
      icon: "🛠️"
    },
    {
      title: "Reparación de Motor",
      desc: "Expertos en motores de gasolina y diésel con garantía.",
      icon: "⚙️"
    },
    {
      title: "Cambio de Aceite y Filtros",
      desc: "Usamos lubricantes premium para óptimo rendimiento.",
      icon: "🛢️"
    },
    {
      title: "Sistema de Frenos",
      desc: "Revisión completa y reparación para tu seguridad vial.",
      icon: "🛑"
    },
    {
      title: "Alineación y Balanceo",
      desc: "Para un manejo suave y prolongar la vida de tus neumáticos.",
      icon: "🔄"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-light to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-accent-light rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Servicios Especializados
          </span>
          <h2 className="mt-2 text-4xl font-bold text-neutral-dark">
            Nuestros <span className="text-primary">Servicios</span> Premium
          </h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-neutral-medium max-w-2xl mx-auto">
            Ofrecemos soluciones integrales con tecnología de punta y personal calificado para mantener tu vehículo en óptimas condiciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-neutral-light transition-all duration-500 hover:shadow-xl hover:border-primary-soft hover:scale-[1.02]"
            >
              <div className="w-16 h-16 mb-6 rounded-xl bg-primary-soft flex items-center justify-center text-3xl transition-all duration-500 group-hover:bg-primary group-hover:text-neutral-dark">
                {srv.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-3 transition-colors duration-500 group-hover:text-accent">
                {srv.title}
              </h3>
              <p className="text-neutral-medium mb-4">{srv.desc}</p>
              <div className="flex items-center mt-6">
                <span className="text-accent font-medium">Saber más</span>
                <div className="ml-2 w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}