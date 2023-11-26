let timer = 60;
let isRunning = false;
let typedWords = 0;
let typedCharacters = 0;
let correctCharacters = 0;

let textArray = [
  "The quick brown fox jumps over the lazy dog",
  "To be or not to be that is the question",
  "A journey of a thousand miles begins with a single step",
  // Add more sentences as needed
];

function generateRandomText() {
  let randomIndex = Math.floor(Math.random() * textArray.length);
  return textArray[randomIndex];
}

document.getElementById("start-btn").addEventListener("click", function () {
  if (!isRunning) {
    let randomText = generateRandomText();
    document.getElementById("random-text").innerText = randomText;
    isRunning = true;
    let interval = setInterval(function () {
      document.getElementById("time-left").innerText = --timer;
      if (timer <= 0) {
        clearInterval(interval);
        isRunning = false;
        document.getElementById("wpm-value").innerText = typedWords;
        let accuracy = Math.floor((correctCharacters / typedCharacters) * 100);
        document.getElementById("accuracy").innerText = accuracy + "%";
        typedWords = 0;
        typedCharacters = 0;
        correctCharacters = 0;
      }
    }, 1000);
  }
});

document.getElementById("reset-btn").addEventListener("click", function () {
  timer = 60;
  typedWords = 0;
  typedCharacters = 0;
  correctCharacters = 0;
  document.getElementById("time-left").innerText = timer;
  document.getElementById("wpm-value").innerText = typedWords;
  document.getElementById("accuracy").innerText = "0%";
  isRunning = false;
});

document.getElementById("text-input").addEventListener("input", function () {
  if (isRunning) {
    typedWords = this.value.split(" ").length;
    typedCharacters += this.value.length;
    let randomText = document.getElementById("random-text").innerText;
    for (let i = 0; i < this.value.length; i++) {
      if (this.value[i] === randomText[i]) {
        correctCharacters++;
      }
    }
  }
});
