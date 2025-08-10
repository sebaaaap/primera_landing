"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Enviando...");

    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.name as unknown as HTMLInputElement).value,
      email: (form.email as HTMLInputElement).value,
      message: (form.message as HTMLInputElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setStatus(res.ok ? "Mensaje enviado ✅" : "Error al enviar ❌");
    form.reset();
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Contáctanos</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <input type="text" name="name" placeholder="Nombre" required className="w-full p-3 border rounded" />
          <input type="email" name="email" placeholder="Correo" required className="w-full p-3 border rounded" />
          <textarea name="message" placeholder="Mensaje" required className="w-full p-3 border rounded" />
          <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600">Enviar</button>
          {status && <p className="text-center mt-4">{status}</p>}
        </form>
      </div>
    </section>
  );
}
