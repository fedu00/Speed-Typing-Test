export const SelectTest: HTMLElement = document.createElement("div");

type TestText = {
  testTitle: string;
  content: string;
};

const firstTest: TestText = {
  testTitle: "Listen to Your Heart",
  content:
    "I know there's something in the wake of your smile I get a notion from the look in your eyes, yeah You've built a love but that love falls apart Your little piece of Heaven turns too dark Listen to your heart when he's calling for you Listen to your heart, there's nothing else you can do I don't know where you're going and I don't know why But listen to your heart before you tell him goodbye.",
};
const secondTest: TestText = {
  testTitle: "Dracula",
  content:
    "Dead I am the one Exterminating son Slipping through the trees Strangling the breeze Dead I am the sky  Watching angels cry While they slowly turn Conquering the worm Dig through the ditches and burn through the witches I slam in the back of my Dragula Dig through the ditches and burn through the witches I slam in the back of my Dragula Dead I am the pool Spreading from the fool Weak and want you need Nowhere as you bleed  Dead I am the rat Feast upon the cat Tender is the fur Dying as you purr.",
};
const thirdTest: TestText = {
  testTitle: "The Nights",
  content:
    "Once upon a younger year When all our shadows disappeared The animals inside came out to play Went face to face with all our fears Learned our lessons through the tears Made memories we knew would never fade  One day, my father, he told me, 'Son, don't let it slip away' He took me in his arms, I heard him say 'When you get older your wild heart will live for younger days Think of me if ever you're afraid He said, 'One day, you'll leave this world behind So live a life you will remember' My father told me when I was just a child  'These are the nights that never die' My father told me.",
};
const buttons: TestText[] = [firstTest, secondTest, thirdTest];

export const selectedText: TestText = { ...firstTest };

export const getSelectedTest: (testTitle: string, content: string) => void = (
  testTitle,
  content
) => {
  selectedText.testTitle = testTitle;
  selectedText.content = content;
};

const testsButtonsContainer: HTMLElement = document.createElement("div");
const testCntainer: HTMLElement = document.createElement("div");
const routeButtonsContainer: HTMLElement = document.createElement("div");
const testText: HTMLElement = document.createElement("p");
const backButton: HTMLElement = document.createElement("button");
const startButton: HTMLElement = document.createElement("button");

const handleSelectTest: (test: TestText, index: number) => void = (
  test,
  index
) => {
  testText.textContent = test.content;
  getSelectedTest(test.testTitle, test.content);

  const testsButtonsArray = Array.from(testsButtonsContainer.children);
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

buttons.map((test, index) => {
  const testButton: HTMLElement = document.createElement("button");

  testButton.textContent = test.testTitle;
  testButton.classList.add(index === 0 ? "blue" : "pink");

  testButton.addEventListener("click", (e) => {
    selectedText.content = test.content;
    handleSelectTest(test, index);
  });
  testsButtonsContainer.appendChild(testButton);
});

testsButtonsContainer.classList.add("test-buttons-container");

SelectTest.appendChild(testsButtonsContainer);
SelectTest.appendChild(testCntainer);
SelectTest.classList.add("select-test-container");

backButton.textContent = "back";
backButton.classList.add("blue");
backButton.setAttribute("data-navigate", "/");
startButton.textContent = "start";
startButton.classList.add("pink");
startButton.setAttribute("data-navigate", "/Test");

routeButtonsContainer.appendChild(backButton);
routeButtonsContainer.appendChild(startButton);

testText.textContent = buttons[0].content;
testCntainer.appendChild(testText);
testCntainer.appendChild(routeButtonsContainer);
testCntainer.classList.add("test-container");
