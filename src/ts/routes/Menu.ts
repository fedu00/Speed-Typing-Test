export const Menu: HTMLElement = document.createElement("div");
const buttonOne: HTMLElement = document.createElement("button");
const buttonTwo: HTMLElement = document.createElement("button");
buttonOne.textContent = "SelectTest";
buttonOne.setAttribute("data-navigate", "/SelectTest");
Menu.appendChild(buttonOne);
buttonTwo.textContent = "ScoreBoard";
buttonTwo.setAttribute("data-navigate", "/ScoreBoard");
Menu.appendChild(buttonTwo);