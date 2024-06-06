"use strict";
const selectedTestTextElement = document.querySelector(".selected-test-text");
const textareaElement = document.querySelector(".selected-test-container textarea");
const timeElement = document.querySelector("#test-timer");
const mistakesElement = document.querySelector("#test-mistakes");
const correctionsElement = document.querySelector("#test-corrections");
const numberOfLettersElement = document.querySelector("#test-number-of-letters");
const lpsElement = document.querySelector("#lps");
const endTestButtonElement = document.getElementById("end-test-button");
const testResultInputElement = document.querySelector("input");
let lettersCounter = 0;
let mistakesCounter = 0;
let correctionCounter = 0;
let timerId;
let startTime = 0;
const tryAgainButtonElement = document.querySelector("#test-page-try-again-button");
tryAgainButtonElement.addEventListener("click", () => {
    handleResetTest(selectedText.content.length);
});
const exitTestButtonElement = document.querySelector("#test-page-exit-button");
exitTestButtonElement.addEventListener("click", () => {
    testPageContainer === null || testPageContainer === void 0 ? void 0 : testPageContainer.classList.remove("show-page");
    menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.add("show-page");
    selectedTestTextElement.innerHTML = "";
    handleExitTest();
});
const handleStartTimer = () => {
    const startInterval = setInterval(() => {
        startTime++;
        timeElement.textContent = `time left: ${startTime}s`;
    }, 1000);
    return startInterval;
};
const handleResetCounter = (allTextLettersNumber) => {
    timeElement.textContent = `time left: ${startTime}s`;
    mistakesElement.textContent = `mistakes: ${mistakesCounter}`;
    correctionsElement.textContent = `corrections: ${correctionCounter}`;
    numberOfLettersElement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
    lpsElement.textContent = `lps: --- `;
};
const handleStartTest = (selectedTest) => {
    const allTextLettersNumber = selectedTest.content.length;
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
    const arrayLettersElements = document.querySelectorAll(".selected-test-text span");
    textareaElement.addEventListener("input", (e) => {
        const backspaceEvent = e.inputType === "deleteContentBackward";
        const currentLetter = e.target.value.length;
        lettersCounter = currentLetter;
        numberOfLettersElement.textContent = `letters: ${lettersCounter}/${allTextLettersNumber}`;
        const lethersPerSecond = Math.round((lettersCounter / startTime) * 10) / 10;
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
                const correctedLetter = spanLetterContent === currentInputLetter && incorectSpanLetter;
                const correctLetter = spanLetterContent === currentInputLetter;
                if (correctedLetter) {
                    spanLetter.classList.remove("incorrect");
                    spanLetter.classList.add("corrected");
                    correctionCounter++;
                    correctionsElement.textContent = `corrections: ${correctionCounter}`;
                }
                else if (correctLetter) {
                    spanLetter.classList.add("correct");
                    spanLetter.classList.remove("incorrect");
                }
                else {
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
    const popupTimeSpan = document === null || document === void 0 ? void 0 : document.querySelector("#popup-test-time");
    const popupCorrectionsSpan = document === null || document === void 0 ? void 0 : document.querySelector("#popup-test-corrections");
    const popupMistakesSpan = document === null || document === void 0 ? void 0 : document.querySelector("#popup-test-mistakes");
    const popuplpsSpan = document === null || document === void 0 ? void 0 : document.querySelector("#popup-test-lps");
    const popupBackgroundElement = document.querySelector(".popup-background");
    popupTimeSpan.textContent = `${startTime}s`;
    popupCorrectionsSpan.textContent = `${correctionCounter}`;
    popupMistakesSpan.textContent = `${mistakesCounter}`;
    popuplpsSpan.textContent = `${Math.round((lettersCounter / startTime) * 10) / 10}`;
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
        }
        else if (localStorageArray.length >= 1) {
            const localStorageParse = JSON.parse(localStorageArray);
            localStorageParse.push(obj);
            localStorage.setItem("speedTest", JSON.stringify(localStorageParse));
        }
        popupBackgroundElement.style.display = "none";
        menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.add("show-page");
        testPageContainer === null || testPageContainer === void 0 ? void 0 : testPageContainer.classList.remove("show-page");
    });
};
const handleExitTest = () => {
    lettersCounter = 0;
    mistakesCounter = 0;
    correctionCounter = 0;
    startTime = 0;
    clearInterval(timerId);
};
const handleResetTest = (allTextLettersNumber) => {
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
