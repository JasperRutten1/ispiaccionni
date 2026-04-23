"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getMerchById } from "@/data/merch";
import { useWinkelCart } from "@/components/winkel/WinkelCartProvider";
import { BEDANKT_FLAG_KEY } from "@/lib/winkel-constants";

export function CheckoutView() {
  const router = useRouter();
  const { lines, totalVotes, itemCount, clearCart, ready } = useWinkelCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    clearCart();
    if (typeof window !== "undefined") {
      sessionStorage.setItem(BEDANKT_FLAG_KEY, "1");
    }
    router.push("/winkel/bedankt");
  };

  if (!ready) {
    return <p className="text-gray-300">Laden…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-lg bg-gray-700 p-8 text-center text-gray-200">
        <p className="mb-4">Je mand is leeg. Eerst stemmen verzamelen in de shop.</p>
        <Link
          href="/winkel"
          className="inline-block rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
        >
          Naar de shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-3xl font-semibold text-amber-200">Afrekenen</h1>
      <p className="text-sm text-gray-300">
        Dit formulier doet letterlijk niks met je data — Zover jij weet. Je bestelling bestaat
        enkel in je hoofd en in deze browser. Maar het is echt.
      </p>

      <section className="rounded-lg bg-gray-700 p-4">
        <h2 className="mb-2 text-lg font-semibold text-amber-100">Overzicht</h2>
        <ul className="mb-3 space-y-1 text-sm text-gray-200">
          {lines.map((line) => {
            const merch = getMerchById(line.merchId);
            if (!merch) return null;
            return (
              <li key={line.merchId} className="flex justify-between gap-2">
                <span>
                  {merch.title} × {line.quantity}
                </span>
                <span className="shrink-0 text-amber-100">
                  {merch.votes * line.quantity} stemmen
                </span>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-gray-600 pt-2 text-right font-semibold text-white">
          {itemCount} stuks · totaal {totalVotes} stemmen voor I Spiaccionni
        </p>
      </section>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-lg bg-gray-700 p-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-gray-200">Naam (optioneel)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-gray-500 bg-gray-800 px-3 py-2 text-white"
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-gray-200">E-mail (optioneel)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-500 bg-gray-800 px-3 py-2 text-white"
            autoComplete="email"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-md bg-amber-500 px-4 py-3 font-semibold text-black hover:bg-amber-400"
        >
          Bevestig bestelling
        </button>
      </form>

      <Link href="/winkel/mand" className="text-sm text-amber-200 underline hover:text-white">
        ← Terug naar mand
      </Link>
    </div>
  );
}
