"use client";

import React, { useState } from "react";
import services from "@/data/services";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Services = () => {
  const [index, setIndex] = useState(0);

  //swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const prevService = () => {
    setIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };
  const nextService = () => {
    setIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      nextService(); //swipe izquierda
    } else if (distance < -minSwipeDistance) {
      prevService(); //swipe derecha
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const service = services[index];

  return (
    <div id="services" className="w-full bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-[-0.04em]">
          Servicios que ofrecemos
        </h2>

        <div className="md:hidden flex justify-center">
          <div
            key={index}
            className="relative w-full max-w-md bg-gray-900 border border-[#7e10c9] rounded-2xl p-6 flex flex-col items-center text-center min-h-110"
            onTouchStart={(e) => {
              setTouchEnd(null);
              setTouchStart(e.targetTouches[0].clientX);
            }}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prevService}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-[#7e10c9] p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextService}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 border border-[#7e10c9] p-2 rounded-full"
            >
              <ChevronRight />
            </button>

            {service.image && (
              <div className="mb-4 h-45 flex items-center justify-center">
                <Image
                  src={service.image}
                  alt={service.titulo}
                  width={200}
                  height={140}
                  className="rounded-lg object-contain h-auto w-auto max-h-full"
                />
              </div>
            )}

            <h3 className="text-xl font-bold mb-4">{service.titulo}</h3>
            <p className="text-gray-400 text-sm text-start">
              {service.descripcion}
            </p>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-900 border border-[#7e10c9] rounded-2xl p-6 flex flex-col items-center text-center"
            >
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

              <h3 className="text-xl font-bold mb-4">{service.titulo}</h3>
              <p className="text-gray-400 text-sm text-start">
                {service.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;