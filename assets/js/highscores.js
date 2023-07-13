// Retrieve high scores from LocalStorage
function getHighscores() {
    return JSON.parse(localStorage.getItem('highscores')) || [];
  }
  
  function populateHighscores() {
    const highscoresList = document.getElementById('highscores-list');
    const highscores = getHighscores();
  
    highscoresList.innerHTML = '';
  
    highscores.forEach(function (score) {
      const liElement = document.createElement('li');
      liElement.textContent = `${score.initials}: ${score.score}`;
      highscoresList.appendChild(liElement);
    });
  }
  
  window.addEventListener('DOMContentLoaded', populateHighscores);