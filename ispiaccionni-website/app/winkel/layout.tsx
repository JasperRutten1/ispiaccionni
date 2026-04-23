import type { Metadata } from "next";
import { WinkelCartProvider } from "@/components/winkel/WinkelCartProvider";
import { WinkelSubNav } from "@/components/winkel/WinkelSubNav";

export const metadata: Metadata = {
  title: "Winkel — I Spiaccionni",
  description:
    "Satirische fanwinkel: stemmen voor I Spiaccionni, geen echte levering. Puur voor de lol.",
};

export default function WinkelLayout({ children }: { children: React.ReactNode }) {
  return (
    <WinkelCartProvider>
      <main className="mx-5 my-10 rounded-md bg-gray-800 p-5 text-white lg:mx-15 lg:p-10">
        <WinkelSubNav />
        {children}
      </main>
    </WinkelCartProvider>
  );
}
