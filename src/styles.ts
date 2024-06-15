import inject from "./inject.scss";
import van from "vanjs-core";

const { style } = van.tags;

export const main = async () => {
  if (!location.pathname.startsWith("/watch_tmp/")) {
    return;
  }
  console.log("Injecting: Styles");
  if (!document.body) {
    await new Promise((resolve) =>
      window.addEventListener("DOMContentLoaded", resolve),
    );
    main();
    return;
  }
  while (true) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const header = document.querySelector("header");
    if (!header) {
      continue;
    }

    const player = document.querySelector(".w_var\\(--player-width\\)");
    if (!player) {
      throw new Error("Player not found");
    }

    const innerPlayer = player.children[0];

    const [videoPlayer, seekBar, actionBar] = Array.from(innerPlayer.children);
    player.classList.add("playerContainer");
    innerPlayer.classList.add("innerPlayer");
    videoPlayer.classList.add("videoPlayer");
    seekBar.classList.add("seekBar");
    actionBar.classList.add("actionBar");

    const volume = document.querySelector(".w_80px.bg_\\#555.ssOnly\\:d_none");
    if (!volume) {
      throw new Error("Volume not found");
    }
    volume.classList.add("volume");

    if (navigator.userAgent.includes("iPhone")) {
      document.body.setAttribute("data-iphone", "true");
    }

    van.add(document.head, style(inject));
    break;
  }

  while (true) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const currentTime = document.querySelector("div.fs_12.font_alnum");
    if (!currentTime) {
      continue;
    }
    currentTime.classList.add("currentTime");
    break
  }
};
