'use client'
import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const COOLDOWN_TIME = 30;
const MAX_EMAILS_PER_DAY = 2;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);

  const AlertMessage = ({ message, type = 'error', extra = null }) => {
    const baseStyle = 'text-sm font-semibold p-2 rounded';
    const bgColors = {
      error: 'bg-red-900 bg-opacity-30 text-red-400',
      success: 'bg-green-900 bg-opacity-30 text-green-400',
      warning: 'bg-yellow-900 bg-opacity-30 text-yellow-300',
    };
    return (
      <div className={`${baseStyle} ${bgColors[type]}`}>
        {message}
        {extra && <span> {extra}</span>}
      </div>
    );
  };

  useEffect(() => {
    checkRateLimits();

    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const checkRateLimits = () => {
    const lastSubmitTime = localStorage.getItem('lastEmailSubmit');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Math.floor((Date.now() - parseInt(lastSubmitTime)) / 1000);
      if (timeSinceLastSubmit < COOLDOWN_TIME) {
        setTimeRemaining(COOLDOWN_TIME - timeSinceLastSubmit);
        return false;
      }
    }

    const today = new Date().toDateString();
    const emailHistory = JSON.parse(localStorage.getItem('emailSubmitHistory') || '{}');
    const updatedHistory = {};

    if (emailHistory[today]) {
      updatedHistory[today] = emailHistory[today];
    }

    if (updatedHistory[today] && updatedHistory[today] >= MAX_EMAILS_PER_DAY) {
      setError(`Has alcanzado el límite de ${MAX_EMAILS_PER_DAY} mensajes por día. Inténtalo mañana.`);
      return false;
    }

    return true;
  };

  const updateSubmitHistory = () => {
    const today = new Date().toDateString();
    const emailHistory = JSON.parse(localStorage.getItem('emailSubmitHistory') || '{}');

    if (!emailHistory[today]) {
      emailHistory[today] = 0;
    }

    emailHistory[today] += 1;
    localStorage.setItem('emailSubmitHistory', JSON.stringify(emailHistory));
    localStorage.setItem('lastEmailSubmit', Date.now().toString());
    setTimeRemaining(COOLDOWN_TIME);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkRateLimits()) {
      if (!error) {
        setError(`Has alcanzado el límite de ${MAX_EMAILS_PER_DAY} mensajes por día. Inténtalo mañana.`);
      }
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        name: fullName,
        email: email,
        message: mensaje,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      updateSubmitHistory();
      setSuccess('¡Mensaje enviado con éxito!');
      setEmail('');
      setFullName('');
      setMensaje('');
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      setError('Ocurrió un error al enviar el mensaje.');
    })
    .finally(() => {
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
            {error && <AlertMessage message={error} type="error" extra={timeRemaining > 0 ? `(${timeRemaining}s)` : null} />}
            {success && <AlertMessage message={success} type="success" />}

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
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-blue-400 rounded transition-colors disabled:opacity-50"
              disabled={isSubmitting || timeRemaining > 0}
            >
              {isSubmitting ? 'Enviando...' : timeRemaining > 0 ? `Espera ${timeRemaining}s` : 'Enviar'}
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
