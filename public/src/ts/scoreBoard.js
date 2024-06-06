import { menuPageContainer } from "./menu";
export const scoreboardPageContainer = document.querySelector(".score-board-page");
const scoreboardTableElement = document.querySelector(".score-board-container");
scoreboardTableElement === null || scoreboardTableElement === void 0 ? void 0 : scoreboardTableElement.addEventListener("click", () => {
    menuPageContainer === null || menuPageContainer === void 0 ? void 0 : menuPageContainer.classList.add("show-page");
    scoreboardPageContainer === null || scoreboardPageContainer === void 0 ? void 0 : scoreboardPageContainer.classList.remove("show-page");
});
const localStorageData = localStorage["speedTest"] || [];
const scoreData = JSON.parse(localStorageData);
export const testF = () => {
    console.log("xD");
    scoreData.forEach((el) => {
        createTableRow(el);
    });
};
const scoreBoardContainer = document.querySelector("table");
export const createTableRow = (tableRowData) => {
    const scoreContainerElement = document.createElement("tr");
    const testNameElement = document.createElement("th");
    const lettersElement = document.createElement("th");
    const correctsElement = document.createElement("th");
    const mistakesElement = document.createElement("th");
    const timeElement = document.createElement("th");
    const speedElement = document.createElement("th");
    testNameElement.innerText = tableRowData.testName;
    lettersElement.innerText = tableRowData.letters;
    correctsElement.innerText = tableRowData.corrections;
    mistakesElement.innerText = tableRowData.mistakes;
    timeElement.innerText = tableRowData.time;
    speedElement.innerText = tableRowData.speed;
    scoreContainerElement.appendChild(testNameElement);
    scoreContainerElement.appendChild(lettersElement);
    scoreContainerElement.appendChild(correctsElement);
    scoreContainerElement.appendChild(mistakesElement);
    scoreContainerElement.appendChild(timeElement);
    scoreContainerElement.appendChild(speedElement);
    scoreBoardContainer.appendChild(scoreContainerElement);
};
