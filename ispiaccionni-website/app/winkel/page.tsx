import { Suspense } from "react";
import { MerchShop } from "@/components/winkel/MerchShop";

export default function WinkelPage() {
  return (
    <Suspense fallback={<p className="text-gray-300">Shop laden…</p>}>
      <MerchShop />
    </Suspense>
  );
}
