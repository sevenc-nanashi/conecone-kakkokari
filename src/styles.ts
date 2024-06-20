import inject from "./inject.scss";
import van from "vanjs-core";

const { style } = van.tags;

export let isCommentPanelInstalled = false;

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

    // コメントパネル（https://github.com/inonote/nico-rekari-comment-panel-userscript）との競合回避。
    // コメントパネルの改造が終わるまで待機する。
    const currentTime = document.querySelector("div.fs_12.font_alnum");
    if (!currentTime) {
      continue;
    }

    currentTime.classList.add("currentTime");

    const mainSection = document.querySelector(".w_var\\(--player-width\\)");
    if (!mainSection) {
      throw new Error("Player not found");
    }

    // コメントパネルはplayerContainerを包むgrid要素を追加するため、その有無でコメントパネルの有無を判定する。
    const commentPanelGridOrPlayerContainer = mainSection.firstElementChild!;
    isCommentPanelInstalled =
      (commentPanelGridOrPlayerContainer as HTMLElement).style.display ===
        "grid" && commentPanelGridOrPlayerContainer.childElementCount === 2;

    console.log("Comment panel installed:", isCommentPanelInstalled);

    const [playerContainer, commentBar] = Array.from(
      (isCommentPanelInstalled
        ? mainSection.firstElementChild!.firstElementChild!.children
        : mainSection.children) as HTMLCollectionOf<HTMLElement>,
    );

    const [videoPlayer, _supporterBar, seekBar, actionBar] = Array.from(
      playerContainer.children,
    );

    mainSection.classList.add("mainSection");
    playerContainer.classList.add("playerContainer");
    commentBar.classList.add("commentBar");
    videoPlayer.classList.add("videoPlayer");
    seekBar.classList.add("seekBar");
    actionBar.classList.add("actionBar");

    const volume = document.querySelector(".w_80px.bg_\\#555");
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
};
