"use client";

import { useState } from "react";

export default function ContactSection() {
    const [status, setStatus] = useState("");
    const [showServices, setShowServices] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Datos para el mapa
    const mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6665.759727021639!2d-70.75019703163836!3d-33.348088272035774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c095d28625c9%3A0xedf7268b834d59ea!2sTaller%20de%20Frenos!5e0!3m2!1ses!2scl!4v1755116904496!5m2!1ses!2scl";
    const mapsDirectionsUrl = "https://maps.app.goo.gl/WXdx1ssgvWB761C96";

    const services = [
        "Diagnóstico Computarizado",
        "Mantención Preventiva",
        "Reparación de Motor",
        "Cambio de Aceite y Filtros",
        "Sistema de Frenos",
        "Alineación y Balanceo",
        "Otra Consulta",
    ];

    function toggleService(service: string) {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("Enviando...");

        const form = e.target as HTMLFormElement;
        const rawPhone = (form.elements.namedItem("phone") as HTMLInputElement).value;

        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            phone: `+569${rawPhone}`,
            message: (form.elements.namedItem("message") as HTMLInputElement).value,
            services: selectedServices,
        };

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setStatus("✅ Mensaje enviado con éxito");
            form.reset();
            setSelectedServices([]);
        } else {
            setStatus("❌ Error al enviar. Intenta de nuevo.");
        }
    }

    return (
        <section className="py-20 bg-neutral-dark text-white" id="contacto">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    <span className="text-primary">Visítanos</span> o Contáctanos
                </h2>

                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
                    {/* Columna Izquierda: Información y Mapa */}
                    <div className="space-y-8">
                        <div className="bg-neutral-card p-8 rounded-2xl shadow-xl border border-neutral-medium/20">
                            <h3 className="text-2xl font-bold mb-6 text-primary">Información de Contacto</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Dirección</p>
                                        <p className="text-neutral-light/80">Av. Los Mecánicos #456</p>
                                        <p className="text-neutral-light/80">Col. Industrial, Santiago, Chile</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Horario de Atención</p>
                                        <p className="text-neutral-light/80">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                                        <p className="text-neutral-light/80">Sábados: 9:00 AM - 2:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Teléfono</p>
                                        <p className="text-neutral-light/80">+56 9 1234 5678</p>
                                    </div>
                                </div>

                                <a
                                    href={mapsDirectionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full inline-flex justify-center items-center bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-neutral-dark transition-all duration-300 font-bold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Cómo llegar con Waze / Maps
                                </a>
                            </div>
                        </div>

                        <div className="h-80 w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-medium/20 relative group">
                            <iframe
                                src={mapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="group-hover:opacity-90 transition-opacity"
                            ></iframe>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="bg-neutral-card p-8 rounded-2xl shadow-2xl border-t-4 border-primary">
                        <h3 className="text-2xl font-bold mb-2 text-white">Envíanos un Mensaje</h3>
                        <p className="text-neutral-light/60 mb-8">Te responderemos a la brevedad posible.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-neutral-light/80 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Ej. Juan Pérez"
                                    required
                                    className="w-full p-4 bg-neutral-dark border border-neutral-medium rounded-xl text-white placeholder-neutral-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-light/80 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="tucorreo@ejemplo.com"
                                    required
                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    className="w-full p-4 bg-neutral-dark border border-neutral-medium rounded-xl text-white placeholder-neutral-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-light/80 mb-1">Teléfono</label>
                                <div className="flex">
                                    <span className="flex items-center px-4 border border-r-0 border-neutral-medium rounded-l-xl bg-neutral-dark text-neutral-light/60">
                                        +569
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="12345678"
                                        required
                                        pattern="^[0-9]{8}$"
                                        className="w-full p-4 bg-neutral-dark border border-neutral-medium rounded-r-xl text-white placeholder-neutral-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Selección de servicios */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-neutral-light/80 mb-1">Servicio de interés</label>
                                <button
                                    type="button"
                                    onClick={() => setShowServices(!showServices)}
                                    className="w-full text-left p-4 bg-neutral-dark border border-neutral-medium rounded-xl text-white flex justify-between items-center hover:border-primary transition"
                                >
                                    <span className={selectedServices.length === 0 ? "text-neutral-medium" : ""}>
                                        {selectedServices.length > 0
                                            ? `Servicios seleccionados (${selectedServices.length})`
                                            : "Selecciona el tipo de servicio"}
                                    </span>
                                    <span className="text-primary">{showServices ? "▲" : "▼"}</span>
                                </button>

                                {showServices && (
                                    <div className="absolute z-10 mt-2 w-full bg-neutral-card border border-neutral-medium rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                                        {services.map((service) => (
                                            <label
                                                key={service}
                                                className="flex items-center px-4 py-3 hover:bg-neutral-dark cursor-pointer border-b border-neutral-medium/30 last:border-0"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedServices.includes(service)}
                                                    onChange={() => toggleService(service)}
                                                    className="mr-3 h-5 w-5 accent-primary rounded cursor-pointer"
                                                />
                                                <span className="text-neutral-light">{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-light/80 mb-1">Mensaje</label>
                                <textarea
                                    name="message"
                                    placeholder="Cuéntanos más detalles sobre lo que necesita tu vehículo..."
                                    required
                                    rows={4}
                                    className="w-full p-4 bg-neutral-dark border border-neutral-medium rounded-xl text-white placeholder-neutral-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-neutral-dark py-4 px-6 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 font-bold text-lg transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
                            >
                                Enviar Solicitud
                            </button>

                            {status && (
                                <div className={`text-center p-3 rounded-lg ${status.includes("✅") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                    {status}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
