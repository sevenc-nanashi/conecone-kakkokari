// NGリスト
import van from "vanjs-core";
const { div, h2, p, textarea, button } = van.tags;

type Comment = {
  id: string;
  postedAt: string;
  command: string;
  message: string;
  vposMsec: number;
};

export const inject = () => {
  if (!location.pathname.startsWith("/watch_tmp/")) {
    return;
  }
  console.log("Injecting: NG list");
  const originalFetch = window.fetch;
  const customFetch: typeof fetch = async (...args) => {
    const url = args[0];
    const response = await originalFetch.apply(this, args);
    if (!url.toString().includes("/v1/tmp/comments")) {
      return response;
    }
    const json: { data: { comments: Comment[] } } = await response.json();
    const comments = json.data.comments;
    const ngList: string[] = localStorage.getItem("ngList")
      ? JSON.parse(localStorage.getItem("ngList")!)
      : [];

    const filteredComments = comments.filter((comment) => {
      return !ngList.some((ng) => comment.message.includes(ng));
    });

    return new Response(
      JSON.stringify({
        ...json,
        data: {
          comments: filteredComments,
        },
      }),
      {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      },
    );
  };
  window.fetch = customFetch as any;
  globalThis.fetch = customFetch as any;
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

    const innerPlayer = player.querySelector(".aspect_16_\\/_9");
    if (!innerPlayer) {
      throw new Error("Failed to find inner player");
    }

    const ngVisible = van.state(false);
    const ngList: string[] = localStorage.getItem("ngList")
      ? JSON.parse(localStorage.getItem("ngList")!)
      : [];
    const ngListTextarea = textarea({
      style: () => `
      width: 100%;
      color: #000;
      height: 10rem;
      background-color: #fff;
      `,
      value: ngList.join("\n"),
    });
    const ngDashboard = div(
      {
        style: () => `
        position: absolute;
        display: ${ngVisible.val ? "flex" : "none"};
        flex-direction: column;
        gap: 0.5rem;
        color: #fff;
        right: 1rem;
        bottom: 1rem;
        padding: 1rem;
        background-color: #252525;
        z-index: 1000;
        `,
      },
      h2(
        {
          style: () => `
          font-size: 1.5rem;
          `,
        },
        "NGリスト",
      ),
      p("1行に1つのNGワードを入力してください。"),
      ngListTextarea,
      button(
        {
          style: () => `
          width: 100%;
          height: 2rem;
          background-color: #fff;
          color: #252525;
          cursor: pointer;
          `,
          onclick: () => {
            const value = ngListTextarea.value;
            const ngList = value.split("\n").filter((v) => v);
            localStorage.setItem("ngList", JSON.stringify(ngList));
            console.log("Saved NG list:", ngList);
            location.reload();
          },
        },
        "保存",
      ),
    );

    van.add(innerPlayer, ngDashboard);

    const actionBar = player.querySelector(".bg_\\#252525");
    if (!actionBar) {
      throw new Error("Failed to find action bar");
    }

    const grow = actionBar.querySelector(".grow_1");
    if (!grow) {
      throw new Error("Failed to find grow");
    }

    const ngButton = div(
      {
        className: "h_24px text_#fff cursor_pointer",
        onclick: () => {
          console.log("Clicked");
          ngVisible.val = !ngVisible.val;
        },
      },
      "NG",
    );

    actionBar.insertBefore(ngButton, grow.nextSibling!);
    break;
  }
};
