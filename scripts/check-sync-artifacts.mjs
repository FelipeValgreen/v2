import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const conflictPattern = / [0-9]\.[^/]+$/;
const skippedDirs = new Set([".git", "node_modules"]);
const toleratedRoots = [".next", "out", "playwright-report", "test-results"];
const protectedRoots = ["public", "lib", "app", "components", "scripts", "tests", "docs"];

const warnings = [];
const failures = [];

function toPosix(path) {
  return path.split("\\").join("/");
}

function isUnder(path, roots) {
  return roots.some((rootName) => path === rootName || path.startsWith(`${rootName}/`));
}

function classify(path) {
  if (isUnder(path, toleratedRoots)) return "tolerated";
  if (isUnder(path, protectedRoots)) return "protected";
  return "other";
}

function visit(dir = ".") {
  for (const entry of readdirSync(join(root, dir))) {
    if (skippedDirs.has(entry)) continue;
    const relative = dir === "." ? entry : `${dir}/${entry}`;
    const stat = statSync(join(root, relative));
    if (stat.isDirectory()) {
      visit(relative);
      continue;
    }
    if (!conflictPattern.test(relative)) continue;

    const kind = classify(relative);
    if (kind === "tolerated") warnings.push(relative);
    else if (kind === "protected") failures.push(relative);
  }
}

const trackedConflicts = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .map(toPosix)
  .filter((path) => conflictPattern.test(path));

for (const path of trackedConflicts) {
  if (!failures.includes(path)) failures.push(path);
}

visit();

if (warnings.length) {
  console.warn(`RINON SYNC ARTIFACT WARNING: ${warnings.length} iCloud-style conflict artifact${warnings.length === 1 ? "" : "s"} found in generated output.`);
  for (const path of warnings) console.warn(`- ${path}`);
}

if (failures.length) {
  console.error("RINON SYNC ARTIFACT CONTRACT FAILED: iCloud Drive synchronization conflict artifacts were found in source-controlled or protected paths.");
  for (const path of failures) console.error(`- ${path}`);
  console.error('Pattern: "* [0-9].*"');
  console.error("Cause: macOS/iCloud Drive can create conflict copies such as `file 2.ext`; in RC.7 this pattern correlated with truncated binary assets.");
  console.error("See AGENTS.md > Visual evidence rules > Assets de identidad.");
  process.exit(1);
}

console.log(`RINON SYNC ARTIFACT CONTRACT PASSED: ${warnings.length} generated conflict artifact${warnings.length === 1 ? "" : "s"} tolerated, 0 protected conflicts.`);
