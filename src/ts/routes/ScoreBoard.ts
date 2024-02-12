export const ScoreBoard: HTMLElement = document.createElement("div");
ScoreBoard.classList.add("score-board-container");

type TableRowType = {
  corrections: string;
  letters: string;
  mistakes: string;
  score: string;
  speed: string;
  time: string;
};

const tableTitles: TableRowType = {
  corrections: "corrects",
  letters: "letters",
  mistakes: "mistakes",
  score: "score",
  speed: "lps",
  time: "time",
};

const localStorageData = localStorage["speedTest"] || [];
const scoreData = JSON.parse(localStorageData);

const scoreBoardContainer: HTMLElement = document.createElement("table");

const backButton: HTMLElement = document.createElement("button");

backButton.innerText = "back to menu";
backButton.classList.add("pink");
backButton.setAttribute("data-navigate", "/");

const createTableRow = (tableRowData: TableRowType): void => {
  const scoreContainerElement: HTMLElement = document.createElement("tr");
  const correctsElement: HTMLElement = document.createElement("th");
  const lettersElement: HTMLElement = document.createElement("th");
  const mistakesElement: HTMLElement = document.createElement("th");
  const scoreElement: HTMLElement = document.createElement("th");
  const speedElement: HTMLElement = document.createElement("th");
  const timeElement: HTMLElement = document.createElement("th");

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

scoreData.forEach((el: TableRowType) => {
  createTableRow(el);
});

ScoreBoard.appendChild(scoreBoardContainer);
ScoreBoard.appendChild(backButton);
