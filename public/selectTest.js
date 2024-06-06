"use strict";
const buttons = [FIRST_TEST, SECOND_TEST, THIRD_TEST];
const selectedText = Object.assign({}, FIRST_TEST);
const backToMenuButtonElement = document.querySelector("#select-test-page-back-button");
const startTestButtonElement = document.querySelector("#select-test-page-start-test-button");
const testPageContainer = document.querySelector(".test-page");
const selectTestButtonsContainerElement = document.querySelector(".test-buttons-container");
const selectedTextElement = document.querySelector(".selected-text");
backToMenuButtonElement.addEventListener("click", () => {
    menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.add("show-page");
    selectPageElement === null || selectPageElement === void 0 ? void 0 : selectPageElement.classList.remove("show-page");
});
startTestButtonElement.addEventListener("click", () => {
    handleStartTest(selectedText);
    testPageContainer === null || testPageContainer === void 0 ? void 0 : testPageContainer.classList.add("show-page");
    selectPageElement === null || selectPageElement === void 0 ? void 0 : selectPageElement.classList.remove("show-page");
});
selectedTextElement.textContent = selectedText.content;
const handleSelectTest = (test, index) => {
    selectedTextElement.textContent = test.content;
    getSelectedTest(test.testTitle, test.content);
    const testsButtonsArray = Array.from(selectTestButtonsContainerElement.children);
    testsButtonsArray.forEach((test, buttonIndex) => {
        if (index != buttonIndex) {
            test.classList.remove("blue");
            test.classList.add("pink");
        }
        else {
            test.classList.remove("pink");
            test.classList.add("blue");
        }
    });
};
const getSelectedTest = (testTitle, content) => {
    selectedText.testTitle = testTitle;
    selectedText.content = content;
};
buttons.map((test, index) => {
    const testButtonElement = document.createElement("button");
    testButtonElement.textContent = test.testTitle;
    testButtonElement.classList.add(index === 0 ? "blue" : "pink");
    testButtonElement.addEventListener("click", (e) => {
        selectedText.content = test.content;
        selectedText.testTitle = test.testTitle;
        handleSelectTest(test, index);
    });
    selectTestButtonsContainerElement.appendChild(testButtonElement);
});
