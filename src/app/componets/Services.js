import React from "react";
import services from "@/data/services";
import Image from "next/image";

const Services = () => {
  return (
    <div id="services" className="w-full bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-[-0.04em]">
          Servicios que ofrecemos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center"
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
              <p className="text-gray-400 text-sm text-start">{service.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
