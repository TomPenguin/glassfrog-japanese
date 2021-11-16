import { Section } from "../types";

const waitFor = (
  selector: string,
  timeout: number = 30000,
  startTime: Date = new Date(),
  promise?: Promise<Element | undefined>,
  resolve?: (value?: Element | PromiseLike<Element | undefined>) => void
): Promise<Element | undefined> => {
  if (!promise) {
    promise = new Promise<Element | undefined>((res) => (resolve = res));
  }

  if (new Date().getTime() - startTime.getTime() > timeout) {
    resolve && resolve();
  } else {
    const target = document.querySelector(selector);
    if (target) {
      resolve && resolve(target);
    } else {
      window.requestAnimationFrame(() => {
        waitFor(selector, timeout, startTime, promise, resolve);
      });
    }
  }

  return promise;
};

export const translate = (sections: Section[]) => {
  sections.forEach(async (section) => {
    const block = await waitFor(section.block);
    if (!block) return;

    Object.keys(section.texts)
      .map((selector) => ({
        elm: block.querySelector(selector) as HTMLElement,
        txt: section.texts[selector],
      }))
      .filter(({ elm }) => elm)
      .forEach(({ elm, txt }) => (elm.innerText = txt));
  });
};
