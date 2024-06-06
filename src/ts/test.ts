const selectedTestTextElement: HTMLParagraphElement | null =
  document.querySelector(".selected-test-text")!;

const textareaElement: HTMLTextAreaElement | null = document.querySelector(
  ".selected-test-container textarea"
)!;

const timeElement: HTMLParagraphElement | null =
  document.querySelector("#test-timer")!;
const mistakesElement: HTMLParagraphElement | null =
  document.querySelector("#test-mistakes")!;
const correctionsElement: HTMLParagraphElement | null =
  document.querySelector("#test-corrections")!;
const numberOfLettersElement: HTMLParagraphElement | null =
  document.querySelector("#test-number-of-letters")!;
const lpsElement: HTMLParagraphElement | null = document.querySelector("#lps")!;

const endTestButtonElement: HTMLElement | null =
  document.getElementById("end-test-button")!;

const testResultInputElement: HTMLInputElement | null =
  document.querySelector("input")!;

let lettersCounter: number = 0;
let mistakesCounter: number = 0;
let correctionCounter: number = 0;
let timerId: number;
let startTime: number = 0;

const tryAgainButtonElement: HTMLButtonElement = document.querySelector(
  "#test-page-try-again-button"
)!;
tryAgainButtonElement.addEventListener("click", () => {
  handleResetTest(selectedText.content.length);
});

const exitTestButtonElement: HTMLButtonElement = document.querySelector(
  "#test-page-exit-button"
)!;
exitTestButtonElement.addEventListener("click", () => {
  testPageContainer?.classList.remove("show-page");
  menuPageElement?.classList.add("show-page");
  selectedTestTextElement.innerHTML = "";
  handleExitTest();
});

const handleStartTimer = (): any => {
  const startInterval = setInterval(() => {
    startTime++;
    timeElement.textContent = `time left: ${startTime}s`;
  }, 1000);
  return startInterval;
};

const handleResetCounter = (allTextLettersNumber: number) => {
  timeElement.textContent = `time left: ${startTime}s`;
  mistakesElement.textContent = `mistakes: ${mistakesCounter}`;
  correctionsElement.textContent = `corrections: ${correctionCounter}`;
  numberOfLettersElement.textContent! = `letters: ${lettersCounter}/${allTextLettersNumber}`;
  lpsElement.textContent = `lps: --- `;
};

const handleStartTest = (selectedTest: TestText) => {
  const allTextLettersNumber: number = selectedTest.content.length;
  handleResetCounter(allTextLettersNumber);

  timerId = handleStartTimer();

  const arrayOfText = selectedTest.content.split("");

  arrayOfText.map((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    selectedTestTextElement.appendChild(letterSpan);
  });

  setTimeout(() => {
    textareaElement.focus();
  }, 200);
  textareaElement.setAttribute("maxlength", `${allTextLettersNumber}`);
  textareaElement.value = "";

  const arrayLettersElements = document.querySelectorAll(
    ".selected-test-text span"
  );

  textareaElement.addEventListener("input", (e: any) => {
    const backspaceEvent: boolean = e.inputType === "deleteContentBackward";
    const currentLetter: number = e.target.value.length;
    lettersCounter = currentLetter;

    numberOfLettersElement.textContent! = `letters: ${lettersCounter}/${allTextLettersNumber}`;
    const lethersPerSecond: number =
      Math.round((lettersCounter / startTime) * 10) / 10;
    lpsElement.textContent = `lps: ${lethersPerSecond} `;

    if (currentLetter === allTextLettersNumber) {
      handleEndTest();
    }
    if (!backspaceEvent) {
      const spanLetter = arrayLettersElements[currentLetter - 1];
      const spanLetterContent = spanLetter.textContent;
      const currentInputLetter = e.target.value.at(-1);

      if (currentLetter > 0) {
        const incorectSpanLetter = spanLetter.classList.contains("incorrect");

        const correctedLetter: boolean =
          spanLetterContent === currentInputLetter && incorectSpanLetter;
        const correctLetter: boolean = spanLetterContent === currentInputLetter;

        if (correctedLetter) {
          spanLetter.classList.remove("incorrect");
          spanLetter.classList.add("corrected");
          correctionCounter++;
          correctionsElement.textContent = `corrections: ${correctionCounter}`;
        } else if (correctLetter) {
          spanLetter.classList.add("correct");
          spanLetter.classList.remove("incorrect");
        } else {
          spanLetter.classList.add("incorrect");
          spanLetter.classList.remove("correct");
          mistakesCounter++;
          mistakesElement.textContent = `mistakes: ${mistakesCounter}`;
        }
      }
    }
  });
};

const handleEndTest = () => {
  const popupTimeSpan = document?.querySelector(
    "#popup-test-time"
  ) as HTMLElement;
  const popupCorrectionsSpan = document?.querySelector(
    "#popup-test-corrections"
  ) as HTMLElement;
  const popupMistakesSpan = document?.querySelector(
    "#popup-test-mistakes"
  ) as HTMLElement;
  const popuplpsSpan = document?.querySelector(
    "#popup-test-lps"
  ) as HTMLElement;
  const popupBackgroundElement = document.querySelector(
    ".popup-background"
  ) as HTMLElement;

  popupTimeSpan.textContent = `${startTime}s`;
  popupCorrectionsSpan.textContent = `${correctionCounter}`;
  popupMistakesSpan.textContent = `${mistakesCounter}`;
  popuplpsSpan.textContent = `${
    Math.round((lettersCounter / startTime) * 10) / 10
  }`;
  popupBackgroundElement.style.display = "flex";
  clearInterval(timerId);

  endTestButtonElement.addEventListener("click", () => {
    const obj = {
      testName: testResultInputElement.value,
      time: `${startTime}`,
      speed: `${Math.round((lettersCounter / startTime) * 10) / 10}`,
      corrections: `${correctionCounter}`,
      mistakes: `${mistakesCounter}`,
      letters: `${lettersCounter}`,
    };

    const localStorageArray = localStorage["speedTest"] || [];

    if (localStorageArray.length < 1) {
      localStorage.setItem("speedTest", JSON.stringify([obj]));
    } else if (localStorageArray.length >= 1) {
      const localStorageParse = JSON.parse(localStorageArray);
      localStorageParse.push(obj);
      localStorage.setItem("speedTest", JSON.stringify(localStorageParse));
    }
    popupBackgroundElement.style.display = "none";
    menuPageElement?.classList.add("show-page");
    testPageContainer?.classList.remove("show-page");
  });
};

const handleExitTest = () => {
  lettersCounter = 0;
  mistakesCounter = 0;
  correctionCounter = 0;
  startTime = 0;
  clearInterval(timerId);
};

const handleResetTest = (allTextLettersNumber: number): void => {
  lettersCounter = 0;
  mistakesCounter = 0;
  correctionCounter = 0;
  startTime = 0;
  handleResetCounter(allTextLettersNumber);

  const arrayLetters = document.querySelectorAll(".selected-test-text span");
  arrayLetters.forEach((spanLetter) => {
    spanLetter.classList.remove("incorrect");
    spanLetter.classList.remove("corrected");
    spanLetter.classList.remove("correct");
  });
  textareaElement.value = "";
  textareaElement.focus();
};
