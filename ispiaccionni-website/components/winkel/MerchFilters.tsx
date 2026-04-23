"use client";

import type { MerchCategory } from "@/data/merch";
import { MERCH_CATEGORIES } from "@/data/merch";

type MerchFiltersProps = {
  active: MerchCategory | null;
  onChange: (category: MerchCategory | null) => void;
};

export function MerchFilters({ active, onChange }: MerchFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorieën">
      <button
        type="button"
        role="tab"
        aria-selected={active === null}
        onClick={() => onChange(null)}
        className={`rounded-full border px-3 py-1 text-sm transition-colors ${
          active === null
            ? "border-amber-400 bg-amber-500/20 text-amber-100"
            : "border-gray-500 text-gray-300 hover:border-gray-400"
        }`}
      >
        Alles
      </button>
      {MERCH_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            active === cat
              ? "border-amber-400 bg-amber-500/20 text-amber-100"
              : "border-gray-500 text-gray-300 hover:border-gray-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
