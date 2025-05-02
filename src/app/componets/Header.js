'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, Github } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode }) {
  // Estado para controlar el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-black/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl flex items-center">
              <Image 
                src="/logo.png"
                alt="Grafbase Logo" 
                width={52} 
                height={52}
              />CodeLab
            </span>
          </Link>
        </div>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex space-x-8 tracking-wide">
          <Link href="/" className="hover:text-gray-400 transition">Inicio</Link>
          <Link href="/" className="hover:text-gray-400 transition">Servicios</Link>
          <Link href="/" className="hover:text-gray-400 transition">Información</Link>
          <Link href="/" className="hover:text-gray-400 transition">Contacto</Link>
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

        <div className="hidden md:flex items-center space-x-6">
          <Link href="https://github.com/grafbase" className="flex items-center">
            <Github size={24} />
            <span className="ml-2">1.1k</span>
          </Link>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/10 py-2">
          <div className="container px-8">
            <nav className="flex flex-col space-y-2">
              <Link href="/extensions" className="py-2 hover:text-gray-400 transition">Extensions</Link>
              <Link href="/docs" className="py-2 hover:text-gray-400 transition">Docs</Link>
              <Link href="/pricing" className="py-2 hover:text-gray-400 transition">Pricing</Link>
              <Link href="/contact" className="py-2 hover:text-gray-400 transition">Contact</Link>
              <div className="flex items-center space-x-4 pt-2">
                <Link href="https://github.com/grafbase" className="flex items-center">
                  <Github size={20} />
                  <span className="ml-2">1.1k</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}