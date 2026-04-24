import type { Metadata } from "next";
import { ArcadeWhackAMole } from "@/components/ArcadeWhackAMole";

export const metadata: Metadata = {
  title: "Arcade — I Spiaccionni",
  description: "Whack-a-mole op de virtuele speelkast. Puur voor de lol.",
};

export default function ArcadePage() {
  return (
    <main className="mx-auto max-w-xl px-3 py-4 sm:px-4 md:py-8">
      <ArcadeWhackAMole />
    </main>
  );
}
