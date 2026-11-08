import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { validatePublication } from "../src/lib/markets/publishing";
import { reportSchema } from "../src/lib/markets/schema";

// GitHub Actions or local CLI only; never imported by the static site.
const inputPath = process.argv[2];
if (!inputPath) throw new Error("Usage: bun scripts/publish-market-report.ts /path/report.json [--correction]");
const text = readFileSync(inputPath, "utf8");
if (Buffer.byteLength(text) > 250_000) throw new Error("Report exceeds 250 KB limit");
const raw: unknown = JSON.parse(text);
const report = reportSchema.parse(raw);
const target = `content/markets/${report.date}/${report.type}.json`;
const correction = process.argv.includes("--correction");
// Re-validate corrections below; first-publication revision guard applies only to new files.
if (existsSync(target)) {
  if (!correction) throw new Error("Report already exists. Use an explicit correction with appended revision history.");
  validatePublication(raw, JSON.parse(readFileSync(target, "utf8")));
} else if (correction) {
  throw new Error("Cannot correct a report that does not exist");
} else {
  validatePublication(raw);
}
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(raw, null, 2) + "\n");
console.log(`Validated ${target}`);