import Image from 'next/image';
import Link from 'next/link';
import aboutContent from "@/data/about";

export default function HeroSection() {
  return (
<div id='initial' className="flex flex-col lg:flex-row items-center justify-between pt-20 bg-black mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
<div className="lg:w-1/2 mb-6 lg:mb-2 text-center lg:text-left">
    
    <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-[-0.04em]">
      {aboutContent.titulo}
    </h1>
    
    <p className="text-xl mb-3 sm:mb-6 text-gray-400">
      {aboutContent.descripcion}
    </p>
    
    <div className="flex flex-row justify-center lg:justify-start space-x-3 mb-1 sm:mb-4">
      <Link href="#services" className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center">
        Conocer más
      </Link>
      <Link href="#contact" className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border border-gray-700 hover:bg-gray-800 rounded-md transition text-center">
        Contáctanos
      </Link>
    </div>
    
    <p className="mt-1 sm:mt-3 text-sm text-gray-500">
      {aboutContent.subdescripcion}
    </p>
  </div>

  <div className="mb-4 sm:mb-8 py-1 sm:py-2 transform -translate-y-4 sm:translate-y-0">
  <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <Image
        src="/fondoo.png"
        alt="Grafbase Dashboard"
        width={550}
        height={0}
        priority
      />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
    </div>
  </div>
</div>


  );
}