"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FlappyBirdOverlay } from "@/components/FlappyBirdOverlay";

export function SiteHeader() {
  const [gameOpen, setGameOpen] = useState(false);
  const closeGame = useCallback(() => setGameOpen(false), []);

  return (
    <>
      <header className="w-full bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 md:px-5 py-3 md:py-4">
          <button
            type="button"
            onClick={() => setGameOpen(true)}
            className="flex items-center gap-2 md:gap-3 border-0 bg-transparent p-0 text-left"
            aria-label="Start mini-game"
          >
            <Image
              className="h-10 w-auto md:h-16 lg:h-20"
              src="/images/logo.png"
              width={200}
              height={200}
              alt="I Spiaccionni logo"
            />
            <span className="text-lg md:text-2xl lg:text-3xl font-semibold text-amber-50">I Spiaccionni</span>
          </button>

          <nav className="flex gap-2 md:gap-4 lg:gap-6 text-xs md:text-sm lg:text-lg">
            <Link href="/" className="text-amber-100 hover:text-white">
              Home
            </Link>
            <Link href="/duivenkot" className="text-amber-100 hover:text-white">
              Duivenkot
            </Link>
            <Link href="/contact" className="text-amber-100 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <FlappyBirdOverlay open={gameOpen} onClose={closeGame} />
    </>
  );
}
