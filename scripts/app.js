// REQUIREMENTS :
// - The player should be able to clear at least one board
// - The player's score should be displayed at the end of the game

// 🐛 ->
// Need to get rid of 2 pallets in the A
// Need to fix : pacman doesn't reset everytime meets a ghost // ALWAYS DIES WHEN GHOSTS NOT MOVING
// Need to Fix the infinate loop when game end (interval issue)

// Need to fix why first row can't be accessed anymore
// Need to fix pacman Error message : cannot read properties of undefined (reading 'classList')
// Need to fix the HighScore
// Need to add Fruits and Eadible Ghosts
// NEED TO GET GHOST TO NOT GO BACK TO CELL

// Score Board
const endGameModal = document.getElementById("end-game-modal");
const modalScoreDisplay = document.getElementById("modal-player-score-number");
const scoreDisplay = document.querySelector("#player-score-number");
const liveCount = document.querySelector("#live-count");
const highestScore = document.querySelector(".highest-score-number");
const startGameButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");

// VARIABLES :
// Grid Variables
const grid = document.querySelector(".grid");
const width = 10;
const height = 20;
const cellCount = height * width;
const cells = [];

// character positions
//pacman poistion
let pacmanCurrentPosition = 127;
// let pacmanNewPosition = pacmanCurrentPosition;

// Ghosts

let blinkyStartPosition = 89;
let pinkyStartPosition = 69;
let inkyStartPosition = 70;
let clydeStartPosition = 90;
let ghosts = [
  { position: blinkyStartPosition, className: "ghost-blinky" },
  { position: clydeStartPosition, className: "ghost-clyde" },
  { position: inkyStartPosition, className: "ghost-inky" },
  { position: pinkyStartPosition, className: "ghost-pinky" },
];
let ghostInterval = null;

// ghosts are eadible
const blueGhost = false;
// Dot variables
let numberOfDots = 0;
let powerDotCells = [140, 19, 40, 197];
let dotPoints = 50;
let powerDotPoints = 100;
let fruitPoints = 250;
let blueGhostPoints = 500;

// Wall variables:
const walls = [
  3, 4, 7, 8, 9, 10, 11, 12, 14, 15, 16, 21, 38, 60, 61, 79, 78, 120, 121, 139,
  138, 148, 149, 150, 151, 161, 162, 165, 168, 169, 170, 171, 173, 174, 175,
  177, 178, 184, 185, 186, 195,
];
const gCells = [43, 44, 45, 46, 63, 83, 85, 86, 103, 106, 123, 124, 125, 126];
const aCells = [53, 54, 55, 56, 73, 76, 93, 94, 95, 96, 113, 116, 133, 136];
const aCenterCells = [74, 75];
const ghostCell = [68, 71, 88, 91, 108, 109, 110, 111];
const cellCells = [69, 70, 89, 90];
const ghostGateCells = [69, 70];

// pacman dies
let loseLife = true;

// Score - Dots - Lives
let playerScore = 0;
let highScore = localStorage.getItem("highest-score-number");
let lives = 3;
livesDisplay = document.querySelector("#live-count");
livesDisplay.innerText = "🌕🌕🌕";
let isPlaying = false;

//.....................PLACING ELEMENTS.......................
//creating the grid framework : 20w*10h
function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerHTML = i;
    grid.appendChild(cell);
    cells.push(cell);
  });

  addPacman(pacmanCurrentPosition);
  addGhosts(blinkyStartPosition);
  addGhosts(pinkyStartPosition);
  addGhosts(clydeStartPosition);
  addGhosts(inkyStartPosition);
  addPowerDots(powerDotCells);
  totalDotsOnGrid();
}
createGrid();

//.................ADD & DELETE pacman............................
function addPacman(position) {
  cells[position].classList.add("pacman");
}
// REMOVE pacman
function removePacman(position) {
  cells[position].classList.remove("pacman");
}

//.................ADD & DELETE Ghosts * 4.........................
function createGhosts(position, className) {
  cells[position].classList.add(className);
}

function addGhosts() {
  createGhosts(ghosts[0].position, "ghost-blinky");
  createGhosts(ghosts[1].position, "ghost-clyde");
  createGhosts(ghosts[2].position, "ghost-inky");
  createGhosts(ghosts[3].position, "ghost-pinky");
}
addGhosts();

