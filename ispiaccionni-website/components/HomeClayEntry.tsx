"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ClayPigeonOverlay } from "@/components/ClayPigeonOverlay";

type Props = {
  children: ReactNode;
};

/**
 * Renders the clay mini-game overlay as a sibling above the main copy block (not inside it),
 * while keeping the hidden trigger positioned in the corner of that block.
 */
export function HomeClayEntry({ children }: Props) {
  const [clayOpen, setClayOpen] = useState(false);

  return (
    <>
      <ClayPigeonOverlay open={clayOpen} onClose={() => setClayOpen(false)} />
      <div className="relative flex flex-col gap-5 py-5 text-lg">
        <button
          type="button"
          aria-label="Open kleiduif schieten"
          title="Kleiduif schieten"
          onClick={() => setClayOpen(true)}
          className="absolute bottom-3 right-4 h-3 w-5 cursor-pointer rounded-full border border-amber-950/50 bg-gradient-to-br from-amber-200 via-orange-500 to-orange-900 opacity-[0.22] shadow-sm transition-opacity hover:opacity-80 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        />
        {children}
      </div>
    </>
  );
}
