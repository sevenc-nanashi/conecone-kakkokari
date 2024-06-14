// フルスクリーン
import clsx from "clsx";
import van from "vanjs-core";
import stylesheet from "./fullScreen.scss";
import { mdiFullscreen, mdiFullscreenExit } from "@mdi/js";
const { div, h2, p, textarea, button, style } = van.tags;
const { path, svg } = van.tags("http://www.w3.org/2000/svg");

const queryOrThrow = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`Failed to find element: ${selector}`);
  }
  return el;
};

export const main = async () => {
  if (!location.pathname.startsWith("/watch_tmp/")) {
    return;
  }
  if (!document.body) {
    await new Promise((resolve) =>
      window.addEventListener("DOMContentLoaded", resolve),
    );
    main();
    return;
  }
  while (true) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const player = document.querySelector(".w_var\\(--player-width\\)");
    if (!player) {
      continue;
    }

    const innerPlayer = player.children[0];

    const [videoPlayer, seekBar, actionBar] = Array.from(innerPlayer.children);
    innerPlayer.classList.add("innerPlayer");
    videoPlayer.classList.add("videoPlayer");
    seekBar.classList.add("seekBar");
    actionBar.classList.add("actionBar");

    const toggleFullscreen = () => {
      if (isFullscreen.val) {
        document.exitFullscreen();
      } else {
        innerPlayer.requestFullscreen();
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
    innerPlayer.addEventListener("keydown", (e) => {
      const event = e as KeyboardEvent;
      if (event.key === "f") {
        toggleFullscreen();
      }
    });

    const isFullscreen = van.state(false);

    window.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === innerPlayer) {
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

    van.add(actionBar, fullScreenButton);

    van.add(document.body, style(stylesheet));

    break;
  }
};
