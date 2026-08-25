const testContainer = document.querySelector(".test-container");
const startBtn = document.getElementById("start-btn");
const startContainer = document.querySelector(".start-container");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

function setupToggleButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}

setupToggleButtons(".difficulty-btn");
setupToggleButtons(".mode-btn");

function startTypingTest() {
  const difficulty =
    document.querySelector(".difficulty-btns .selected")?.id || "easy";

  testContainer.classList.add("is-active");

  document.getElementById("overlay").setAttribute("aria-hidden", "true");
}

startBtn.addEventListener("click", startTypingTest);
startContainer.addEventListener("click", startTypingTest);