'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PoopPosition {
  x: number;
  y: number;
}

export default function PoopPage() {
  const [poops, setPoops] = useState<PoopPosition[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + 100);
    const y = event.clientY - (rect.top + 40);
    setPoops(prev => [...prev, { x, y }]);
  };

  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white">
      <h1 className="text-2xl font-bold mb-5">Target practice</h1>
      <div className="relative inline-block">
        <Image
          src="/images/virtus.jpg"
          width={500}
          height={500}
          alt="Base image"
          className="border-solid border-2 border-black rounded-md cursor-pointer"
          onClick={handleClick}
        />
        {poops.map((poop, index) => (
          <Image
            key={index}
            src="/images/poop.png"
            width={250}
            height={250}
            alt="Poop"
            className="absolute pointer-events-none"
            style={{ top: poop.y - 25, left: poop.x - 25 }}
          />
        ))}
      </div>
      <p className="mt-5">Click the image to add some bird poop!</p>
      <button
        onClick={() => setPoops([])}
        className="mt-5 px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear Poops
      </button>
    </main>
  );
}