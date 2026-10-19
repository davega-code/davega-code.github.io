import { readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Stops the Vite servers listed by the record-pid plugin in vite.config.ts (same folder name).
// Node, not PowerShell: the CLI aborts sessionEnd hooks after ~1.5s and pwsh alone takes ~0.7s to start.
const dir = join(tmpdir(), "davega-net-dev-servers");

let pids = [];
try {
  pids = readdirSync(dir);
} catch {
  process.exit(0);
}

for (const pid of pids) {
  try {
    process.kill(Number(pid));
  } catch {
    // Already gone
  }
  rmSync(join(dir, pid), { force: true });
}
