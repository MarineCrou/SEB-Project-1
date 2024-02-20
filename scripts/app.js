// REQUIREMENTS :
// - The player should be able to clear at least one board
// - The player's score should be displayed at the end of the game

// Score Board
const scoreDisplay = document.querySelector(".player-score-number");
const liveCount = document.querySelector(".live-count");
const highestScore = document.querySelector(".highest-score-number");
const startGame = document.querySelector("button");

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
const blinkyStartPosition = 89;
const pinkyStartPosition = 69;
const inkyStartPosition = 70;
const clydeStartPosition = 90;

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

// Next Steps :
// 1.1. Adding pacman to the board
function addPacman(position) {
  cells[position].classList.add("pacman");
}
// 1.2.removing pacman
function removePacman(position) {
  cells[position].classList.remove("pacman");
}

//Add 4 Ghosts
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

// REMOVE Ghosts -> inspiration -> IF pacman eats a ghost, remove ghost
// ghost move randomly -> through a setInterval
//  => setTimer to delay launch of 2/4 ghost
// function startGame() {
//   if (!isPlaying) {
//     isPlaying = !isPlaying;
//     timer = setInterval(() => {
//       // wasHit will either be true or undefined
//       const wasHit = removeMole();
//       console.log("the mole was hit:", wasHit);
//       addMole();
//       if (!wasHit) {
//         lives--;

//         if (!lives) {
//           endGame();
//         }

//         livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";
//       }
//     }, gameSpeed);
//   }
// }
// Create a Class for Ghosts*4 with starting point their "prison"

// Add blocks to the grid
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
//STILL NEED TO MAKE BLOCKS SOLID, so can't be gone through

// 2. Add pellets to all cells Except For : cells that have blocks & Pacman
// Add PowerDots

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

// add power dots
function addPowerDots() {
  powerDotCells.forEach((position) => {
    if (cells[position]) {
      cells[position].classList.add("power-dots");
      console.log(`Class list after adding: ${cells[position].classList}`);
    }
  });
}
addPowerDots();

//Adding borders to the game, so pacman or ghosts can't disapear from grid
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
    !walls.includes(pacmanNewPosition) &&
    !gCells.includes(pacmanNewPosition) &&
    !aCells.includes(pacmanNewPosition) &&
    !ghostCell.includes(pacmanNewPosition) &&
    pacmanNewPosition >= 0 && // Check for top boundary
    pacmanNewPosition < cellCount && // Check for bottom boundary
    !(
      event.pacmanNewPosition === 37 && pacmanNewPosition % width === height - 1
    ) && // Check for left boundary
    !(event.keyCode === 39 && pacmanNewPosition % height === 0)
  ) {
    // Check for right boundary
    removePacman(pacmanCurrentPosition); // Remove Pac-Man from current position
    pacmanCurrentPosition = pacmanNewPosition; // Update Pac-Man's position
    addPacman(pacmanCurrentPosition); // Add Pac-Man to new position
  }
  console.log(`pacman current position ${pacmanCurrentPosition}`);
}
document.addEventListener("keydown", movePacman);

//How to disable blocks from being gone through

// 4.4 Add a delay - for ghosts coming out of their section
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses
// 8. Add a Start Button / Starts game

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */

// PLAY GAME !!
// Reset Game -> Function to reset the game when player Looses
function reset() {
  // display player's score
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  // reset lives to max = 3
  lives = 3;
  livesDisplay.innerHTML = "❤️".repeat(lives);
  // player is not playing
  isPlaying = false;
  removePacman();
  removeGhosts();
  addPacman();
  addGhosts();
}

// Pacman Eats (fruit, dots, powerDots, Ghosts)
function pacmanEats(edibleItem, score) {
  playerScore += score;
  removePowerDot();
  addPacman();
}

// Start Button
// when player clicks on start, launch game & free Ghosts
// create function, which launches the game :

// function startGame() {
//   if (!isPlaying) {
//     isPlaying = !isPlaying;
//     timer = setInterval(() => {
//       // pacman eats dot
//       let eatsDots = removeDot();
//       let eatsPowerDot = removePowerDot();
//       let eatsGhost = removeEatenGhost()
//       console.log("the game has started");

//       if (eatsDots) {
//         // const dotPoints = 10;
//         // const powerDotPoints = 20;
//         // const fruitPoints = 20;
//         // const blueGhostPoints = 200;

//         playerScore += dotPoints;
//         // removeDot()
//         // addPacman()

//         if (!lives) {
//           endGame();
//         } else if
//         // if eats all dots (power and dots), game over
//         // if (eatsALLDots){
//           // endGame();
//         // }

//         livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";
//       }
//       // else if (eatsPowerDot){
//       //   playerScore += powerDotPoints;
//       //   removePowerDot()
//       //   addPacman()
//       // }
//       // else if (eatsGhost){
//       //   playerScore += blueGhostPoints;
//       //   removeGhost()
//       //   addPacman()
//       // }
//       // else if (eatsFruit){
//       //   playerScore += fruitPoints;
//       //   removeGhost()
//       //   addPacman()
//       // }
//     }, 1000);
//   }
// }
// add event listener :
button.addEventListener("click", playGame);
resetButton.addEventListener("click", reset);
