import { build as esbuild } from "esbuild";
import packageJson from "./package.json";

const bannerMap: Record<string, string> = {
  name: "コネコネ（仮）",
  description: "ニコニコ（Re:仮）の補助ツール。",
  version: `v${packageJson.version}`,
  homepage: packageJson.homepage,
  match: "https://www.nicovideo.jp/*",
  updateURL: "https://sevenc7c.com/conecone-kakkokari/index.user.js",
  downloadURL: "https://sevenc7c.com/conecone-kakkokari/index.user.js",
  sandbox: "MAIN_WORLD",
};
const banner =
  "// ==UserScript==\n" +
  Object.keys(bannerMap)
    .map((key) => `// @${key} ${bannerMap[key]}`)
    .join("\n") +
  "\n// ==/UserScript==\n";

await esbuild({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  format: "iife",
  outfile: "dist/index.user.js",
  banner: { js: banner },
});
console.log("Build complete");
