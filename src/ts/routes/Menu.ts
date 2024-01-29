export const Menu: HTMLElement = document.createElement("div");
const buttonsContainer: HTMLElement = document.createElement("div");
const buttonOne: HTMLElement = document.createElement("button");
const buttonTwo: HTMLElement = document.createElement("button");
const menuTitleElement: HTMLElement = document.createElement("h1");
menuTitleElement.textContent = "MENU";

buttonOne.textContent = "SelectTest";
buttonOne.setAttribute("data-navigate", "/SelectTest");
buttonOne.classList.add("pink");
buttonsContainer.appendChild(buttonOne);

buttonTwo.textContent = "ScoreBoard";
buttonTwo.setAttribute("data-navigate", "/ScoreBoard");
buttonTwo.classList.add("blue");
buttonsContainer.appendChild(buttonTwo);

Menu.appendChild(menuTitleElement);
Menu.appendChild(buttonsContainer);
Menu.classList.add("menu-container");
