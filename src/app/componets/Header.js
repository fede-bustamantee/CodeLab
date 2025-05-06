'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, Github } from 'lucide-react';

const navLinks = [
  { href: "#initial", label: "Inicio" },
  { href: "#services", label: "Servicios" },
  { href: "#information", label: "Información" },
  { href: "#contact", label: "Contacto" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("initial");

  // Función para detectar qué sección está visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      
      // Encuentra qué sección está actualmente visible en la ventana
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la sección está visible en la ventana
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Agrega el evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Comprueba la sección inicial al cargar
    handleScroll();
    
    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-black/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl flex items-center">
              <Image 
                src="/logo.png"
                alt="CodeLab Logo" 
                width={52} 
                height={52}
              />
              TecnoCode
            </span>
          </Link>
        </div>

        {/* Navegación escritorio */}
        <nav className="hidden md:flex space-x-8 tracking-wide">
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              href={link.href} 
              className={`hover:text-gray-400 transition ${
                activeSection === link.href.replace('#', '') 
                  ? "text-blue-500 font-medium border-b-2 border-blue-500" 
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botón de menú móvil */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>

        {/* Icono externo (escritorio) */}
        <div className="hidden md:flex items-center">
          <Link href="https://github.com/fede-bustamantee" className="flex items-center">
            <Github size={24} />
          </Link>
        </div>
      </div> 

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/10 pt-0 pb-8">
        <div className="container px-8">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.href} 
                  className={`py-1 hover:text-gray-400 transition ${
                    activeSection === link.href.replace('#', '') 
                      ? "text-blue-500 font-medium pl-2 border-l-2 border-blue-500" 
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <Link href="https://github.com/fede-bustamantee" className="flex items-center">
                  <Github size={20} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}