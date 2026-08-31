const testContainer = document.querySelector(".test-container");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startContainer = document.querySelector(".start-container");
const passageDisplay = document.getElementById("passage-display");
const wpmVal = document.getElementById("wpm-val");
const accuracyVal = document.getElementById("accuracy-val");
const timeVal = document.getElementById("time-val");

let passages = {};
let isTestRunning = false;

async function init() {
  try {
    const response = await fetch("./data.json");
    passages = await response.json();
  } catch (err) {
    console.error("Failed to load passages:", err);
  }
}

function setupToggleButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (isTestRunning) return;
      buttons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}

setupToggleButtons(".difficulty-btn");
setupToggleButtons(".mode-btn");

function resetStats() {
  if (wpmVal) wpmVal.textContent = "0";
  if (accuracyVal) accuracyVal.textContent = "100%";
  if (timeVal) timeVal.textContent = "0:60";
}

function startTypingTest(e) {
  // Prevent keydown/clicks from restarting an active test
  if (isTestRunning) return;

  const selectedBtn = document.querySelector(".difficulty-btns .selected")?.id;
  const selectedDropdown = document.getElementById("difficulty-select")?.value;
  const difficulty = selectedBtn || selectedDropdown || "easy";

  const difficultyPassages = passages[difficulty];
  if (!difficultyPassages || difficultyPassages.length === 0) return;

  const randomPassage =
    difficultyPassages[Math.floor(Math.random() * difficultyPassages.length)];
  passageDisplay.textContent = randomPassage.text;

  testContainer.classList.add("is-active");

  document.getElementById("overlay").setAttribute("aria-hidden", "true");
  document.getElementById("restart-container").setAttribute("aria-hidden", "false");

  isTestRunning = true;
}

startContainer.addEventListener("click", startTypingTest);

restartBtn.addEventListener("click", () => {
    resetStats();
    isTestRunning = false;
    startTypingTest();
});

document.addEventListener("keydown", (e) => {
  // Ignore system/modifier keys when starting the test
  if (e.key === "Tab" || e.altKey || e.ctrlKey || e.metaKey) return;

  if (!isTestRunning) {
    startTypingTest(e);
  }
});

init();