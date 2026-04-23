"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { merchLocalImagePath } from "@/lib/merch-image";

const FALLBACK = "/images/wip.jpeg";

type MerchImageProps = {
  id: number;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export function MerchImage({
  id,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  loading = "lazy",
}: MerchImageProps) {
  const [useFallback, setUseFallback] = useState(false);
  const src = useFallback ? FALLBACK : merchLocalImagePath(id);

  const onError = useCallback(() => {
    setUseFallback(true);
  }, []);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        loading={loading}
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={loading}
      onError={onError}
    />
  );
}
