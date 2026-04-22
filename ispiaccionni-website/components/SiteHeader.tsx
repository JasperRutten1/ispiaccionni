"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { FlappyBirdOverlay } from "@/components/FlappyBirdOverlay";

export function SiteHeader() {
  const [gameOpen, setGameOpen] = useState(false);
  const closeGame = useCallback(() => setGameOpen(false), []);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex w-full flex-row items-center bg-black px-5 text-3xl">
          <button
            type="button"
            onClick={() => setGameOpen(true)}
            className="m-0 shrink-0 cursor-pointer border-0 bg-transparent p-0 leading-none"
            aria-label="Start mini-game"
          >
            <Image
              className="block h-16 w-auto md:h-20"
              src="/images/logo.png"
              width={200}
              height={200}
              alt=""
              aria-hidden
            />
          </button>
          <div className="flex items-end">
            <h1 className="px-10 py-10 text-amber-50">I Spiaccionni</h1>
          </div>
        </div>
      </div>
      <FlappyBirdOverlay open={gameOpen} onClose={closeGame} />
    </>
  );
}
