/** On-disk assets from `npm run fetch-merch-images` (see `scripts/fetch-merch-images.mjs`). */
export function merchLocalImagePath(id: number): string {
  return `/images/merch/${id}.jpg`;
}

/** Builds Pollinations image URL; prompt should stay reasonably short for URL limits. */
export function merchImageUrl(
  prompt: string,
  seed: number,
  size: number = 512
): string {
  const trimmed = prompt.slice(0, 280);
  const encoded = encodeURIComponent(trimmed);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${size}&height=${size}&seed=${seed}&nologo=true`;
}
