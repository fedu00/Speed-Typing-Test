import { menuPageContainer, selectPageContainer, selectTestButton, scoreboardTestButton, } from "./menu";
import { testF } from "./scoreBoard";
console.log("eee!");
selectTestButton.addEventListener("click", () => {
    menuPageContainer === null || menuPageContainer === void 0 ? void 0 : menuPageContainer.classList.remove("show-page");
    selectPageContainer === null || selectPageContainer === void 0 ? void 0 : selectPageContainer.classList.add("show-page");
    console.log("nie");
});
scoreboardTestButton.addEventListener("click", () => {
    console.log("ta");
    testF();
});
