"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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
      phone: `+569${rawPhone}`, // prefijo fijo
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Contáctanos</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm"
        >
          {/* Nombre */}
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Correo"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Ingrese un correo válido"
            className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
          />

          {/* Teléfono con prefijo fijo */}
          <div className="flex">
            <span className="flex items-center px-3 border rounded-l bg-gray-100 text-gray-700">
              +569
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="XXXXXXXX"
              required
              pattern="^[0-9]{8}$"
              title="Debe ingresar los 8 dígitos de su número chileno"
              className="w-full p-3 border rounded-r focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Selección de servicios */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowServices(!showServices)}
              className="w-full text-left p-3 border rounded bg-white flex justify-between items-center hover:bg-gray-100"
            >
              {selectedServices.length > 0
                ? `Servicios seleccionados (${selectedServices.length})`
                : "Seleccionar Servicios"}
              <span className="text-gray-500">{showServices ? "▲" : "▼"}</span>
            </button>

            {showServices && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleService(service)}
                      className="mr-2"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Mensaje */}
          <textarea
            name="message"
            placeholder="Mensaje"
            required
            className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
          />

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition"
          >
            Enviar
          </button>

          {/* Estado */}
          {status && <p className="text-center mt-4">{status}</p>}
        </form>
      </div>
    </section>
  );
}
