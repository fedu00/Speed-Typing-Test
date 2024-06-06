"use strict";
console.log("menu js");
const menuPageContainer = document.querySelector(".menu-page");
const selectPageContainer = document.querySelector(".select-test-page");
const scoreboardPageContainer = document.querySelector(".score-board-page");
const selectTestButton = document.querySelector(".menu-buttons button:nth-child(1)");
const scoreboardTestButton = document.querySelector(".menu-buttons button:nth-child(2)");
selectTestButton.addEventListener("click", () => {
    console.log("xD");
    menuPageContainer === null || menuPageContainer === void 0 ? void 0 : menuPageContainer.classList.remove("show-page");
    selectPageContainer === null || selectPageContainer === void 0 ? void 0 : selectPageContainer.classList.add("show-page");
});
scoreboardTestButton.addEventListener("click", () => {
    menuPageContainer === null || menuPageContainer === void 0 ? void 0 : menuPageContainer.classList.remove("show-page");
    scoreboardPageContainer === null || scoreboardPageContainer === void 0 ? void 0 : scoreboardPageContainer.classList.add("show-page");
});
