// フルスクリーン
import clsx from "clsx";
import van from "vanjs-core";
import { mdiFullscreen, mdiFullscreenExit } from "@mdi/js";
import { isCommentPanelInstalled } from "./styles";
const { form, input, button } = van.tags;
const { path, svg } = van.tags("http://www.w3.org/2000/svg");

export const main = async () => {
  if (!location.pathname.startsWith("/watch_tmp/")) {
    return;
  }
  console.log("Injecting: Fullscreen");
  if (!document.body) {
    await new Promise((resolve) =>
      window.addEventListener("DOMContentLoaded", resolve),
    );
    main();
    return;
  }
  while (true) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const playerContainer = document.querySelector(".playerContainer");
    const videoPlayer = document.querySelector(".videoPlayer");
    const actionBar = document.querySelector(".actionBar");
    const commentBar = document.querySelector(".commentBar");

    if (!playerContainer || !videoPlayer || !actionBar || !commentBar) {
      continue;
    }

    const toggleFullscreen = () => {
      if (isFullscreen.val) {
        document.exitFullscreen();
      } else {
        playerContainer.requestFullscreen();
      }
    };

    let hideTimeout: number | null = null;
    const activate = () => {
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }
      document.body.setAttribute("data-activated", "true");

      hideTimeout = window.setTimeout(() => {
        document.body.setAttribute("data-activated", "false");
      }, 5000);
    };
    document.addEventListener("mouseover", activate);
    videoPlayer.addEventListener("click", activate);

    const isFullscreen = van.state(false);

    window.addEventListener("fullscreenchange", () => {
      if (!!document.fullscreenElement) {
        isFullscreen.val = true;
        document.body.classList.add("fullScreen");
      } else {
        isFullscreen.val = false;
        document.body.classList.remove("fullScreen");
      }
    });

    const fullScreenButton = button(
      {
        classList: clsx([
          "w_24px",
          "h_24px",
          "fill_#fff",
          "cursor_pointer",
          "[&_svg]:w_24px",
          "[&_svg]:h_24px",
          "[&_svg]:fill_#fff",
          "[&_svg]:cursor_pointer",
        ]),
        onclick: toggleFullscreen,
      },
      svg(
        {
          width: "24",
          height: "24",
          viewBox: "4 4 16 16",
        },
        () =>
          isFullscreen.val
            ? path({
                d: mdiFullscreenExit,
              })
            : path({
                d: mdiFullscreen,
              }),
      ),
    );

    const [commandInput, commentInput] = Array.from(
      commentBar.querySelectorAll("input"),
    ) as [HTMLInputElement, HTMLInputElement];
    const postButton = commentInput.parentElement!
      .nextElementSibling as HTMLButtonElement;
    if (!postButton) {
      throw new Error("Post button not found");
    }

    const fsCommandInput = input({
      type: "text",
      placeholder: "コマンド",
      style: () => `
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border: 2px solid #ccc;
        `,
      oninput: (e) => {
        const event = e as InputEvent;
        commandInput.value = (event.target as HTMLInputElement).value;
      },
    });
    const fsCommentInput = input({
      type: "text",
      placeholder: "コメント",
      style: () => `
        background-color: #fff;
        color: #000;
        border-radius: 0;
        -webkit-appearance: none;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        `,
      oninput: (e) => {
        const event = e as InputEvent;
        commentInput.value = (event.target as HTMLInputElement).value;
      },
    });

    const fullScreenCommentBar = form(
      {
        classList: "fullScreenCommentBar",
        onsubmit: (e) => {
          e.preventDefault();
          fsCommandInput.value = "";
          fsCommentInput.value = "";
          postButton.click();
        },
      },
      fsCommandInput,
      fsCommentInput,
      button(
        {
          style: () => `
          background-color: #007cff;
          color: #fff;
          cursor: pointer;
          border-radius: 0;
          -webkit-appearance: none;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          `,
          type: "submit",
        },
        "投稿",
      ),
    );

    van.add(actionBar, fullScreenButton);
    van.add(actionBar, fullScreenCommentBar);

    playerContainer.addEventListener("keydown", (e) => {
      const event = e as KeyboardEvent;
      if ((event.target as HTMLElement)?.tagName === "INPUT") {
        return;
      }
      if (event.key === "f") {
        toggleFullscreen();
      }
    });

    break;
  }
};
