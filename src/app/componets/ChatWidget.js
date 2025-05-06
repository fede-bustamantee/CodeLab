'use client'
import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

// Configuración de limite de envíos
const COOLDOWN_TIME = 30; // Tiempo en segundos entre envíos permitidos
const MAX_EMAILS_PER_DAY = 3; // Máximo de correos por día desde una misma IP/dispositivo

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // Verificar estado de limitación al cargar
  useEffect(() => {
    checkRateLimits();
    
    // Si hay un temporizador activo, actualizarlo cada segundo
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
  
  // Función para verificar límites de envío
  const checkRateLimits = () => {
    // Verificar tiempo de espera
    const lastSubmitTime = localStorage.getItem('lastEmailSubmit');
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Math.floor((Date.now() - parseInt(lastSubmitTime)) / 1000);
      if (timeSinceLastSubmit < COOLDOWN_TIME) {
        setTimeRemaining(COOLDOWN_TIME - timeSinceLastSubmit);
        return false;
      }
    }
    
    // Verificar límite diario
    const today = new Date().toDateString();
    const emailHistory = JSON.parse(localStorage.getItem('emailSubmitHistory') || '{}');
    
    // Limpiar historial antiguo (solo mantener el día actual)
    const updatedHistory = {};
    if (emailHistory[today]) {
      updatedHistory[today] = emailHistory[today];
    }
    
    // Verificar si se alcanzó el límite diario
    if (updatedHistory[today] && updatedHistory[today] >= MAX_EMAILS_PER_DAY) {
      setError(`Has alcanzado el límite de ${MAX_EMAILS_PER_DAY} mensajes por día. Inténtalo mañana.`);
      // Mostrar alerta SweetAlert2 para límite diario
      Swal.fire({
        icon: 'warning',
        title: 'Límite alcanzado',
        text: `Has alcanzado el límite de ${MAX_EMAILS_PER_DAY} mensajes por día. Inténtalo mañana.`,
        confirmButtonColor: '#3B82F6'
      });
      return false;
    }
    
    return true;
  };
  
  // Actualizar historial de envíos
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
    if (!isOpen) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar límites antes de enviar
    if (!checkRateLimits()) {
      if (!error && timeRemaining > 0) {
        setError(`Por favor espera ${timeRemaining} segundos antes de enviar otro mensaje.`);
        // Alerta para tiempo de espera
        Swal.fire({
          icon: 'info',
          title: 'Espera un momento',
          text: `Por favor espera ${timeRemaining} segundos antes de enviar otro mensaje.`,
          timer: timeRemaining * 1000,
          timerProgressBar: true,
          confirmButtonColor: '#3B82F6'
        });
      }
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Muestra spinner mientras se procesa
    Swal.fire({
      title: 'Enviando mensaje',
      text: 'Por favor espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Usa variables de entorno configuradas en tu plataforma de hosting
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
      // Registrar envío exitoso para limitar la tasa
      updateSubmitHistory();
      
      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos. Te responderemos lo antes posible.',
        confirmButtonColor: '#3B82F6'
      });
      
      setIsOpen(false);
      setEmail('');
      setFullName('');
      setMensaje('');
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
      
      // Mostrar error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un problema al enviar tu mensaje. Por favor intenta de nuevo más tarde.',
        confirmButtonColor: '#3B82F6'
      });
      
      setError('Ocurrió un error al enviar el mensaje');
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
            {error && (
              <div className="p-2 bg-red-900 bg-opacity-30 text-red-400 text-sm rounded">
                {error}
                {timeRemaining > 0 && (
                  <span> ({timeRemaining}s)</span>
                )}
              </div>
            )}
            
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