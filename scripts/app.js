// REQUIREMENTS :
// - The player should be able to clear at least one board
// - The player's score should be displayed at the end of the game

// Score Board
const scoreDisplay = document.querySelector("#player-score-number");
const liveCount = document.querySelector("#live-count");
const highestScore = document.querySelector(".highest-score-number");
const startGameButton = document.querySelector("button");

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
let pacmanNewPosition = pacmanCurrentPosition;

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

// ghosts are eadible
const blueGhost = false;

// Dot variables
let numberOfDots = 0;
let powerDotCells = [140, 19, 40, 197];
let dotPoints = 10;
let powerDotPoints = 20;
let fruitPoints = 20;
let blueGhostPoints = 200;

// Wall variables:
const walls = [
  3, 4, 7, 8, 11, 12, 14, 15, 16, 21, 28, 29, 31, 38, 60, 61, 79, 78, 120, 121,
  139, 138, 148, 149, 150, 151, 161, 162, 165, 168, 169, 170, 171, 173, 174,
  175, 177, 178, 184, 185, 186, 195,
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

// PLACING ELEMENTS
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
}
createGrid();

// ADD pacman to the board
function addPacman(position) {
  cells[position].classList.add("pacman");
}
// REMOVE pacman
function removePacman(position) {
  cells[position].classList.remove("pacman");
}

//ADD Ghosts * 4
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

function deleteGhost(ghostPosition, className) {
  cells[ghostPosition].classList.remove(className);
}
function removeGhosts() {
  deleteGhost(ghosts[0].position, "ghost-blinky");
  deleteGhost(ghosts[1].position, "ghost-clyde");
  deleteGhost(ghosts[2].position, "ghost-inky");
  deleteGhost(ghosts[3].position, "ghost-pinky");
}

// ADD BLOCKS/WALLS
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

// ................ADD DOTS.............................
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
      index !== pacmanCurrentPosition
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
      console.log(`Class list after adding: ${cells[position].classList}`);
    }
  });
}
addPowerDots();

// .................PACMAN EATS....................
function eatDot(position) {
  if (cells[position].classList.contains("dots")) {
    cells[position].classList.remove("dots");
    playerScore += dotPoints;
    numberOfDots++;
    scoreDisplay.innerHTML = playerScore;
    addPacman();
  }
}

function eatPowerDot(position) {
  if (cells[position].classList.contains("power-dots")) {
    cells[position].classList.remove("power-dots");
    playerScore += powerDotPoints;
    scoreDisplay.innerHTML = playerScore;
    console.log(scoreDisplay);
    addPacman();
  }
}

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
    !ghostCell.includes(pacmanNewPosition) &&
    // check for border :
    // Top border
    pacmanNewPosition >= 0 &&
    // bottom border
    pacmanNewPosition < cellCount &&
    // right border
    !(pacmanNewPosition % width === height - 1) &&
    // left border
    !(pacmanNewPosition % height === 0)
  );
}

function movePacman(event) {
  // left is 37 //
  if (event.keyCode === 37) {
    pacmanNewPosition = pacmanCurrentPosition - 1;
    // up is 38
  } else if (event.keyCode === 38) {
    pacmanNewPosition = pacmanCurrentPosition - height;
    // right is 39
  } else if (event.keyCode === 39) {
    pacmanNewPosition = pacmanCurrentPosition + 1;
    // down is 40
  } else if (event.keyCode === 40) {
    pacmanNewPosition = pacmanCurrentPosition + height;
  }
  console.log(pacmanNewPosition);

  removePacman(pacmanCurrentPosition);
  // Move Pacman + eats
  if (pacmanIsValidPosition(pacmanNewPosition)) {
    pacmanCurrentPosition = pacmanNewPosition;
  }
  //  add pacman newPosition
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
  // NEED TO GET THE GHOST TO NOT GO BACK TO PREVIOUS POSITION
  // NEED TO GET GHOST TO NOT GO BACK TO CELL
  // If ghost in gateghostcell => need to go direction -width
  // If ghosts in 89 || 90 =>> needs to move up 2 cells (-width*2) before getting out

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
  });
  addGhosts();
}

// .....................COLLISON DETECTION ............................
function pacmanColidedGhost() {
  let collisionDetected = false;
  // Check if Pac-Man's position = any of the ghosts' positions
  ghosts.forEach((ghost) => {
    if (pacmanCurrentPosition === ghost.position) {
      console.log(`bumped into a ${ghost.className}`);
      collisionDetected = true;
      manageGhostCollision();
    }
  });
  return collisionDetected;
}

function manageGhostCollision() {
  // Decrease lives, restart level, or end game, etc.
  lives--;
  livesDisplay.innerHTML = lives ? "🌕".repeat(lives) : "☠️";
  console.log(`Lives left: ${lives}`);
  if (lives <= 0) {
    console.log("Game Over");
    endGame();
  } else {
    resetPositions();
  }
}

function resetPositions() {
  // reset pacman position
  cells[pacmanCurrentPosition].classList.remove("pacman");
  // add pacman to original position :
  pacmanCurrentPosition = 127;
  cells[pacmanCurrentPosition].classList.add("pacman");
  // reset Ghosts

  ghosts.forEach((ghost) => {
    cells[ghost.currentPosition].classList.remove(ghost.className);
    // Determine and set the ghost's initial position based on its name or className
    if (ghost.className === "blinky") {
      ghost.currentPosition = blinkyStartPosition;
    } else if (ghost.className === "pinky") {
      ghost.currentPosition = pinkyStartPosition;
    } else if (ghost.className === "inky") {
      ghost.currentPosition = inkyStartPosition;
    } else if (ghost.className === "clyde") {
      ghost.currentPosition = clydeStartPosition;
    }
    cells[ghost.currentPosition].classList.add(ghost.className);
  });
}

// ..................PLAY GAME............................

// Reset Game (when Player Looses)
function reset() {
  clearInterval(ghostInterval);
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  lives = 3;
  livesDisplay.innerHTML = "❤️".repeat(lives);
  isPlaying = false;
  removePacman();
  removeGhosts();
  cells = [];
  startGame();
}

// Start Game !!
// when player clicks on start, launch game & free Ghosts
// If player is playing (clicked the start button):
// Ghosts should start moving
// function should check for lives
// pacman should start moving and eat dots, powerdots + fruits(if i get to that one)
// scoreboard should update according to what is eaten (eats dots, powerdots + fruits + ghosts)

// high-Score
function logHighScore() {
  if (!highScore || playerScore > highScore) {
    localStorage.setItem("high-score", playerScore);
    highestScore.innerHTML = highScore;
  }
}

function startGame() {
  logHighScore();
  if (!isPlaying) {
    isPlaying = true;
    console.log("Game has started");
    // ghosts start moving
    setInterval(() => {
      moveGhosts();
    }, 400);
    // pacman moves
    document.addEventListener("keydown", movePacman);
  }
}
startGameButton.addEventListener("click", startGame);

// END GAME ..........................
//Need to create loose lives function
function endGame() {
  isPlaying = false;
  clearInterval(ghostInterval);
  document.removeEventListener("keydown", movePacman);
  scoreDisplay.textContent = playerScore;
  alert("Game Over! Your score: " + playerScore);
}

// winGame .......................
function winGame() {
  // if pacman eats all of the dots (power + normal) - end game
  removeGhosts();
  scoreDisplay.textContent = playerScore;
  logHighScore();
}

// Add a delay - for ghosts coming out of their section
// Add a Start Button / Starts game !!
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */
