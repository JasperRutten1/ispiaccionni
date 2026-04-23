"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWinkelCart } from "@/components/winkel/WinkelCartProvider";
import { BEDANKT_FLAG_KEY } from "@/lib/winkel-constants";

export function BedanktView() {
  const router = useRouter();
  const { ready } = useWinkelCart();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!ready) return;
    queueMicrotask(() => {
      if (typeof window === "undefined") return;
      if (sessionStorage.getItem(BEDANKT_FLAG_KEY) !== "1") {
        router.replace("/winkel?geen-order=1");
        return;
      }
      setAllowed(true);
    });
  }, [ready, router]);

  const leaveBedankt = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(BEDANKT_FLAG_KEY);
    }
  };

  if (!ready || allowed === null) {
    return <p className="text-gray-300">Even geduld…</p>;
  }

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-amber-700/40 bg-gray-900/60 p-8 text-center">
      <h1 className="mb-4 text-2xl font-semibold text-amber-200">Bedankt!</h1>
      <p className="mb-3 text-lg text-gray-100">
        Bedankt voor je stemmen voor <span className="font-semibold text-amber-100">I Spiaccionni</span>.
        We hopen dat je je bestelling ooit nog eens zult krijgen.
      </p>
      <p className="mb-6 text-sm text-gray-400">
        ( Er wordt niets verstuurd, er is geen echte winkel, en postduiven lezen je
        gedachten niet — waarschijnlijk. Bedankt voor je stemmen!)
      </p>
      <Link
        href="/winkel"
        onClick={leaveBedankt}
        className="inline-block rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
      >
        Terug naar de shop
      </Link>
    </div>
  );
}
