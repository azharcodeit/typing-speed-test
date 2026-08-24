document.getElementById("start-btn").addEventListener("click", function() {
  const difficulty = document.querySelector(".difficulty-btns .selected")?.id || "easy"; // Default to easy if none selected
  startTypingTest(difficulty);
});

const difficultyButtons = document.querySelectorAll(".difficulty-btn");
difficultyButtons.forEach(button => {
  button.addEventListener("click", function() {
    difficultyButtons.forEach(btn => btn.classList.remove("selected"));
    this.classList.add("selected");
  });
});

function startTypingTest(difficulty) {
  alert(`Starting typing test with difficulty: ${difficulty}`)
}

function setupToggleButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      buttons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}

setupToggleButtons('.difficulty-btn');
setupToggleButtons('.mode-btn');