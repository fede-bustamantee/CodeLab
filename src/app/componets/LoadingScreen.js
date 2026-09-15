'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ children }) {
  const [loading, setLoading] = useState(true);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const bubblesTimer = setTimeout(() => {
      setShowBubbles(true);
    }, 500);

    // Después de 5 segundos termina el loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(bubblesTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="relative flex justify-center items-center h-screen bg-black">
        {/* IMAGEN */}
        <img
          src="/logonue.png"
          alt="Cargando..."
          className="w-40 h-auto z-10"
        />

        {/* BURBUJAS */}
        {showBubbles && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute animate-floatUpExplode w-1.5 h-1.5"></div>

            <div className="absolute animate-floatUpExplode delay-200 w-1 h-1"></div>

            <div className="absolute animate-floatUpExplode delay-400 w-1.5 h-1.5"></div>
          </div>
        )}
      </div>
    );
  }

  return children;
}