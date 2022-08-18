const bar = document.querySelector('.bar');
const barCoords = bar.getBoundingClientRect();
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let isStarted = false;
let score = 0;
let interval; //The interval at which blocks appear.

function createKey(letter) {
  let key = document.createElement('DIV');
  key.classList.add('key');
  key.classList.add(letter);
  key.innerHTML = letter;
  document.body.append(key);
  
  setTimeout(() => key.style.bottom = '110%', 50); //This timeout is necessary to change the style immediately. It moves the key from the bottom to the top.
  setTimeout(() => key.remove(), 3000); //This timeout removes the key after 3 seconds to clean up memory.
}
const letters = ['Q', 'W', 'O', 'P'];

//Randomly pick a letter to add to the screen.
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

    //if key is inside the green bar.
    if ((keyCoords.top + 75 < barCoords.bottom) && (keyCoords.top + 75 > barCoords.top)) {

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
    } else if (keyCoords.top < barCoords.bottom + 100) { //if the key is just below the green window but not inside it counts as a failure.
      key.classList.add('fail');
    }
  })
}

startButton.onclick = start;

document.addEventListener('keyup', handleKeyUp);

