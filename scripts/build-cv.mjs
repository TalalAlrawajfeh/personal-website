import { copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const directory = fileURLToPath(new URL("../cv/", import.meta.url));
const result = spawnSync(
  "latexmk",
  [
    "-g",
    "-pdf",
    "-interaction=nonstopmode",
    "-halt-on-error",
    "talal-alrawajfeh-cv.tex",
  ],
  { cwd: directory, stdio: "inherit" },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
copyFileSync(
  new URL("../cv/talal-alrawajfeh-cv.pdf", import.meta.url),
  new URL("../public/talal-alrawajfeh-cv.pdf", import.meta.url),
);
