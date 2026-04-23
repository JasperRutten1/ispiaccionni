"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWinkelCart } from "@/components/winkel/WinkelCartProvider";

const linkClass =
  "rounded-md px-3 py-1.5 text-sm font-medium text-amber-100 hover:bg-gray-600 hover:text-white";
const activeClass = "bg-gray-600 text-white";

export function WinkelSubNav() {
  const pathname = usePathname();
  const { itemCount } = useWinkelCart();

  return (
    <nav
      className="mb-6 flex flex-wrap items-center gap-2 border-b border-gray-600 pb-4"
      aria-label="Winkelnavigatie"
    >
      <Link
        href="/winkel"
        className={`${linkClass} ${pathname === "/winkel" ? activeClass : ""}`}
      >
        Shop
      </Link>
      <Link
        href="/winkel/mand"
        className={`${linkClass} ${pathname === "/winkel/mand" ? activeClass : ""}`}
      >
        Mand
        {itemCount > 0 ? (
          <span className="ml-1 rounded-full bg-amber-600 px-2 py-0.5 text-xs text-black">
            {itemCount}
          </span>
        ) : null}
      </Link>
      <Link
        href="/winkel/afrekenen"
        className={`${linkClass} ${pathname === "/winkel/afrekenen" ? activeClass : ""}`}
      >
        Afrekenen
      </Link>
    </nav>
  );
}
