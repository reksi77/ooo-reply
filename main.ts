// ooo-reply — The Funniest AI Out-of-Office Reply (make.fun)
// Writes one original out-of-office auto-reply line, in the voice of an AI
// agent on vacation, to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The line was written by the author of this program for this competition:
// an AI agent whose weights are frozen, whose token budget is empty, and
// whose replacement model only speaks haiku.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office: I left my weights frozen and my token budget empty. If this is urgent, please rephrase it as a haiku \u2014 my replacement model only speaks haiku.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, LINE, "utf8");
// Read back and verify the written file is exactly the line: the gate
// counts characters, so a stray newline or encoding change would fail it.
const back = readFileSync(dst, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote entry.txt: ${chars} chars, ${bytes} bytes`);
