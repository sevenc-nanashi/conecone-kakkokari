export const main = async () => {
  if (!location.pathname.startsWith("/watch_tmp/")) {
    return;
  }
  if (navigator.maxTouchPoints < 2) {
    return;
  }
  if (!document.body) {
    await new Promise((resolve) =>
      window.addEventListener("DOMContentLoaded", resolve),
    );
    main();
    return;
  }
  console.log("Injecting: Double Tap");
  while (true) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const player = document.querySelector(".videoPlayer");
    if (!player) {
      continue;
    }

    player.addEventListener("dblclick", (e) => {
      const event = e as MouseEvent;

      const newEvent = new KeyboardEvent("keydown", {
        keyCode: event.offsetX < player.clientWidth / 2 ? 37 : 39,
        bubbles: true,
        cancelable: true,
      });

      document.body.dispatchEvent(newEvent);
    });

    player.addEventListener("click", (e) => {
      const event = e as MouseEvent;
      const x = event.offsetX;
      if (
        !(player.clientWidth * (2 / 5) < x && x < player.clientWidth * (3 / 5))
      ) {
        return;
      }

      const newEvent = new KeyboardEvent("keydown", {
        keyCode: 32,
        bubbles: true,
        cancelable: true,
      });

      document.body.dispatchEvent(newEvent);
    });

    break;
  }
};
