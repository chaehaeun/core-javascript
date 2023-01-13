import {
  clearContents,
  getInputValue,
  getNode,
  getRandom,
  insertLast,
  isNumericString,
} from "./lib/index.js";

import { jujeobData } from "./data/data.js";

const submit = getNode("#submit");
const resultArea = getNode(".result");

const clickSubmitHandler = (e) => {
  e.preventDefault();

  let name = getInputValue("#nameField");
  let list = jujeobData(name);

  let pick = list[getRandom(list.length - 1)];

  if (!name) {
    console.log("이름을 입력해라");
    return;
  }

  if (isNumericString(name)) {
    console.log("제대로된 이름을 써라");
  }

  clearContents(resultArea);
  insertLast(resultArea, pick);
};

submit.addEventListener("click", clickSubmitHandler);
