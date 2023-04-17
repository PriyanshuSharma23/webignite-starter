class Quiz {
  constructor({
    questions,
    quizQuestion,
    quizOptions,
    quizNextBtn,
    quizSection,
    quizScorecard,
    correctAnswer,
    wrongAnswer,
    blank,
  }) {
    this.questions = questions || [];
    this.currentQuestion = 0;
    this.scoreCard = [];

    for (let i = 0; i < this.questions.length; i++) {
      this.scoreCard.push(null);
    }

    this.quizQuestion = quizQuestion;
    this.quizOptions = quizOptions;
    this.quizNextBtn = quizNextBtn;
    this.quizSection = quizSection;
    this.quizScorecard = quizScorecard;

    this.correctAnswer = correctAnswer;
    this.wrongAnswer = wrongAnswer;
    this.blank = blank;

    this.renderQuestion();
    this.renderScoreCard();
  }

  renderQuestion() {
    let questionNum = this.currentQuestion;
    const question = this.questions[questionNum];
    this.quizQuestion.textContent = question.question;

    for (let i = 0; i < this.quizOptions.length; i++) {
      this.quizOptions[i].textContent = question.options[i];
    }
  }

  renderScoreCard() {
    this.quizScorecard.innerHTML = "";

    for (let i = 0; i < this.scoreCard.length; i++) {
      const score = this.scoreCard[i];

      if (score === null) {
        this.quizScorecard.innerHTML += this.blank;
      } else if (score) {
        this.quizScorecard.innerHTML += this.correctAnswer;
      } else {
        this.quizScorecard.innerHTML += this.wrongAnswer;
      }
    }
  }

  handleNextQuestion() {
    if (this.currentQuestion >= this.questions.length) {
      return;
    }

    const selectedOptionElement = this.quizSection.querySelector(
      'input[name="answer"]:checked'
    );

    const selectedOption = selectedOptionElement?.value;

    if (!selectedOption) {
      return;
    }

    if (selectedOption == this.questions[this.currentQuestion].answer) {
      this.scoreCard[this.currentQuestion] = true;
    } else {
      this.scoreCard[this.currentQuestion] = false;
    }

    this.renderScoreCard();

    this.currentQuestion += 1;

    if (this.currentQuestion < this.questions.length) {
      this.renderQuestion();
    }

    selectedOptionElement.checked = false;
  }
}
