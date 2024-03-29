import { selectedText } from "./SelectTest.js";
export const Test: HTMLElement = document.createElement("div");

//tylko do testów
const tes = document.querySelector(".test-button");
tes?.addEventListener("click", () => {
  const x = localStorage["speedTest"] || [];
  console.log("x", x);
});

const textForTest = selectedText;
let lettersCounter: number = 0;
let mistakesCounter: number = 0;
let correctionCounter: number = 0;
let timerId: number;
let startTime: number = 0;

const testContainer: HTMLElement = document.createElement("div");
const startButton: HTMLElement = document.createElement("button");
const tryAgainButton: HTMLElement = document.createElement("button");
const exitButton: HTMLElement = document.createElement("button");
const textParagraph: HTMLElement = document.createElement("p");
const testInput: HTMLTextAreaElement = document.createElement("textarea");
const statisticContainer: HTMLElement = document.createElement("div");
const buttonContainer: HTMLElement = document.createElement("div");
const timeElement: HTMLElement = document.createElement("p");
const mistakelement: HTMLElement = document.createElement("p");
const correctionElement: HTMLElement = document.createElement("p");
const letterslement: HTMLElement = document.createElement("p");
const lpsElement: HTMLElement = document.createElement("p");

const handleStartTimer = (): number => {
  const startInterval = setInterval(() => {
    startTime++;
    timeElement.textContent = `time left: ${startTime}s`;
  }, 1000);
  return startInterval;
};

const handleEndTest = () => {
  const popupContainerElement = document.querySelector(".popup");
  const popupTitleScoreSpan = popupContainerElement?.querySelector(
    "h1 > span"
  ) as HTMLElement;
  const popupTimeSpan = popupContainerElement?.querySelector(
    "p:nth-child(2) > span"
  ) as HTMLElement;
  const popupCorrectionsSpan = popupContainerElement?.querySelector(
    "p:nth-child(3) > span"
  ) as HTMLElement;
  const popupMistakesSpan = popupContainerElement?.querySelector(
    "p:nth-child(4) > span"
  ) as HTMLElement;
  const popuplpsSpan = popupContainerElement?.querySelector(
    "p:nth-child(5) > span"
  ) as HTMLElement;
  const popupBackgroundElement = document.querySelector(
    ".popup-background"
  ) as HTMLElement;

  popupTitleScoreSpan.textContent = `${17}%`;
  popupTimeSpan.textContent = `${startTime}`;
  popupCorrectionsSpan.textContent = `${correctionCounter}`;
  popupMistakesSpan.textContent = `${mistakesCounter}`;
  popuplpsSpan.textContent = `${
    Math.round((lettersCounter / startTime) * 10) / 10
  }`;
  popupBackgroundElement.style.display = "flex";
  clearInterval(timerId);

  const scoreButtonElement = popupContainerElement?.querySelector(
    "button"
  ) as HTMLElement;
  console.log(scoreButtonElement);

  scoreButtonElement.addEventListener("click", () => {
    const obj = {
      score: "17",
      time: `${startTime}`,
      speed: `${Math.round((lettersCounter / startTime) * 10) / 10}`,
      corrections: `${correctionCounter}`,
      mistakes: `${mistakesCounter}`,
      letters: `${lettersCounter}`,
    };

    console.log("obj", obj);

    const localStorageArray = localStorage["speedTest"] || [];
    const localStorageParse = JSON.parse(localStorageArray);

    if (localStorageParse.length < 1) {
      localStorage.setItem("speedTest", JSON.stringify([obj]));
    } else if (localStorageParse.length >= 1) {
      localStorageParse.push(obj);
      localStorage.setItem("speedTest", JSON.stringify(localStorageParse));
    }
    popupBackgroundElement.style.display = "none";
  });
};

