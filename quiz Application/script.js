const checkButton = document.querySelector(".check");
const nextButton = document.querySelector(".next");
const timerDisplay = document.querySelector(".timer");

let currentQuestionIndex = 1;
const maxQuestions = 5;
let correctAnswers = 0;
let timer;
let timeLeft = 30;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  clearInterval(timer); // prevent overlap
  timeLeft = 30;
  timerDisplay.textContent = formatTime(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up! Moving to the next question.");
      nextQuestion();
    }
  }, 1000);
}

checkButton.addEventListener("click", () => {
  const questionName = "q" + currentQuestionIndex;
  const answers = document.getElementsByName(questionName);

  let selectedAnswer = null;

  for (const answer of answers) {
    if (answer.checked) {
      selectedAnswer = answer.value;
      break;
    }
  }

  const feedbackElement = document.querySelector(".valid" + currentQuestionIndex);
  feedbackElement.style.display = "block";

  if (selectedAnswer === null) {
    feedbackElement.textContent = "Please select an answer.";
    feedbackElement.style.color = "orange";
    return;
  }

  if (selectedAnswer === "ans") {
    correctAnswers++;
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = "Incorrect.";
    feedbackElement.style.color = "red";
  }

  const answerParagraph = document.querySelector(".ans" + currentQuestionIndex);
  answerParagraph.style.display = "block";

  // Disable options
  answers.forEach(ans => ans.disabled = true);

  nextButton.style.display = "inline-block";
  checkButton.style.display = "none";

  clearInterval(timer);
});

nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
  const previousQuestion = document.querySelector(".Q" + currentQuestionIndex);
  previousQuestion.style.display = "none";

  currentQuestionIndex++;

  if (currentQuestionIndex > maxQuestions) {
    nextButton.style.display = "none";
    checkButton.style.display = "none";

    const stats = document.querySelector(".stats");
    stats.style.display = "flex";

    const score = document.querySelector(".score");
    score.textContent = `${correctAnswers} out of ${maxQuestions}`;
  } else {
    const nextQ = document.querySelector(".Q" + currentQuestionIndex);
    nextQ.style.display = "flex";

    startTimer();

    checkButton.style.display = "inline-block";
    nextButton.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Hide all except Q1
  for (let i = 2; i <= maxQuestions; i++) {
    const q = document.querySelector(".Q" + i);
    if (q) q.style.display = "none";
  }

  document.querySelector(".stats").style.display = "none";

  startTimer();
});
