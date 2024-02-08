import { selectedText } from "./SelectTest.js";
export const Test = document.createElement("div");
const tes = document.querySelector(".test-button");
tes === null || tes === void 0 ? void 0 : tes.addEventListener("click", () => {
    const x = localStorage["speedTest"] || [];
    console.log("x", x);
});
const textForTest = selectedText;
let lettersCounter = 0;
let mistakesCounter = 0;
let correctionCounter = 0;
let timerId;
let startTime = 0;
const testContainer = document.createElement("div");
const startButton = document.createElement("button");
const tryAgainButton = document.createElement("button");
const exitButton = document.createElement("button");
const textParagraph = document.createElement("p");
const testInput = document.createElement("textarea");
const statisticContainer = document.createElement("div");
const buttonContainer = document.createElement("div");
const timeElement = document.createElement("p");
const mistakelement = document.createElement("p");
const correctionElement = document.createElement("p");
const letterslement = document.createElement("p");
const lpsElement = document.createElement("p");
const handleStartTimer = () => {
    const startInterval = setInterval(() => {
        startTime++;
        timeElement.textContent = `time left: ${startTime}s`;
    }, 1000);
    return startInterval;
};
const handleEndTest = () => {
    const popupContainerElement = document.querySelector(".popup");
    const popupTitleScoreSpan = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("h1 > span");
    const popupTimeSpan = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("p:nth-child(2) > span");
    const popupCorrectionsSpan = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("p:nth-child(3) > span");
    const popupMistakesSpan = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("p:nth-child(4) > span");
    const popuplpsSpan = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("p:nth-child(5) > span");
    const popupBackgroundElement = document.querySelector(".popup-background");
    popupTitleScoreSpan.textContent = `${17}%`;
    popupTimeSpan.textContent = `${startTime}`;
    popupCorrectionsSpan.textContent = `${correctionCounter}`;
    popupMistakesSpan.textContent = `${mistakesCounter}`;
    popuplpsSpan.textContent = `${Math.round((lettersCounter / startTime) * 10) / 10}`;
    popupBackgroundElement.style.display = "flex";
    clearInterval(timerId);
    const scoreButtonElement = popupContainerElement === null || popupContainerElement === void 0 ? void 0 : popupContainerElement.querySelector("button");
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
        }
        else if (localStorageParse.length >= 1) {
            localStorageParse.push(obj);
            localStorage.setItem("speedTest", JSON.stringify(localStorageParse));
        }
        popupBackgroundElement.style.display = "none";
    });
};
const handleResetTest = () => {
    const allTextLettersNumber = textForTest.content.length;
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
const handleStartTest = () => {
    timerId = handleStartTimer();
    testContainer.removeChild(startButton);
    const allTextLettersNumber = textForTest.content.length;
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
    const arrayLetters = textParagraph.querySelectorAll("span");
    testInput.setAttribute("maxlength", `${allTextLettersNumber}`);
    testInput.addEventListener("input", (e) => {
        const backspaceEvent = e.inputType === "deleteContentBackward";
        const currentLetter = e.target.value.length;
        lettersCounter = currentLetter;
        letterslement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
        const lethersPerSecond = Math.round((lettersCounter / startTime) * 10) / 10;
        lpsElement.textContent = `lps: ${lethersPerSecond} `;
        if (currentLetter === allTextLettersNumber) {
            handleEndTest();
        }
        if (!backspaceEvent) {
            const spanLetter = arrayLetters[currentLetter - 1];
            const spanLetterContent = spanLetter.textContent;
            const currentInputLetter = e.target.value.at(-1);
            if (currentLetter > 0) {
                const incorectSpanLetter = spanLetter.classList.contains("incorrect");
                if (spanLetterContent === currentInputLetter && incorectSpanLetter) {
                    spanLetter.classList.remove("incorrect");
                    spanLetter.classList.add("corrected");
                    correctionCounter++;
                    correctionElement.textContent = `corrections: ${correctionCounter}`;
                }
                else if (spanLetterContent === currentInputLetter) {
                    spanLetter.classList.add("correct");
                    spanLetter.classList.remove("incorrect");
                }
                else {
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
