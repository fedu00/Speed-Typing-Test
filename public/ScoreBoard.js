"use strict";
const COLUMNS_NAME = {
    testName: "test name",
    letters: "letters",
    corrections: "corrects",
    mistakes: "mistakes",
    time: "time",
    speed: "lps",
};
const scoreBoardContainerElement = document.querySelector("table");
const scoreboardButtonBackElement = document.getElementById("score-board-page-button");
const scoreboardTestButtonElement = document.querySelector("#menu-page-scoreboard-button");
scoreboardTestButtonElement.addEventListener("click", () => {
    menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.remove("show-page");
    scoreboardPageElement === null || scoreboardPageElement === void 0 ? void 0 : scoreboardPageElement.classList.add("show-page");
    scoreBoardContainerElement.innerHTML = "";
    createTableRow(COLUMNS_NAME);
    const localStorageData = localStorage["speedTest"] || [];
    const scoreData = JSON.parse(localStorageData);
    scoreData.forEach((el) => {
        createTableRow(el);
    });
});
const scoreboardTableElement = document.querySelector(".score-board-container");
scoreboardTableElement === null || scoreboardTableElement === void 0 ? void 0 : scoreboardTableElement.addEventListener("click", () => {
    menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.add("show-page");
    scoreboardPageElement === null || scoreboardPageElement === void 0 ? void 0 : scoreboardPageElement.classList.remove("show-page");
});
const createTableRow = (tableRowData) => {
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
    scoreBoardContainerElement.appendChild(scoreContainerElement);
};
