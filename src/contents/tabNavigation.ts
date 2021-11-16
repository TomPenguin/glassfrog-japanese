import sections from "../dictionary/tabNavigation.json";
import { translate } from "../helpers/index.ts";
import { Section } from "../types";

const execute = () => {
  translate(sections as Section[]);
};

execute();
