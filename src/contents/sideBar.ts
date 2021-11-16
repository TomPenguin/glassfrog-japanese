import sections from "../dictionary/sideBar.json";
import { translate } from "../helpers/index.ts";
import { Section } from "../types";

const execute = () => {
  translate(sections as Section[]);
};

execute();
