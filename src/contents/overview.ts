import sections from "../dictionary/overview.json";
import { translate } from "../helpers/index.ts";
import { Section } from "../types";

const execute = () => {
  translate(sections as Section[]);
};

execute();
