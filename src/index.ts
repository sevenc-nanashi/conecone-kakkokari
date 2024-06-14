import packageJson from "../package.json";
import * as ngList from "./ngList.ts";
import * as fullScreen from "./fullScreen.ts";

console.log(
  "" +
    "%c== コネコネ（仮） ========================================\n" +
    `  %cニコニコ（Re:仮）の補助ツール。\n` +
    `  %cVersion: %cv${packageJson.version}\n` +
    `  Developed by %cNanashi.\n` +
    `  %c${packageJson.homepage}\n` +
    "----------------------------------------------------------\n",
  "color: #18b4e6",
  "color: auto",
  "color: #18b4e6",
  "color: auto",
  "color: #48b0d5",
  "color: #18b4e6",
);

for (const script of [ngList.inject]) {
  const scriptElement = document.createElement("script");
  scriptElement.textContent = `(${script.toString()})()`;
  document.body.appendChild(scriptElement);
}

ngList.main();
fullScreen.main();
