import type { Metadata } from "next";
import { PigeonHunt } from "@/components/PigeonHunt";

export const metadata: Metadata = {
  title: "Pigeon Hunt — I Spiaccionni",
  description: "Hunt down those surveillance drones. I mean... pigeons.",
};

export default function PigeonHuntPage() {
  return (
    <main className="mx-auto max-w-xl px-3 py-4 sm:px-4 md:py-8">
      <PigeonHunt />
    </main>
  );
}
