const quizGenForm = document.querySelector("#quiz__generate__form");

const quizSectionContainer = document.querySelector(".quiz-section");
const quizSection = document.querySelector("#quiz__section");
const quizQuestion = document.querySelector("#quiz__question__content");
const quizOptions = document.querySelectorAll(
  "#quiz__section__options .option > label"
);
const quizNextBtn = document.querySelector("#quiz__next__btn");
const quizScorecard = document.querySelector("#quiz__scorecard");

const correctAnswer = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.4911 21.4553L0.366101 13.3303C-0.122034 12.8421 -0.122034 12.0507 0.366101 11.5625L2.13383 9.79472C2.62196 9.30654 3.41346 9.30654 3.9016 9.79472L9.37499 15.2681L21.0984 3.54472C21.5865 3.05659 22.378 3.05659 22.8662 3.54472L24.6339 5.31249C25.122 5.80063 25.122 6.59208 24.6339 7.08027L10.2589 21.4553C9.77069 21.9435 8.97924 21.9435 8.4911 21.4553Z" fill="#78F884" />
</svg>`;

const wrongAnswer = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7909 10L19.4767 4.3142C20.1744 3.61648 20.1744 2.48523 19.4767 1.78693L18.2131 0.523295C17.5153 -0.174432 16.3841 -0.174432 15.6858 0.523295L10 6.20909L4.3142 0.523295C3.61648 -0.174432 2.48523 -0.174432 1.78693 0.523295L0.523295 1.78693C-0.174432 2.48466 -0.174432 3.61591 0.523295 4.3142L6.20909 10L0.523295 15.6858C-0.174432 16.3835 -0.174432 17.5148 0.523295 18.2131L1.78693 19.4767C2.48466 20.1744 3.61648 20.1744 4.3142 19.4767L10 13.7909L15.6858 19.4767C16.3835 20.1744 17.5153 20.1744 18.2131 19.4767L19.4767 18.2131C20.1744 17.5153 20.1744 16.3841 19.4767 15.6858L13.7909 10Z" fill="#FF5C5C" />
</svg>`;

const blank = `<div class="blank"></div>`;

let quiz;

quizGenForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const quizDifficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  ).value;

  quizSectionContainer.classList.remove("show");

  fetch(
    `https://web-ignite-api.onrender.com/questions?difficulty=${quizDifficulty}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      handleQuiz(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

quizSection.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!quiz) return;
  quiz.handleNextQuestion();
});

function handleQuiz(data) {
  quiz = new Quiz({
    questions: data,
    quizQuestion,
    quizOptions,
    quizNextBtn,
    quizSection,
    quizScorecard,
    correctAnswer,
    wrongAnswer,
    blank,
  });

  quizSectionContainer.classList.add("show");
}
