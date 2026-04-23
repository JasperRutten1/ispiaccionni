"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { merchImageUrl, merchLocalImagePath } from "@/lib/merch-image";

const FALLBACK = "/images/wip.jpeg";

type ImageStage = "local" | "remote" | "fallback";

type MerchImageProps = {
  id: number;
  imagePrompt: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
  /** Width/height passed to Pollinations when falling back to remote (local file is always the same asset). */
  remoteSize?: number;
  loading?: "lazy" | "eager";
};

export function MerchImage({
  id,
  imagePrompt,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  remoteSize = 512,
  loading = "lazy",
}: MerchImageProps) {
  const [stage, setStage] = useState<ImageStage>("local");

  const src =
    stage === "local"
      ? merchLocalImagePath(id)
      : stage === "remote"
        ? merchImageUrl(imagePrompt, id, remoteSize)
        : FALLBACK;

  const onError = useCallback(() => {
    setStage((s) => (s === "local" ? "remote" : s === "remote" ? "fallback" : "fallback"));
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
