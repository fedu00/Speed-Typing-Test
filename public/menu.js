"use strict";
const menuPageElement = document.querySelector(".menu-page");
const selectPageElement = document.querySelector(".select-test-page");
const scoreboardPageElement = document.querySelector(".score-board-page");
const selectTestButton = document.querySelector("#menu-page-select-test-button");
selectTestButton.addEventListener("click", () => {
    menuPageElement === null || menuPageElement === void 0 ? void 0 : menuPageElement.classList.remove("show-page");
    selectPageElement === null || selectPageElement === void 0 ? void 0 : selectPageElement.classList.add("show-page");
});
