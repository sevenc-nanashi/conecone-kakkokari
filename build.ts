import { build as esbuild } from "esbuild";
import packageJson from "./package.json";
import sassPlugin from "esbuild-sass-plugin";

const bannerMap: Record<string, string> = {
  name: "コネコネ（仮）",
  description: "ニコニコ（Re:仮）の補助ツール。",
  version: `${packageJson.version}`,
  homepage: packageJson.homepage,
  match: "https://www.nicovideo.jp/*",
  updateURL: "https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js",
  downloadURL: "https://raw.githubusercontent.com/sevenc-nanashi/conecone-kakkokari/built/index.user.js",
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
  plugins: [
    sassPlugin({
      type: "css-text",
    }),
  ],
});
console.log("Build complete");
