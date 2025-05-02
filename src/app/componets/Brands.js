import React from 'react';

const Brands= () => {
  return (
    <footer className="w-full bg-zinc-900">
      <div className="container mx-auto px-4 rounded-lg">
        {/* Versión móvil: organizado como en la imagen */}
        <div className="flex flex-wrap justify-center py-6 md:hidden">
          <div className="w-1/2 mb-4 flex justify-center">
            <img 
              src="/samsung.png" 
              alt="samsumg"
              className="h-6 object-contain"
            />
          </div>
          
          <div className="w-1/2 mb-4 flex justify-center">
            <img 
              src="/motorola.png" 
              alt="motorola"
              className="h-6 object-contain"
            />
          </div>
          
          <div className="w-1/2 mb-4 flex justify-center">
            <img 
              src="/xiaomi.png" 
              alt="xiaomi"
              className="h-6 object-contain"
            />
          </div>
          
          <div className="w-1/2 mb-4 flex justify-center">
            <img 
              src="/intel.png" 
              alt="intel"
              className="h-6 object-contain"
            />
          </div>
          
          <div className="w-1/2 flex justify-center">
            <img 
              src="/amd.png" 
              alt="amd"
              className="h-6 object-contain"
            />
          </div>
        </div>
        
        {/* Versión tablet y desktop: horizontal */}
        <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:py-8 md:gap-8 lg:gap-20 xl:gap-28">
          <div className="flex items-center">
            <img 
              src="/samsung.png" 
              alt="samsumg"
              className="h-5 object-contain"
            />
          </div>
          
          <div className="flex items-center">
            <img 
              src="/motorola.png" 
              alt="motorola"
              className="h-8 object-contain"
            />
          </div>
          
          <div className="flex items-center">
            <img 
              src="/xiaomi.png" 
              alt="xiaomi"
              className="h-8 object-contain"
            />
          </div>
          
          <div className="flex items-center">
            <img 
              src="/intel.png" 
              alt="intel"
              className="h-9 object-contain"
            />
          </div>
          
          <div className="flex items-center">
            <img 
              src="/amd.png" 
              alt="amd"
              className="h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Brands;