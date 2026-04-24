import type { Metadata } from "next";
import { ArcadeWhackAMole } from "@/components/ArcadeWhackAMole";

export const metadata: Metadata = {
  title: "Arcade — I Spiaccionni",
  description: "Whack-a-mole op de virtuele speelkast. Puur voor de lol.",
};

export default function ArcadePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <ArcadeWhackAMole />
    </main>
  );
}
