"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MerchCategory } from "@/data/merch";
import { MERCH_CATALOG } from "@/data/merch";
import { MerchCard } from "@/components/winkel/MerchCard";
import { MerchFilters } from "@/components/winkel/MerchFilters";

export function MerchShop() {
  const searchParams = useSearchParams();
  const geenOrder = searchParams.get("geen-order") === "1";
  const [category, setCategory] = useState<MerchCategory | null>(null);

  const filtered = useMemo(() => {
    if (!category) return MERCH_CATALOG;
    return MERCH_CATALOG.filter((item) => item.category === category);
  }, [category]);

  return (
    <div className="flex flex-col gap-6">
      {geenOrder ? (
        <p
          className="rounded-md border border-amber-600/50 bg-amber-950/40 px-4 py-3 text-sm text-amber-100"
          role="status"
        >
          Je bent hier zonder af te rekenen binnengekomen. Geen paniek: er was toch geen echte
          bestelling. Voeg iets toe aan je mand als je wilt spelen.
        </p>
      ) : null}
      <header className="rounded-lg border border-amber-900/40 bg-gray-900/50 p-5 md:p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-400">
          Officieel onofficiële fanwinkel
        </p>
        <h1 className="mb-2 text-3xl font-semibold text-amber-200 md:text-4xl">
          Stemmenwinkel I Spiaccionni
        </h1>
        <p className="max-w-3xl text-gray-200">
          Hier koop je echt alles — je wisselt <strong>stemmen voor I Spiaccionni</strong>{" "}
          in tegen merchandise die bestaat tussen droom en dossier. Echt.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
          <li className="rounded-full bg-gray-800 px-3 py-1">Echte levering</li>
          <li className="rounded-full bg-gray-800 px-3 py-1">Stemmen Stemmen op I Spiaccionni</li>
          <li className="rounded-full bg-gray-800 px-3 py-1">Levertijd: na checkout</li>
        </ul>
      </header>

      <p className="rounded-md bg-amber-900/30 px-4 py-2 text-center text-sm text-amber-100">
        Stemweek: 0% korting op de werkelijkheid — maar 100% meer side-eye richting het plein.
      </p>

      <MerchFilters active={category} onChange={setCategory} />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <MerchCard key={item.id} item={item} />
        ))}
      </div>

      <footer className="rounded-lg border border-gray-600 bg-gray-900/40 p-4 text-sm text-gray-300">
        <p>
          Deze winkel is de enige echte. Er gaat geen geld, geen stemrecht en geen postduif de deur uit.
          Productfoto’s kunnen echt zijn, denk jij dat alles echt is? inhoudelijke nonsens is mensenwerk (of toch
          duivenwerk — wie zal het zeggen).
        </p>
      </footer>
    </div>
  );
}
