export const Menu = document.createElement("div");
const buttonOne = document.createElement("button");
const buttonTwo = document.createElement("button");
buttonOne.textContent = "SelectTest";
buttonOne.setAttribute("data-navigate", "/SelectTest");
Menu.appendChild(buttonOne);
buttonTwo.textContent = "ScoreBoard";
buttonTwo.setAttribute("data-navigate", "/ScoreBoard");
Menu.appendChild(buttonTwo);
