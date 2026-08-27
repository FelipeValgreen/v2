import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const testsDir = "tests";
const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
      continue;
    }
    if (!path.endsWith(".mjs")) continue;
    const source = readFileSync(path, "utf8");
    if (source.includes("networkidle")) offenders.push(path);
  }
}

walk(testsDir);

if (offenders.length) {
  console.error("RINON BROWSER QA CONTRACT FAILED: avoid page.goto(... waitUntil:\"networkidle\") in browser specs.");
  for (const path of offenders) console.error(`- ${path}`);
  console.error("Use domcontentloaded/load plus visible, semantic readiness assertions instead.");
  process.exit(1);
}

console.log("RINON BROWSER QA CONTRACT PASSED: browser specs do not depend on networkidle.");
