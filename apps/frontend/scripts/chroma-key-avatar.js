#!/usr/bin/env node
/**
 * One-off: chroma-key the green-screen illustrated portrait into a real
 * transparent WebP (a true green screen, ~rgb(5,248,4) background — unlike
 * the earlier checkerboard renders, this one has an actual solid, uniform
 * key color, so a standard chroma-key + despill works reliably here).
 */
const path = require("path");
const sharp = require("sharp");

const SRC = process.argv[2];
const OUT = path.join(__dirname, "..", "public", "avatar-portrait.webp");

async function main() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0, px = 0; i < data.length; i += channels, px += 1) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const diff = g - Math.max(r, b);
    const t = Math.max(0, Math.min(1, diff / 60));
    const alpha = Math.round((1 - t) * 255);

    // Despill: pull the green channel toward max(r,b) in proportion to how
    // "green" this edge pixel reads, so there's no green fringe on hair/edges.
    const despilledG = g - t * (g - Math.max(r, b)) * 0.85;

    const outIdx = px * 4;
    rgba[outIdx] = r;
    rgba[outIdx + 1] = Math.round(despilledG);
    rgba[outIdx + 2] = b;
    rgba[outIdx + 3] = alpha;
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(OUT);

  console.log(`Wrote ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
