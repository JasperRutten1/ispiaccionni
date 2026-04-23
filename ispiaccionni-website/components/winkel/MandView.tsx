"use client";

import Link from "next/link";
import { getMerchById } from "@/data/merch";
import { useWinkelCart } from "@/components/winkel/WinkelCartProvider";
import { MerchImage } from "@/components/winkel/MerchImage";

export function MandView() {
  const { lines, setLineQuantity, removeLine, totalVotes, itemCount, ready } = useWinkelCart();

  if (!ready) {
    return <p className="text-gray-300">Mand laden…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-lg bg-gray-700 p-8 text-center text-gray-200">
        <p className="mb-4 text-lg">Je mand is lichter dan een duif zonder missie.</p>
        <Link
          href="/winkel"
          className="inline-block rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
        >
          Terug naar de shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-amber-200">Winkelmand</h1>
      <ul className="flex flex-col gap-4">
        {lines.map((line) => {
          const merch = getMerchById(line.merchId);
          if (!merch) return null;
          return (
            <li
              key={line.merchId}
              className="flex flex-col gap-3 rounded-lg bg-gray-700 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-900">
                <MerchImage
                  id={merch.id}
                  imagePrompt={merch.imagePrompt}
                  alt={merch.title}
                  fill
                  remoteSize={256}
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-amber-100">{merch.title}</h2>
                <p className="text-sm text-gray-300">
                  {merch.votes} stemmen per stuk · subtotaal{" "}
                  <strong className="text-white">{merch.votes * line.quantity}</strong> stemmen
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Minder"
                  className="rounded-md bg-gray-600 px-3 py-1 text-white hover:bg-gray-500"
                  onClick={() => setLineQuantity(line.merchId, line.quantity - 1)}
                >
                  −
                </button>
                <span className="min-w-[2ch] text-center font-mono text-lg">{line.quantity}</span>
                <button
                  type="button"
                  aria-label="Meer"
                  className="rounded-md bg-gray-600 px-3 py-1 text-white hover:bg-gray-500"
                  onClick={() => setLineQuantity(line.merchId, line.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="text-sm text-red-300 underline hover:text-red-200"
                onClick={() => removeLine(line.merchId)}
              >
                Verwijderen
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-3 rounded-lg border border-gray-600 bg-gray-900/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-200">
          Totaal: <strong className="text-white">{itemCount}</strong> stuks ·{" "}
          <strong className="text-amber-200">{totalVotes}</strong> stemmen voor I Spiaccionni
        </p>
        <Link
          href="/winkel/afrekenen"
          className="inline-flex justify-center rounded-md bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400"
        >
          Verder naar afrekenen
        </Link>
      </div>
    </div>
  );
}
