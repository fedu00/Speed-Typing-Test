export const ScoreBoard = document.createElement("div");
ScoreBoard.classList.add("score-board-container");
const tableTitles = {
    corrections: "corrects",
    letters: "letters",
    mistakes: "mistakes",
    score: "score",
    speed: "lps",
    time: "time",
};
const localStorageData = localStorage["speedTest"] || [];
const scoreData = JSON.parse(localStorageData);
const scoreBoardContainer = document.createElement("table");
const backButton = document.createElement("button");
backButton.innerText = "back to menu";
backButton.classList.add("pink");
backButton.setAttribute("data-navigate", "/");
const createTableRow = (tableRowData) => {
    const scoreContainerElement = document.createElement("tr");
    const correctsElement = document.createElement("th");
    const lettersElement = document.createElement("th");
    const mistakesElement = document.createElement("th");
    const scoreElement = document.createElement("th");
    const speedElement = document.createElement("th");
    const timeElement = document.createElement("th");
    correctsElement.innerText = tableRowData.corrections;
    lettersElement.innerText = tableRowData.letters;
    mistakesElement.innerText = tableRowData.mistakes;
    scoreElement.innerText = tableRowData.score;
    speedElement.innerText = tableRowData.speed;
    timeElement.innerText = tableRowData.time;
    scoreContainerElement.appendChild(correctsElement);
    scoreContainerElement.appendChild(lettersElement);
    scoreContainerElement.appendChild(mistakesElement);
    scoreContainerElement.appendChild(scoreElement);
    scoreContainerElement.appendChild(speedElement);
    scoreContainerElement.appendChild(timeElement);
    scoreBoardContainer.appendChild(scoreContainerElement);
};
createTableRow(tableTitles);
scoreData.forEach((el) => {
    createTableRow(el);
});
ScoreBoard.appendChild(scoreBoardContainer);
ScoreBoard.appendChild(backButton);
