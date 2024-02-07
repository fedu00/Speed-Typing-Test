import { selectedText } from "./SelectTest.js";
export const Test = document.createElement("div");
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
        letterslement.textContent = `letters: ${currentLetter}/${allTextLettersNumber}`;
        const lethersPerSecond = Math.round((currentLetter / startTime) * 10) / 10;
        lpsElement.textContent = `lps: ${lethersPerSecond} `;
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
});
buttonContainer.appendChild(tryAgainButton);
buttonContainer.appendChild(exitButton);
Test.classList.add("test-section-container");
Test.appendChild(testContainer);
Test.appendChild(buttonContainer);
