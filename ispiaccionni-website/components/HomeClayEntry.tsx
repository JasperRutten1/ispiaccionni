"use client";

import { useState } from "react";
import { ClayPigeonOverlay } from "@/components/ClayPigeonOverlay";

/** Hidden skeet-style entry on the home page (see Clay pigeon shooting mini-game). */
export function HomeClayEntry() {
  const [clayOpen, setClayOpen] = useState(false);

  return (
    <>
      <ClayPigeonOverlay open={clayOpen} onClose={() => setClayOpen(false)} />
      <button
        type="button"
        aria-label="Open clay pigeon shooting"
        title="Clay pigeon shooting"
        onClick={() => setClayOpen(true)}
        className="absolute bottom-3 right-4 h-3 w-5 cursor-pointer rounded-full border border-amber-950/50 bg-gradient-to-br from-amber-200 via-orange-500 to-orange-900 opacity-[0.22] shadow-sm transition-opacity hover:opacity-80 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
      />
    </>
  );
}
