import { Menu } from "./routes/Menu.js";
import { SelectTest } from "./routes/SelectTest.js";
import { Test } from "./routes/Test.js";
import { ScoreBoard } from "./routes/ScoreBoard.js";
const routes = {
  "/": {
    component: Menu,
  },
  "/SelectTest": {
    component: SelectTest,
  },
  "/Test": {
    component: Test,
  },
  "/ScoreBoard": {
    component: ScoreBoard,
  },
};
const rootDiv = document.getElementById("root");
const childElement = routes["/"].component;
rootDiv.appendChild(childElement);
const handleNavigate = (pathName) => {
  const childElement = routes[pathName].component;
  const roodDivChildren = rootDiv.children[0];
  rootDiv.removeChild(roodDivChildren);
  rootDiv.appendChild(childElement);
  addNavigate();
};
addEventListener("popstate", () => {
  handleNavigate(window.location.pathname);
});
const addNavigate = () => {
  const buttonsHTMLColection = rootDiv.getElementsByTagName("button");
  const buttons = [...buttonsHTMLColection];
  buttons.forEach((button) => {
    const adress = button.getAttribute("data-navigate");
    if (typeof adress === "string") {
      button.addEventListener("click", () => {
        handleNavigate(adress);
      });
    }
  });
};
addNavigate();
