import van from "vanjs-core";

const { div } = van.tags;

type SupporterVoice = {
  url: string;
  text: string;
};

export const inject = () => {
  const supporterVoices: SupporterVoice[] = [
    {
      url: "https://random-files.sevenc7c.com/supporters/aoi_supporter.mp3",
      text: "調声：名無し。 声：琴葉葵 / A.I.Voice 2",
    },
  ];
  const originalCreateElement = document.createElement;
  console.log("Injecting: Custom supporter voice");

  const audioElements: HTMLAudioElement[] = [];
  document.createElement = function (tagName: string) {
    const element = originalCreateElement.call(this, tagName);

    if (tagName === "audio") {
      audioElements.push(element as HTMLAudioElement);
    }
    return element;
  };

  const supporterVoice =
    supporterVoices[Math.floor(Math.random() * supporterVoices.length)];

  (async () => {
    while (true) {
      for (const audioElement of audioElements) {
        if (
          audioElement.src.startsWith(
            "https://resource.video.nimg.jp/web/scripts/niconico_tmp/static/supporter-voice",
          )
        ) {
          console.log("Supporter voice element found");
          audioElement.src = supporterVoice.url;

          const script = document.createElement("script");
          script.setAttribute("type", "application/json");
          script.setAttribute("id", "supporterVoiceData");
          script.innerHTML = JSON.stringify(supporterVoice);
          document.head.appendChild(script);
          break;
        }
      }
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  })();
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
    const supporterContent = document.querySelector(
      '[data-name="supporter-content"] > div',
    );
    if (!supporterContent) {
      continue;
    }

    const supporterVoice = JSON.parse(
      document.getElementById("supporterVoiceData")!.textContent!,
    );

    supporterContent.insertBefore(
      div({ class: "supporterVoiceInfo" }, supporterVoice.text),
      supporterContent.children[1],
    );
    supporterContent.insertBefore(
      div({ class: "supporterVoiceEmpty" }),
      supporterContent.children[2],
    );

    break;
  }
};
