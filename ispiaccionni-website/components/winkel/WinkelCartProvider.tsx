"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMerchById } from "@/data/merch";

export type CartLine = {
  merchId: number;
  quantity: number;
};

const STORAGE_KEY = "ispiaccionni_winkelmand_v1";

type WinkelCartContextValue = {
  lines: CartLine[];
  ready: boolean;
  itemCount: number;
  totalVotes: number;
  addToCart: (merchId: number, quantity?: number) => void;
  setLineQuantity: (merchId: number, quantity: number) => void;
  removeLine: (merchId: number) => void;
  clearCart: () => void;
};

const WinkelCartContext = createContext<WinkelCartContextValue | null>(null);

function computeTotals(lines: CartLine[]) {
  let itemCount = 0;
  let totalVotes = 0;
  for (const line of lines) {
    const merch = getMerchById(line.merchId);
    if (!merch) continue;
    itemCount += line.quantity;
    totalVotes += merch.votes * line.quantity;
  }
  return { itemCount, totalVotes };
}

export function WinkelCartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setLines(
              parsed
                .filter(
                  (row): row is CartLine =>
                    row &&
                    typeof row === "object" &&
                    typeof (row as CartLine).merchId === "number" &&
                    typeof (row as CartLine).quantity === "number"
                )
                .map((row) => ({
                  merchId: row.merchId,
                  quantity: Math.max(0, Math.floor(row.quantity)),
                }))
                .filter((row) => row.quantity > 0)
            );
          }
        }
      } catch {
        /* ignore */
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const addToCart = useCallback((merchId: number, quantity = 1) => {
    const q = Math.max(1, Math.floor(quantity));
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.merchId === merchId);
      if (idx === -1) return [...prev, { merchId, quantity: q }];
      const next = [...prev];
      next[idx] = { merchId, quantity: next[idx].quantity + q };
      return next;
    });
  }, []);

  const setLineQuantity = useCallback((merchId: number, quantity: number) => {
    const q = Math.floor(quantity);
    if (q <= 0) {
      setLines((prev) => prev.filter((l) => l.merchId !== merchId));
      return;
    }
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.merchId === merchId);
      if (idx === -1) return [...prev, { merchId, quantity: q }];
      const next = [...prev];
      next[idx] = { merchId, quantity: q };
      return next;
    });
  }, []);

  const removeLine = useCallback((merchId: number) => {
    setLines((prev) => prev.filter((l) => l.merchId !== merchId));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const { itemCount, totalVotes } = useMemo(() => computeTotals(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      ready,
      itemCount,
      totalVotes,
      addToCart,
      setLineQuantity,
      removeLine,
      clearCart,
    }),
    [
      lines,
      ready,
      itemCount,
      totalVotes,
      addToCart,
      setLineQuantity,
      removeLine,
      clearCart,
    ]
  );

  return (
    <WinkelCartContext.Provider value={value}>{children}</WinkelCartContext.Provider>
  );
}

export function useWinkelCart() {
  const ctx = useContext(WinkelCartContext);
  if (!ctx) {
    throw new Error("useWinkelCart must be used within WinkelCartProvider");
  }
  return ctx;
}
