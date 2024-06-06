const menuPageElement: HTMLElement | null =
  document.querySelector(".menu-page");
const selectPageElement: HTMLElement | null =
  document.querySelector(".select-test-page");
const scoreboardPageElement: HTMLElement | null =
  document.querySelector(".score-board-page");
const selectTestButton: HTMLButtonElement | null = document.querySelector(
  "#menu-page-select-test-button"
);

selectTestButton!.addEventListener("click", () => {
  menuPageElement?.classList.remove("show-page");
  selectPageElement?.classList.add("show-page");
});
