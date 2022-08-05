const bar = document.querySelector('.bar');
const barCoords = bar.getBoundingClientRect();
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let isStarted = false;
let score = 0;
let interval;

function createKey(letter) {
  let key = document.createElement('DIV');
  key.classList.add('key');
  key.classList.add(letter);
  key.innerHTML = letter;
  document.body.append(key);
  setTimeout(() => key.style.bottom = '110%', 50);
  setTimeout(() => key.remove(), 3000);
}
const letters = ['Q', 'W', 'O', 'P'];

function game() {
  const i = Math.floor(Math.random() * letters.length);
  createKey(letters[i]);
}

function start(speed) {
  if (!isStarted) {
    isStarted = true;
    score = 0;
    scoreDisplay.innerHTML = `Score: ${score}`;
    startButton.innerHTML = 'Stop Game';
    interval = setInterval(game, 750);
  }
  else {
    isStarted = false;
    startButton.innerHTML = 'Start Game';
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(key => key.remove());
    clearInterval(interval);
  }
}

function handleKeyUp(event) {
  const keyPressed = event.key.toUpperCase();
  const allKeys = document.querySelectorAll('.key');

  allKeys.forEach(key => {
    const keyCoords= key.getBoundingClientRect();

    if ((keyCoords.top + 50 < barCoords.bottom) && (keyCoords.top + 50 > barCoords.top)) {

      if(key.classList.contains(keyPressed)) {
        key.classList.add('success');
        setTimeout(() => {
          key.remove();
        }, 150)
        score++;
        scoreDisplay.innerHTML = `Score: ${score}`;
      } else {
        key.classList.add('fail');
      }
    }
  })
}

startButton.onclick = start;

document.addEventListener('keyup', handleKeyUp);

