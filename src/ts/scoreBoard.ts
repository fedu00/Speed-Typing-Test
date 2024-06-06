type TableRowType = {
  corrections: string;
  letters: string;
  mistakes: string;
  testName: string;
  speed: string;
  time: string;
};

const COLUMNS_NAME: TableRowType = {
  testName: "test name",
  letters: "letters",
  corrections: "corrects",
  mistakes: "mistakes",
  time: "time",
  speed: "lps",
};
const scoreBoardContainerElement: HTMLTableElement =
  document.querySelector("table")!;

const scoreboardButtonBackElement: HTMLElement | null = document.getElementById(
  "score-board-page-button"
);

const scoreboardTestButtonElement: HTMLButtonElement | null =
  document.querySelector("#menu-page-scoreboard-button");
scoreboardTestButtonElement!.addEventListener("click", () => {
  menuPageElement?.classList.remove("show-page");
  scoreboardPageElement?.classList.add("show-page");

  scoreBoardContainerElement.innerHTML = "";
  createTableRow(COLUMNS_NAME);

  const localStorageData = localStorage["speedTest"] || [];
  const scoreData = JSON.parse(localStorageData);
  scoreData.forEach((el: TableRowType) => {
    createTableRow(el);
  });
});

const scoreboardTableElement: HTMLTableElement | null = document.querySelector(
  ".score-board-container"
);

scoreboardTableElement?.addEventListener("click", () => {
  menuPageElement?.classList.add("show-page");
  scoreboardPageElement?.classList.remove("show-page");
});

const createTableRow = (tableRowData: TableRowType): void => {
  const scoreContainerElement: HTMLElement = document.createElement("tr");

  const testNameElement: HTMLElement = document.createElement("th");
  const lettersElement: HTMLElement = document.createElement("th");
  const correctsElement: HTMLElement = document.createElement("th");
  const mistakesElement: HTMLElement = document.createElement("th");
  const timeElement: HTMLElement = document.createElement("th");
  const speedElement: HTMLElement = document.createElement("th");

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
