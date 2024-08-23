import van from "vanjs-core";

const { a, div, path, span } = van.tags;
const { svg } = van.tags("http://www.w3.org/2000/svg");
const modifier = () => {
  if (localStorage.getItem("conecone-rikari-read")) {
    return;
  }
  const target = document.querySelector<HTMLDivElement>(
    ".nico-CommonHeaderRoot",
  );
  if (!target) {
    setTimeout(modifier, 100);
    return;
  }
  const svgElem = svg({
    viewBox: "0 0 24 24",
    fill: "none",
    class: "common-header-3drezb",
  });
  svgElem.innerHTML = `
  <path fill-rule="evenodd" clip-rule="evenodd"
        d="M17.357 12a.498.498 0 01-.146.356l-8.29 8.29a.5.5 0 01-.708 0l-1.41-1.41a.5.5 0 010-.707L13.333 12l-6.53-6.53a.5.5 0
        010-.707l1.41-1.41a.5.5 0 01.707 0l8.29 8.29a.499.499 0 01.147.357Z"
        style="fill: rgb(24, 180, 230) !important;"></path>`.replace(
    /\s+(\s)/g,
    "$1",
  );
  target.insertBefore(
    div(
      { class: "common-header-fqlnpx" },
      div(
        { class: "common-header-1fxu773", style: "background-color: #18b4e6;" },
        a(
          {
            target: "_blank",
            href: "https://github.com/sevenc-nanashi/conecone-kakkokari/blob/main/MESSAGE.md",
            class: "common-header-1524g3q",
            onclick: () => localStorage.setItem("conecone-rikari-read", "true"),
          },
          div(
            { class: "common-header-11rms0d" },
            div(
              { class: "common-header-1gedanw" },
              div({ class: "common-header-1udne4d" }, "コネコネ（仮）について"),
              span({ class: "common-header-sgyyjv" }, svgElem),
            ),
          ),
        ),
      ),
    ),

    target.firstChild,
  );
};

modifier();
