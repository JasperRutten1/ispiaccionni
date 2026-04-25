'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PigeonPopup() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay before showing the pigeon
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClick = () => {
    router.push('/pigeonhunt');
  };

  return (
    <div
      className={`fixed bottom-1 right-1 z-50 cursor-pointer transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
      onClick={handleClick}
      style={{
        animation: isVisible ? 'bounce 0.6s ease-out' : 'none',
      }}
    >
      <style>{`
        @keyframes bounce {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div className="hover:scale-110 transition-transform duration-200">
        <Image
          src="/images/pigeon-hunt.png"
          alt="Click to hunt pigeons!"
          width={60}
          height={60}
          priority
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
          }}
        />
      </div>
      <div className="text-xs text-white text-center mt-2 bg-black/70 px-2 py-1 rounded whitespace-nowrap">
        Hunt me!
      </div>
    </div>
  );
}