// delete ghosts
function deleteGhost(ghostPosition, className) {
  cells[ghostPosition].classList.remove(className);
}
function removeGhosts() {
  deleteGhost(ghosts[0].position, "ghost-blinky");
  deleteGhost(ghosts[1].position, "ghost-clyde");
  deleteGhost(ghosts[2].position, "ghost-inky");
  deleteGhost(ghosts[3].position, "ghost-pinky");
}

//...............ADD BLOCKS/WALLS.............................
function applyBlockStyle(cellIndices, className) {
  cellIndices.forEach((index) => {
    cells[index].classList.add(className);
  });
}
function blockCells() {
  applyBlockStyle(walls, "blocks-blue");
  applyBlockStyle(gCells, "blocks-red");
  applyBlockStyle(aCells, "blocks-red");
  applyBlockStyle(ghostCell, "blocks-blue");
  applyBlockStyle(ghostGateCells, "ghost-gates");
}
blockCells();

//..................high-Score...........................
function logHighScore() {
  highScore = localStorage.getItem("highest-score-number");
  if (!highScore || playerScore > parseInt(highScore)) {
    localStorage.setItem("high-score", playerScore);
    highScore = playerScore;
    highestScore.innerHTML = highScore;
  }
}

// ................ADD DOTS & POWERDOTS.............................
// Dots (Except For cells that have blocks & Pacman & Ghosts)
function createDottedCells() {
  cells.forEach((cell, index) => {
    if (
      index !== pacmanCurrentPosition &&
      index !== blinkyStartPosition &&
      index !== pinkyStartPosition &&
      index !== clydeStartPosition &&
      index !== inkyStartPosition &&
      !powerDotCells.includes(index) &&
      !walls.includes(index) &&
      !gCells.includes(index) &&
      !aCells.includes(index) &&
      !ghostCell.includes(index) &&
      !aCenterCells.includes(index)
    ) {
      cell.classList.add("dots");
    }
  });
}
createDottedCells();

// POWER dots
function addPowerDots() {
  powerDotCells.forEach((position) => {
    if (cells[position]) {
      cells[position].classList.add("power-dots");
    }
  });
}
addPowerDots();

// .....................PACMAN EATS...............................
function eatDot(position) {
  if (cells[position].classList.contains("dots")) {
    cells[position].classList.remove("dots");
    playerScore += dotPoints;
    scoreDisplay.innerHTML = playerScore;
    totalDotsOnGrid();
  }
}

function eatPowerDot(position) {
  if (cells[position].classList.contains("power-dots")) {
    cells[position].classList.remove("power-dots");
    playerScore += powerDotPoints;
    scoreDisplay.innerHTML = playerScore;
    console.log(scoreDisplay);
    totalDotsOnGrid();
  }
}

//..............Cell Contains Ghosts...........................
function cellContainsGhost(position) {
  return ghosts.some((ghost) => ghost.position === position);
}
// function eatsGhosts(position) {
//   if (cells[position].classList.contains("power-dots")) {
//     cells[position].classList.remove("power-dots");
//     playerScore += powerDotPoints;
//     addPacman();
//   }
// }

// ......................MOVE PACMAN...............................
function pacmanIsValidPosition(pacmanNewPosition) {
  return (
    // check for walls
    !walls.includes(pacmanNewPosition) &&
    !gCells.includes(pacmanNewPosition) &&
    !aCells.includes(pacmanNewPosition) &&
    !ghostCell.includes(pacmanNewPosition)
  );
}

function movePacman(event) {
  // create a Local variable
  // left is 37 //
  if (event.keyCode === 37 && !(pacmanCurrentPosition % height === 0)) {
    pacmanNewPosition = pacmanCurrentPosition - 1;
    // up is 38
  } else if (event.keyCode === 38 && pacmanCurrentPosition >= height) {
    pacmanNewPosition = pacmanCurrentPosition - height;
    // right is 39
  } else if (
    event.keyCode === 39 &&
    !(pacmanCurrentPosition % height === height - 1)
  ) {
    pacmanNewPosition = pacmanCurrentPosition + 1;
    // down is 40
  } else if (
    event.keyCode === 40 &&
    pacmanCurrentPosition < cellCount - height
  ) {
    pacmanNewPosition = pacmanCurrentPosition + height;
  }
  console.log(pacmanNewPosition);
  console.log(!(pacmanNewPosition % height === 0));
  console.log(pacmanCurrentPosition);

  removePacman(pacmanCurrentPosition);
  // Move Pacman + eats
  if (pacmanIsValidPosition(pacmanNewPosition)) {
    pacmanCurrentPosition = pacmanNewPosition;
  }
  addPacman(pacmanCurrentPosition);

  // pacman Eats
  eatDot(pacmanCurrentPosition);
  eatPowerDot(pacmanCurrentPosition);

  if (cellContainsGhost(pacmanCurrentPosition)) {
    manageGhostCollision();
  }

  console.log(`pacman current position ${pacmanCurrentPosition}`);
}
document.addEventListener("keydown", movePacman);