const handleResetTest = (): void => {
  //to poniżej też jest 2 razy ;/
  const allTextLettersNumber: number = textForTest.content.length;
  lettersCounter = 0;
  mistakesCounter = 0;
  correctionCounter = 0;
  startTime = 0;

  timeElement.textContent = `time left: ${startTime}s`;
  letterslement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
  mistakelement.textContent = `mistakes: ${mistakesCounter}`;
  correctionElement.textContent = `corrections: ${correctionCounter}`;
  lpsElement.textContent = "lps: ---";

  const arrayLetters = textParagraph.querySelectorAll("span");
  arrayLetters.forEach((spanLetter) => {
    spanLetter.classList.remove("incorrect");
    spanLetter.classList.remove("corrected");
    spanLetter.classList.remove("correct");
  });
  testInput.value = "";
  testInput.focus();
};

const handleStartTest = (): void => {
  timerId = handleStartTimer();
  testContainer.removeChild(startButton);
  const allTextLettersNumber: number = textForTest.content.length;

  timeElement.textContent = `time left: ${startTime}s`;
  letterslement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
  mistakelement.textContent = `mistakes: ${mistakesCounter}`;
  correctionElement.textContent = `corrections: ${correctionCounter}`;
  lpsElement.textContent = "lps: ---";

  statisticContainer.classList.add("statistic-container");
  statisticContainer.appendChild(timeElement);
  statisticContainer.appendChild(correctionElement);
  statisticContainer.appendChild(mistakelement);
  statisticContainer.appendChild(letterslement);
  statisticContainer.appendChild(lpsElement);

  const arrayOfText = textForTest.content.split("");
  arrayOfText.map((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    textParagraph.appendChild(letterSpan);
  });
  //jes to dwa razy tutaj w kodzie ;/ to poniżej
  const arrayLetters = textParagraph.querySelectorAll("span");

  //ogranicz długość imputa do ilości
  testInput.setAttribute("maxlength", `${allTextLettersNumber}`);
  //usun typ any e: string || null ?
  testInput.addEventListener("input", (e: any) => {
    const backspaceEvent: boolean = e.inputType === "deleteContentBackward";
    const currentLetter: number = e.target.value.length;
    lettersCounter = currentLetter;
    letterslement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
    const lethersPerSecond: number =
      Math.round((lettersCounter / startTime) * 10) / 10;
    lpsElement.textContent = `lps: ${lethersPerSecond} `;

    // handleEndTest();

    if (currentLetter === allTextLettersNumber) {
      handleEndTest();
    }
    if (!backspaceEvent) {
      const spanLetter: HTMLElement = arrayLetters[currentLetter - 1];
      const spanLetterContent = spanLetter.textContent;
      const currentInputLetter = e.target.value.at(-1);

      if (currentLetter > 0) {
        const incorectSpanLetter = spanLetter.classList.contains("incorrect");
        if (spanLetterContent === currentInputLetter && incorectSpanLetter) {
          spanLetter.classList.remove("incorrect");
          spanLetter.classList.add("corrected");
          correctionCounter++;
          correctionElement.textContent = `corrections: ${correctionCounter}`;
        } else if (spanLetterContent === currentInputLetter) {
          spanLetter.classList.add("correct");
          spanLetter.classList.remove("incorrect");
        } else {
          spanLetter.classList.add("incorrect");
          spanLetter.classList.remove("correct");
          mistakesCounter++;
          mistakelement.textContent = `mistakes: ${mistakesCounter}`;
        }
      }
    }
  });

  testContainer.appendChild(textParagraph);
  testContainer.appendChild(testInput);
  testContainer.appendChild(statisticContainer);
  testInput.focus();
};

startButton.textContent = "start test";
startButton.classList.add("pink");
startButton.addEventListener("click", handleStartTest);
testContainer.appendChild(startButton);
testContainer.classList.add("selected-test-container");

tryAgainButton.classList.add("pink");
tryAgainButton.textContent = "try again";
tryAgainButton.addEventListener("click", handleResetTest);
exitButton.classList.add("blue");
exitButton.textContent = "exit test";
exitButton.addEventListener("click", () => {
  location.reload();
  clearInterval(timerId);
});

buttonContainer.appendChild(tryAgainButton);
buttonContainer.appendChild(exitButton);
Test.classList.add("test-section-container");
Test.appendChild(testContainer);
Test.appendChild(buttonContainer);
