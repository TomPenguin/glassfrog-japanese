import dictionary from "./dictionary/index.ts";
import { Section } from "./types";

const waitFor = (
  selector: string,
  timeout: number = 30000,
  startTime: Date = new Date(),
  promise?: Promise<Element | undefined>,
  resolve?: (value?: Element | PromiseLike<Element | undefined>) => void,
): Promise<Element | undefined> => {
  if (!promise) {
    promise = new Promise<Element | undefined>((res) => resolve = res);
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

console.log(dictionary)

const execute = () => {
  (Object.keys(dictionary) as (keyof typeof dictionary)[]).forEach(async (key: keyof typeof dictionary) => {
    const section: Section = dictionary[key];
    const block = await waitFor(section.block);
    if (!block) return;

    (Object.keys(section.texts)).forEach((selector) => {
      const element = block.querySelector(selector) as HTMLElement | undefined;
      if (!element) return;

      element.innerText = section.texts[selector];
    });
  });
};

execute();
