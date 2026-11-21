// The World Today: Saturday 21 November 2026.
//
// This program hands in the entry image. It copies the repository's
// entry.png into the output directory, byte for byte, so every run
// writes exactly the same file. No network, no randomness.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed whole, and say so on stdout.
const bytes = statSync(target).size;
if (bytes !== statSync(source).size) {
  throw new Error("entry.png copy is incomplete");
}
console.log(`The World Today handed in: entry.png, ${bytes} bytes.`);