// ........................GHOSTS.................................
// need to ensure ghosts leave their "prison" first

function moveGhosts() {
  removeGhosts();
  ghosts.forEach((ghost) => {
    const directions = [-1, +1, -height, +height];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let nextPosition = ghost.position + direction;
    if (
      !walls.includes(nextPosition) &&
      !gCells.includes(nextPosition) &&
      !aCells.includes(nextPosition) &&
      !ghostCell.includes(nextPosition) &&
      nextPosition >= 0 &&
      nextPosition < cellCount &&
      !(nextPosition % width === height - 1) &&
      !(nextPosition % height === 0)
    ) {
      ghost.position = nextPosition;
      // console.log(`Ghost position ${ghost.className} is in${ghost.position}`);
    }
    if (pacmanColidedGhost()) {
      manageGhostCollision();
    }
  });
  addGhosts();
}

// .....................COLLISON DETECTION ............................
function pacmanColidedGhost() {
  let collisionDetected = false;
  // Check if Pac-Man's position = any of the ghosts' positions
  ghosts.forEach((ghost) => {
    if (pacmanCurrentPosition === ghost.position) {
      console.log(`pacmanbumped into a ${ghost.className}`);
      collisionDetected = true;
      manageGhostCollision();
    }
  });
  return collisionDetected;
}

let collisionDelay = false;
function manageGhostCollision() {
  if (collisionDelay) return;
  collisionDelay = true;
  setTimeout(() => (collisionDelay = false), 1000);
  // Decrease lives, restart level, or end game, etc.
  // If pacman bumps into ghost
  // lives
  lives = Math.max(0, lives - 1);
  livesDisplay.innerHTML = lives ? "🌕".repeat(lives) : "Game Over";
  console.log(`Lives left: ${lives}`);
  if (lives <= 0) {
    console.log("Game Over");
    endGame();
    startGame();
  } else {
    resetPacmanPosition();
  }
}

function resetPacmanPosition() {
  // reset pacman to initial position
  cells[pacmanCurrentPosition].classList.remove("pacman");
  pacmanCurrentPosition = 127;
  cells[pacmanCurrentPosition].classList.add("pacman");
}

// ..................RESET GAME............................

// Reset Game (when Player Looses 1 Life)
function resetGame() {
  clearInterval(setGhostInterval);
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  lives = 3;
  livesDisplay.innerHTML = "🌕".repeat(lives);
  isPlaying = false;
  removePacman();
  cells = [];
  startGame();
}

// .....................START GAME........................
// when player clicks on start, launch game & free Ghosts
function setGhostInterval() {
  ghostInterval = setInterval(() => {
    moveGhosts();
  }, 400);
}
//
function startGame() {
  // logHighScore();
  if (!isPlaying) {
    isPlaying = true;
    console.log("Game has started");
    // ghosts start moving
    setGhostInterval();
    // pacman moves
    document.addEventListener("keydown", movePacman);
  }
}
startGameButton.addEventListener("click", startGame);

// ..................END GAME ..........................
//Need to create loose lives function
function endGame() {
  endGameModalPopUp();
  isPlaying = false;
  clearInterval(ghostInterval);
  scoreDisplay.textContent = playerScore;
}
// .................END GAME MODAL......................
function endGameModalPopUp() {
  endGameModal.style.display = "block";
  modalScoreDisplay.innerHTML = playerScore;
}
function closeendGameModalPopUp() {
  endGameModal.style.display = "none";
  resetGame();
}
resetButton.addEventListener("click", closeendGameModalPopUp);

// ............WIN GAME .......................
function totalDotsOnGrid() {
  numberOfDots =
    document.querySelectorAll(".dots").length +
    document.querySelectorAll(".power");
  if (numberOfDots === 0) {
    winGame();
  }
}

function winGame() {
  isPlaying = false;
  clearInterval(setGhostInterval);
  setTimeout(() => {
    if (highScore >= playerScore) {
      alert(`Your score was ${playerScore}`);
      logHighScore();
    } else {
      alert(`New high score! ${playerScore}`);
    }
  }, 50);
}

// Add a delay - for ghosts coming out of their section
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
