/**
 * Downloads Pollinations images into public/images/merch/{id}.jpg
 * Sequential with backoff to avoid HTTP 429. Skips existing files (FORCE=1 to replace).
 *
 * npm run fetch-merch-images
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const merchPath = join(root, "data", "merch.ts");
const outDir = join(root, "public", "images", "merch");
const TIMEOUT_MS = 180_000;
const DELAY_OK_MS = 4_000;
const DELAY_429_MS = 25_000;
const MAX_RETRIES = 6;
const force = process.env.FORCE === "1";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function merchImageUrl(prompt, seed, size = 512) {
  const trimmed = prompt.slice(0, 280);
  const encoded = encodeURIComponent(trimmed);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${size}&height=${size}&seed=${seed}&nologo=true`;
}

function parseMerchItems(text) {
  const items = [];
  let currentId = null;
  for (const line of text.split("\n")) {
    const idMatch = line.match(/^\s*id:\s*(\d+)\s*,/);
    if (idMatch) {
      currentId = Number(idMatch[1]);
      continue;
    }
    const promptMatch = line.match(/^\s*imagePrompt:\s*"(.*)"\s*,?\s*$/);
    if (promptMatch && currentId != null) {
      const prompt = promptMatch[1].replace(/\\"/g, '"');
      items.push({ id: currentId, prompt });
      currentId = null;
    }
  }
  return items;
}

function shouldSkip(id) {
  if (force) return false;
  const outPath = join(outDir, `${id}.jpg`);
  if (!existsSync(outPath)) return false;
  try {
    return statSync(outPath).size > 500;
  } catch {
    return false;
  }
}

async function downloadOne(id, prompt) {
  const url = merchImageUrl(prompt, id, 512);
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal });
    if (res.status === 429) {
      return { ok: false, status: 429 };
    }
    if (!res.ok) {
      return { ok: false, status: res.status, err: `HTTP ${res.status}` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) {
      return { ok: false, status: 0, err: "response too small" };
    }
    const outPath = join(outDir, `${id}.jpg`);
    writeFileSync(outPath, buf);
    return { ok: true, bytes: buf.length };
  } catch (e) {
    const name = e.name === "AbortError" ? "timeout" : e.message || String(e);
    return { ok: false, status: 0, err: name };
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const text = readFileSync(merchPath, "utf8");
  const items = parseMerchItems(text);
  if (items.length < 50) {
    console.error(`Expected many items, got ${items.length}.`);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  console.log(`Sequential fetch → ${outDir} (${items.length} items)`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const { id, prompt } of items) {
    if (shouldSkip(id)) {
      console.log(`skip id=${id}`);
      skipped++;
      continue;
    }

    let done = false;
    for (let attempt = 1; attempt <= MAX_RETRIES && !done; attempt++) {
      const r = await downloadOne(id, prompt);
      if (r.ok) {
        console.log(`ok  id=${id}  ${r.bytes} bytes`);
        ok++;
        done = true;
        await sleep(DELAY_OK_MS);
        break;
      }
      if (r.status === 429) {
        console.warn(`429 id=${id} attempt ${attempt}/${MAX_RETRIES}, waiting ${DELAY_429_MS}ms`);
        await sleep(DELAY_429_MS);
        continue;
      }
      console.warn(`retry id=${id} attempt ${attempt}: ${r.err || r.status}`);
      await sleep(8_000);
    }
    if (!done) {
      console.error(`FAIL id=${id} after ${MAX_RETRIES} attempts`);
      failed++;
      await sleep(DELAY_OK_MS);
    }
  }

  console.log(`Done. downloaded=${ok}, skipped=${skipped}, failed=${failed}`);
  if (failed > 0) process.exitCode = 1;
}

main();
