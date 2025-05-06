'use client'
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Usa variables de entorno configuradas en tu plataforma de hosting
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,    // Configurado en Netlify/Vercel
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,   // Configurado en Netlify/Vercel
      {
        name: fullName,
        email: email,
        message: mensaje,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY     // Configurado en Netlify/Vercel
    )
    .then(() => {
      alert('¡Mensaje enviado con éxito!');
      setIsOpen(false);
      setEmail('');
      setFullName('');
      setMensaje('');
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      alert('Ocurrió un error al enviar el mensaje');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="fixed bottom-4 right-5 z-50">
      {isOpen ? (
        <div className="bg-black rounded-md shadow-lg w-80 text-white border border-gray-700">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div className="text-sm">
              <h3 className="font-semibold">Por correo electrónico también puede contactarnos</h3>
              <p className="text-gray-400 text-xs">Ayúdanos a saber tu problema o consulta.</p>
            </div>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-1">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fullName" className="block text-sm mb-1">Nombre Completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Marcos Ruiz"
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                required
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm mb-1">Descripción</label>
              <textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Quiero un desbloqueo"
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                rows={3}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-blue-400 rounded transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={toggleChat}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <MessageSquare size={24} className="text-black" />
        </button>
      )}
    </div>
  );
}