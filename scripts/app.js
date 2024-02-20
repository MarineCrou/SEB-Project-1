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
  let blinky = createGhosts(blinkyStartPosition, "ghost-blinky");
  let clyde = createGhosts(clydeStartPosition, "ghost-clyde");
  let inky = createGhosts(inkyStartPosition, "ghost-inky");
  let pinky = createGhosts(pinkyStartPosition, "ghost-pinky");
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
    }
    // else {
    //   does there need to be an else ?
    //   Could the Else be => if on same cell as pacman => kills pacman
    // }
    console.log(`Ghost position ${ghost.className} is in${ghost.position}`);
    return ghosts.className;
  });
}

// iterate through the function // Set an interval for moving the ghosts
ghosts.forEach((ghost) => {
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
// button.addEventListener("click", playGame);
// resetButton.addEventListener("click", reset);
