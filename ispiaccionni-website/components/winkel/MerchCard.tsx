"use client";

import type { MerchItem } from "@/data/merch";
import { MerchImage } from "@/components/winkel/MerchImage";
import { useWinkelCart } from "@/components/winkel/WinkelCartProvider";

type MerchCardProps = {
  item: MerchItem;
};

export function MerchCard({ item }: MerchCardProps) {
  const { addToCart } = useWinkelCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-700 shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative aspect-square w-full bg-gray-900">
        <MerchImage
          id={item.id}
          imagePrompt={item.imagePrompt}
          alt={item.title}
          fill
          remoteSize={512}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-semibold text-amber-200">{item.title}</h3>
        <p className="mb-3 flex-1 text-sm leading-relaxed text-gray-200">
          {item.shortDescription}
        </p>
        <p className="mb-3 text-sm font-medium text-amber-100">
          {item.votes} stemmen voor I Spiaccionni
        </p>
        <button
          type="button"
          onClick={() => addToCart(item.id, 1)}
          className="mt-auto rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black hover:bg-amber-400"
        >
          Toevoegen aan mand
        </button>
      </div>
    </article>
  );
}
