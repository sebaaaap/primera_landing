"use client";

import Image from "next/image";

const brands = [
  { name: "BFGoodrich", logo: "/miche.png" },
  { name: "Goodride", logo: "/mo1.png" },
  { name: "Pirelli", logo: "/she.png" },
  { name: "Continental", logo: "/mot.png" },
  { name: "Dunlop", logo: "/moly.svg" },
  { name: "Rockstone", logo: "/cas.svg" },
  { name: "Rockstone", logo: "/pen.svg" },
];

export default function BrandsCarousel() {
  return (
    <div className="flex flex-col w-full bg-gray-50 py-6">
      {/* Encabezado con el texto alineado a la derecha */}
      <div className="flex justify w-full px-4 pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Marcas con las que trabajamos
        </h2>
      </div>
      
      {/* Carrusel de marcas */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="min-w-[200px] flex justify-center items-center px-6"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
        
