import { Menu } from "./routes/Menu.js";
import { SelectTest } from "./routes/SelectTest.js";
import { Test } from "./routes/Test.js";
import { ScoreBoard } from "./routes/ScoreBoard.js";

type RoutesType = {
  "/": { component: HTMLElement };
  "/SelectTest": { component: HTMLElement };
  "/Test": { component: HTMLElement };
  "/ScoreBoard": { component: HTMLElement };
};

const routes: RoutesType = {
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
// delete this before hosting web
(function () {
  history.pushState({}, "", "/");
})();
const rootDiv = document.getElementById("root") as HTMLElement;
const childElement =
  routes[window.location.pathname as keyof typeof routes].component;
rootDiv.appendChild(childElement);

const handleNavigate: (pathName: string) => void = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  const childElement = routes[pathName as keyof typeof routes].component;
  const roodDivChildren = rootDiv.children[0];
  rootDiv.removeChild(roodDivChildren);
  rootDiv.appendChild(childElement);
};

addEventListener("popstate", () => {
  handleNavigate(window.location.pathname);
});

const addNavigate: () => void = () => {
  const buttonsHTMLColection: HTMLCollectionOf<HTMLButtonElement> =
    rootDiv.getElementsByTagName("button");
  const buttons = [...buttonsHTMLColection];
  buttons.forEach((button) => {
    const adress: string | null = button.getAttribute("data-navigate");
    if (typeof adress === "string") {
      button.addEventListener("click", () => {
        handleNavigate(adress);
      });
    }
  });
};
addNavigate();
