//Dom elements
const startScreen = document.getElementById('start-screen');
const questionsScreen = document.getElementById('questions');
const endScreen = document.getElementById('end-screen');
const timerElement = document.getElementById('time');
const startButton = document.getElementById('start');
const choicesContainer = document.getElementById('choices');
const feedbackElement = document.getElementById('feedback');
const initialsInput = document.getElementById('submit');
const finalScoreElement = document.getElementById('final-score');
const submitButton = document.getElementById('submit');

//retrieve high scores from LocalStorage
function getHighscores() {
    return JSON.parse(localStorage.getItem('highscores')) || [];
  }

const highscores = getHighscores()

//Quiz variables
let currentQuestionIndex = 0;
let timeLeft = 120;
let timerInterval;
let score = 0;

// Event listeners

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', saveHighscore);

function intializeQuiz() {
    const startButton =document.getElementById('start');
    startButton.addEventListener('click', startQuiz);
}


// Start the quiz
function startQuiz() {
    startScreen.classList.add('hide');
    questionsScreen.classList.remove('hide');
    intializeQuiz();
    startTimer();
    showQuestion();
}

//timer
function startTimer() {
    timeInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft;
    }, 1000);
}

//Display questions and choices
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionTitleElement = document.getElementById('questions-title');
    const choices = currentQuestion.choices;

    questionTitleElement.textContent = currentQuestion.title;
    choicesContainer.innerHTML = '';

    choices.forEach(function (choice, index){
        const choiceElement = document.createElement('button');
        choiceElement.setAttribute('class', 'choice');
        choiceElement.setAttribute('value', index);
        choiceElement.textContent = index + 1 + '. ' + choice; 
        choiceElement.addEventListener('click', handleChoice);
        choicesContainer.appendChild(choiceElement);
    });
}

//users choice selection
function handleChoice () {
    const selectedChoiceIndex = parseInt(this.value);

    if (selectedChoiceIndex === questions[currentQuestionIndex].answer) {
        //correct answer
        score += 10;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.remove('hide');
    } else {
        //incorrect 
        timeLeft -= 15;
        feedbackElement.textContent = 'Incorrect!';
        feedbackElement.classList.remove('hide');
    }

    //move to next question
    currentQuestionIndex++;

    //check if quiz is over
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionsScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreElement.textContent = score;
}

function saveHighscore() {
    const initials = initialsInput.value.trim();

    if (initials !== '') {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        const newScore = { initials, score };
        highscores.push(newScore);
        localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscores.html'; //redirect to highscores page

        //clear input field
        initialsInput.value = '';
        alert('High score saved!');
    }
}

submitButton.addEventListener('click', function (){
    saveHighscore();
    window.location.href ='./assets/scores.html';
});

  function populateHighscores() {
    const highscoresList = document.getElementById('highscores-list');
  
    highscoresList.innerHTML = '';
  
    highscores.forEach(function (score) {
      const liElement = document.createElement('li');
      liElement.textContent = `${score.initials}: ${score.score}`;
      highscoresList.appendChild(liElement);
    });
  }
  
  window.addEventListener('load', populateHighscores);