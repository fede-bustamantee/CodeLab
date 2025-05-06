import React from 'react';
import { contact } from '@/data/contact';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact = () => {
  return (
    <div id='contact' className="w-full bg-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-[-0.04em]">
          Contactanos ahora mismo y contanos tu problema
        </h2>

        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Estos son los contactos disponibles y algunas de nuestras redes para que nos visites o escribas. Esperamos con ansias tu consulta, problema u opinion.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <div className="w-20 h-20 border-2 border-gray-700 border-dashed rounded-lg flex items-center justify-center">
            <span className="text-3xl text-gray-700">+</span>
          </div>

          {contact.map((extension, index) => (
            <a
              key={index}
              href={extension.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center ${extension.bgColor || "bg-gray-900"} hover:scale-105 transition-transform`}
            >
              <i className={`${extension.faIcon} text-2xl ${extension.iconColor || "text-white"} mb-1`} />
              <div className="text-xs text-gray-400 text-center px-1">
                {extension.name}
              </div>
            </a>
          ))}

          <div className="w-20 h-20 border-2 border-gray-700 border-dashed rounded-lg flex items-center justify-center">
            <span className="text-3xl text-gray-700">+</span>
          </div>
        </div>

        <a href="https://wa.me/3498417715" target="_blank" rel="noopener noreferrer">
          <div className="mt-8 bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg hover:opacity-90 transition-opacity">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda con tu equipo?</h3>
              <p className="text-gray-300 mb-4">Contáctanos hoy mismo para una evaluación profesional</p>
              <button className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                Solicitar Servicio
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;