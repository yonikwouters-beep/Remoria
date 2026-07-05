import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Maak lichte/witte en checkerboard-achtige pixels transparant.
 */
async function makeTransparent(input, output) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = out[o];
    const g = out[o + 1];
    const b = out[o + 2];
    const avg = (r + g + b) / 3;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);

    // Wit of checkerboard-grijs (weinig kleurverschil, hoog luminance)
    const isLightNeutral = spread < 28 && avg > 175;
    const isNearWhite = r > 238 && g > 238 && b > 238;

    if (isNearWhite || isLightNeutral) {
      out[o + 3] = 0;
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${output}: ${meta.width}x${meta.height}, hasAlpha=${meta.hasAlpha}`);
}

await makeTransparent('public/mobile-home.webp', 'public/mobile-home.png');
await makeTransparent('public/laptop.webp', 'public/laptop.png');
