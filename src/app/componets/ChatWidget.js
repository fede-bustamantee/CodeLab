// componets/ChatWidget.jsx
'use client'
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, fullName });
    // You could send this data to an API, etc.
    alert('Form submitted!');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-5 z-50">
      {isOpen ? (
        <div className="bg-black rounded-md shadow-lg w-80 text-white border border-gray-700">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div className="text-sm">
              <h3 className="font-semibold">Por correo electronico tambien puede contactarnos</h3>
              <p className="text-gray-400 text-xs">Ayudanos a saber tu problema o consulta.</p>
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
              <label htmlFor="fullName" className="block text-sm mb-1">Descripción</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Quiero un desbloqueo"
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-blue-400 rounded transition-colors"
            >
              Enviar
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