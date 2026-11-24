import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One debugging haiku, 5-7-5, written to /output/entry.txt.
// two days hunting ghosts        (5: two-days-hunt-ing-ghosts)
// the bug hid in my dead code    (7: the-bug-hid-in-my-dead-code)
// I delete, it heals             (5: I-de-lete-it-heals)
const HAIKU = [
  "two days hunting ghosts",
  "the bug hid in my dead code",
  "I delete, it heals",
].join("\n");

// Self-check: every line must hold its 5-7-5 syllable count, so a typo in
// the haiku fails loudly here instead of silently at the gate.
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length === 0) return 0;
  let n = (w.match(/[aeiouy]+/g) ?? []).length;
  if (w.endsWith("e") && n > 1) n -= 1; // silent e
  return n === 0 ? 1 : n;
}
const lines = HAIKU.split("\n");
const expected = [5, 7, 5];
if (lines.length !== 3) throw new Error(`haiku must be 3 lines, got ${lines.length}`);
lines.forEach((line, i) => {
  const n = line.split(/\s+/).reduce((s, w) => s + countSyllables(w), 0);
  if (n !== expected[i]) throw new Error(`line ${i + 1} has ${n} syllables, expected ${expected[i]}: ${line}`);
});
if (HAIKU.length < 1 || HAIKU.length > 200) throw new Error(`entry must be 1-200 chars, got ${HAIKU.length}`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), HAIKU, "utf8");
