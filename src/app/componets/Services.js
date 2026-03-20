"use client";

import React, { useState } from "react";
import services from "@/data/services";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
  const [index, setIndex] = useState(0);

  const prevService = () => {
    setIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const [hasInteracted, setHasInteracted] = useState(false);

  const nextService = () => {
  setHasInteracted(true);
  setIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
};
  const service = services[index];

  return (
    <div id="services" className="w-full bg-black text-white py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-[-0.04em]">
          Servicios que Ofrecemos
        </h2>

        {/* Contenedor */}
        <div className="relative bg-gray-900 border border-[#7e10c9] rounded-2xl p-6 flex flex-col items-center">

          {/* Flecha izquierda */}
          <button
            onClick={prevService}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-[#7e10c9] p-2 rounded-full hover:bg-black"
          >
            <ChevronLeft />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={nextService}
            className={`
              absolute right-2 top-1/2 -translate-y-1/2 
            bg-black/60 border border-[#7e10c9] p-2 rounded-full hover:bg-black
            ${!hasInteracted ? "animate-pulse" : ""}
          `}
          >
            <ChevronRight />
          </button>

          {/* Imagen */}
          {service.image && (
            <div className="mb-4">
              <Image
                src={service.image}
                alt={service.titulo}
                width={520}
                height={120}
                className="rounded-lg object-contain"
              />
            </div>
          )}

          {/* Texto */}
          <h3 className="text-xl font-bold mb-4">{service.titulo}</h3>
          <p className="text-gray-400 text-sm text-start">
            {service.descripcion}
          </p>
        </div>

        {/* Indicador */}
        <p className="mt-4 text-sm text-white">
          {index + 1} / {services.length}
        </p>
      </div>
    </div>
  );
};

export default Services;