// REQUIREMENTS :
// - The player should be able to clear at least one board
// - The player's score should be displayed at the end of the game

// Score Board
const scoreDisplay = document.querySelector(".player-score-number");
const liveCount = document.querySelector(".live-count");
const highestScore = document.querySelector(".highest-score-number");
const startedGame = document.querySelector("button");

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

// Ghosts

let blinkyStartPosition = 89;
let pinkyStartPosition = 69;
let inkyStartPosition = 70;
let clydeStartPosition = 90;

// ghosts are eadible
const blueGhost = false;

// Dot variables
let dottedCells;
let powerDotCells = [140, 19, 40, 197];

// Wall variables:
const walls = [
  3, 4, 7, 8, 11, 12, 14, 15, 16, 21, 28, 29, 31, 38, 60, 61, 79, 78, 120, 121,
  139, 138, 148, 149, 150, 151, 161, 162, 165, 168, 169, 170, 171, 173, 174,
  175, 177, 178, 184, 185, 186, 195,
];
const gCells = [43, 44, 45, 46, 63, 83, 85, 86, 103, 106, 123, 124, 125, 126];
const aCells = [53, 54, 55, 56, 73, 76, 93, 94, 95, 96, 113, 116, 133, 136];
const ghostCell = [68, 71, 88, 91, 108, 109, 110, 111];
const cellCells = [69, 70, 89, 90];
const ghostGateCells = [69, 70];

// pacman dies
let loseLife = true;

// Score - Dots - Lives
let playerScore = 0;
let lives = 3;
let isPlaying = false;

const dotPoints = 10;
const powerDotPoints = 20;
const fruitPoints = 20;
const blueGhostPoints = 200;

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
  createGhosts(blinkyStartPosition, "ghost-blinky");
  createGhosts(clydeStartPosition, "ghost-clyde");
  createGhosts(inkyStartPosition, "ghost-inky");
  createGhosts(pinkyStartPosition, "ghost-pinky");
}
addGhosts();

function deleteGhosts(ghostPosition, className) {
  cells[ghostPosition].classList.remove(className);
}
function removeGhosts() {
  deleteGhosts(clydeStartPosition, "ghost-clyde");
  deleteGhosts(blinkyStartPosition, "ghost-blinky");
  deleteGhosts(pinkyStartPosition, "ghost-pinky");
  deleteGhosts(inkyStartPosition, "ghost-inky");
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

// GHOSTS
// Prevent Ghost form going into walls
// probably a Math.floor(Math.random()) => for ghost random direction
// class function ? -> Set the wall boundries + Blocks with Function ??
// For random movement : Need a setInterval + SeTimer (to delay ghosts from leaving at the same time )
// need to ensure ghosts leave their "prison" first

//ADD Ghosts * 4
// // Ghosts
// let blinkyStartPosition = 89;
// let pinkyStartPosition = 69;
// let inkyStartPosition = 70;
// let clydeStartPosition = 90;

let ghosts = [
  { position: blinkyStartPosition, className: "ghost-blinky" },
  { position: clydeStartPosition, className: "ghost-clyde" },
  { position: inkyStartPosition, className: "ghost-inky" },
  { position: pinkyStartPosition, className: "ghost-pinky" },
];

function moveGhosts() {
  ghosts.forEach((ghost) => {
    // for each ghost in the array, we want it to move
    // IF there are no walls, no borders => move forward
    // Else go in different direction
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
      removeGhosts(ghost.position, ghost.className);
      ghost.position = nextPosition;
      addGhosts(ghost.position, ghost.className);
      console.log(`Ghost position ${ghost.className} is in${ghost.position}`);
    }
    // else {
    //   does there need to be an else ?
    //   Could the Else be => if on same cell as pacman => kills pacman
    // }
  });
}

// iterate through the function // Set an interval for moving the ghosts
let ghostInterval = ghosts.forEach((ghost) => {
  setInterval(() => {
    moveGhosts(ghost);
  }, 1000);
});

// setTimeout(() => moveGhosts(ghosts.position, ghosts.className), 1000);

// Move Pacman
function movePacman(event) {
  let pacmanNewPosition = pacmanCurrentPosition;
  // check if the next position is a wall or not before allowing the move of pacman
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
  // function to iterate through the conditions to see if obstacle (is the next move a wall or ghost ?)
  if (
    // check for walls
    // pacman
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
    !(
      event.pacmanNewPosition === 37 && pacmanNewPosition % width === height - 1
    ) &&
    // left border
    !(event.keyCode === 39 && pacmanNewPosition % height === 0)
  ) {
    removePacman(pacmanCurrentPosition);
    pacmanCurrentPosition = pacmanNewPosition;
    addPacman(pacmanCurrentPosition);
  }
  console.log(`pacman current position ${pacmanCurrentPosition}`);
}
document.addEventListener("keydown", movePacman);

// ADD DOTS
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

// PACMAN EATS
function eatDot(position) {
  if (cells[position].classList.contains("dots")) {
    cells[position].classList.remove("dots");
    playerScore += dotPoints;
    addPacman();
  }
}

function eatPowerDot(position) {
  if (cells[position].classList.contains("power-dots")) {
    cells[position].classList.remove("power-dots");
    playerScore += powerDotPoints;
    addPacman();
  }
}

// function eatsGhosts(position) {
//   if (cells[position].classList.contains("power-dots")) {
//     cells[position].classList.remove("power-dots");
//     playerScore += powerDotPoints;
//     addPacman();
//   }
// }

// COLLISON DETECTION
function pacmanColidedGhost() {
  let collisionDetected = false;
  // Check if Pac-Man's position = any of the ghosts' positions
  ghosts.forEach((ghost) => {
    if (pacmanCurrentPosition === ghost.position) {
      console.log(`bumped into a ${ghost.className}`);
      collisionDetected = true;
      manageCollision();
    }
  });
  return collisionDetected;
}

function manageCollision() {
  // Decrease lives, restart level, or end game, etc.
  lives -= 1;
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

// PLAY GAME !!

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

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    console.log("Game has started");

    let eatsGhost = removeEatenGhost();
    console.log("the game has started");
    // pacman Eats
    if (cells[pacmanNewPosition].classList.contains("dots")) {
      eatDots();
    } else if (cells[pacmanNewPosition].classList.contains("power-dots")) {
      eatPowerDot;
    }
    if (cells[pacmanNewPosition].contains(ghosts)) {
      eatsGhost;
      playerScore += blueGhostPoints;
      removeGhost();
      addPacman();
    }
    // else if (eatsFruit){
    //   playerScore += fruitPoints;
    //   removeGhost()
    //   addPacman()
    // }
    // if (lives === )
    //  Check for lives !!
    // if (lives === )
    // livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";
  }
  // Get pacman to move
  document.addEventListener("keydown", movePacman);
  // Start ghosts moving
  ghosts.forEach((ghost) => moveGhost(ghost));
}
// add event listener :
button.addEventListener("click", startGame());
// resetButton.addEventListener("click", reset);

// END GAME !
//Need to create loose lives function
function endGame() {}

// Add a delay - for ghosts coming out of their section
// Add a Start Button / Starts game !!
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */
