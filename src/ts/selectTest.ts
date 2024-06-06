const buttons: TestText[] = [FIRST_TEST, SECOND_TEST, THIRD_TEST];
const selectedText: TestText = { ...FIRST_TEST };

const backToMenuButtonElement: HTMLButtonElement | null =
  document.querySelector("#select-test-page-back-button");
const startTestButtonElement: HTMLButtonElement | null = document.querySelector(
  "#select-test-page-start-test-button"
);
const testPageContainer: HTMLElement | null =
  document.querySelector(".test-page");
const selectTestButtonsContainerElement: HTMLElement = document.querySelector(
  ".test-buttons-container"
)!;
const selectedTextElement: HTMLParagraphElement | null =
  document.querySelector(".selected-text")!;

backToMenuButtonElement!.addEventListener("click", () => {
  menuPageElement?.classList.add("show-page");
  selectPageElement?.classList.remove("show-page");
});

startTestButtonElement!.addEventListener("click", () => {
  handleStartTest(selectedText);
  testPageContainer?.classList.add("show-page");
  selectPageElement?.classList.remove("show-page");
});

selectedTextElement.textContent = selectedText.content;

const handleSelectTest: (test: TestText, index: number) => void = (
  test,
  index
) => {
  selectedTextElement.textContent = test.content;
  getSelectedTest(test.testTitle, test.content);

  const testsButtonsArray = Array.from(
    selectTestButtonsContainerElement!.children
  );

  testsButtonsArray.forEach((test, buttonIndex) => {
    if (index != buttonIndex) {
      test.classList.remove("blue");
      test.classList.add("pink");
    } else {
      test.classList.remove("pink");
      test.classList.add("blue");
    }
  });
};

const getSelectedTest: (testTitle: string, content: string) => void = (
  testTitle,
  content
) => {
  selectedText.testTitle = testTitle;
  selectedText.content = content;
};

buttons.map((test, index) => {
  const testButtonElement: HTMLElement = document.createElement("button");

  testButtonElement.textContent = test.testTitle;
  testButtonElement.classList.add(index === 0 ? "blue" : "pink");

  testButtonElement.addEventListener("click", (e) => {
    selectedText.content = test.content;
    selectedText.testTitle = test.testTitle;
    handleSelectTest(test, index);
  });

  selectTestButtonsContainerElement!.appendChild(testButtonElement);
});
