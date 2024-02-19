const grid = document.querySelector(".grid");
const width = 10;
const height = 20;

const cellCount = height * width;
const cells = [];

// VARIABLES :
// character positions
let pacmanCurrentPosition = 127;
let blinkyStartPosition = 89;
let pinkyStartPosition = 69;
let inkyStartPosition = 70;
let clydeStartPosition = 90;

let ghostsStartPosition = [88, 89, 90];

let dottedCells;

// defining blocks:
const walls = [
  3, 4, 7, 8, 11, 12, 14, 15, 16, 21, 28, 29, 31, 38, 60, 61, 79, 78, 120, 121,
  139, 138, 148, 149, 150, 151, 161, 162, 165, 168, 169, 170, 171, 173, 174,
  175, 177, 178, 184, 185, 186, 195,
];
const gCells = [43, 44, 45, 46, 63, 83, 85, 86, 103, 106, 123, 124, 125, 126];
const aCells = [53, 54, 55, 56, 73, 76, 93, 94, 95, 96, 113, 116, 133, 136];
const ghostCell = [68, 71, 88, 91, 108, 109, 110, 111];
const ghostGateCells = [69, 70];

//creating the grid framework : 20w*10h
function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  });

  addPacman(pacmanCurrentPosition);
  addGhosts(blinkyStartPosition);
  addGhosts(pinkyStartPosition);
  addGhosts(clydeStartPosition);
  addGhosts(inkyStartPosition);

  //=> Add a setTimer, to delay launch of 2/4 ghost
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

//Adding 4 Ghosts
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

// Remove Ghosts -> inspiration -> IF pacman eats a ghost, remove ghost
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
// 4.3 Create a Class for Ghosts*4 with starting point their "prison"

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
//STILL NEED TO MAKE THE BLOCK SOLID

// 2. Add pellets to all cells Except For : cells that have blocks & Pacman
function createDottedCells() {
  cells.forEach((cell, index) => {
    if (
      index !== pacmanCurrentPosition &&
      index !== blinkyStartPosition &&
      index !== pinkyStartPosition &&
      index !== clydeStartPosition &&
      index !== inkyStartPosition &&
      !walls.includes(index) &&
      !gCells.includes(index) &&
      !aCells.includes(index) &&
      !ghostCell.includes(index)
    ) {
      cell.classList.add("dots");
    }
  });
}
createDottedCells();

//Adding borders to the game, so pacman or ghosts can't disapear from grid
function handleKeyDown(event) {
  removePacman(pacmanCurrentPosition);
  // left is 37 //
  if (event.keyCode === 37 && pacmanCurrentPosition % height !== 0) {
    pacmanCurrentPosition--;
    // up is 38
  } else if (event.keyCode === 38 && pacmanCurrentPosition >= height) {
    pacmanCurrentPosition -= height;
    // right is 39
  } else if (
    event.keyCode === 39 &&
    pacmanCurrentPosition % height !== height - 1
  ) {
    pacmanCurrentPosition++;
    // down is 40
  } else if (
    event.keyCode === 40 &&
    pacmanCurrentPosition < cellCount - height
  ) {
    pacmanCurrentPosition += height;
  }
  addPacman(pacmanCurrentPosition);
  console.log(`pacman current position ${pacmanCurrentPosition}`);
}
document.addEventListener("keydown", handleKeyDown);

//How to disable blocks from being gone through

// 4.4 Add a delay - for ghosts coming out of their section
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses
// 8. Add a Start Button / Starts game

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */
