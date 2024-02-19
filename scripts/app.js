const grid = document.querySelector(".grid");
const width = 10;
const height = 20;

const cellCount = height * width;
const cells = [];
let pacmanCurrentPosition = 50;
let ghostsCurrentPosition = [88, 89, 90];
let dottedCells = [];

//creating the grid framework : 20w*10h
function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  });
  addPacman(pacmanCurrentPosition);
  // createDottedCells();
  //=> Add a setTimer, to delay launch of 2/4 ghost
}
createGrid();

// Next Steps :
// 1.1. Adding pacman to the board
function addPacman(position) {
  cells[position].classList.add("pacman");
}
function addGhosts(position) {
  cells[position].classList.add("ghosts");
}

// 1.2 removing packman / ghosts from previous position / avoid repeating packman
function removePacman(position) {
  cells[position].classList.remove("pacman");
}

// 1.3. remove Ghosts -> inspiration -> IF pacman eats a ghost, remove ghost
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

// 1.4. Add pallets to all cells
function createDottedCells() {
  cells.forEach((cell, index) => {
    if (index !== pacmanCurrentPosition) {
      cell.classList.add("dots");
    }
  });
}
createDottedCells();

// 2. Adding borders to the game, so pacman or ghosts can't disapear from grid
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

  console.log(`Cat current position ${pacmanCurrentPosition}`);
}
document.addEventListener("keydown", handleKeyDown);

// 4. Create blocks, by creating a harcoded array of blocks => for loop that goes through them. Could use an array as well ?
let gridData = {
  rest: [
    3, 4, 7, 8, 11, 12, 14, 15, 16, 21, 28, 29, 31, 38, 60, 61, 79, 78, 120,
    121, 139, 138, 148, 149, 150, 151, 161, 162, 165, 168, 169, 170, 171, 173,
    174, 175, 177, 178, 184, 185, 186, 195,
  ],
  gCells: [43, 44, 45, 46, 63, 83, 85, 86, 103, 106, 123, 124, 125, 126],
  aCells: [53, 54, 55, 56, 73, 76, 93, 94, 95, 96, 113, 116, 133, 136],
  ghostCells: [68, 69, 70, 71, 88, 91, 108, 109, 110, 111],
};

// loop through the array of cells to
function applyClassesToCells(cellIndices, className) {
  cellIndices.forEach((index) => {
    cells[index].classList.add(className);
  });
  cells.classList.remove("createDottedCells");
}

function blockCells() {
  applyClassesToCells(gridData.rest, "blocks-blue");
  applyClassesToCells(gridData.gCells, "blocks-red");
  applyClassesToCells(gridData.aCells, "blocks-red");
  applyClassesToCells(gridData.ghostCells, "ghost-cells");
}

blockCells();

// 5. Create a Class for Ghosts*4 with starting point their "prison"
// 5.1. Add a delay - for ghosts coming out of their section
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses
// 8. Add a Start Button / Starts game

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */
/* const array = cell value 
function - to add the lava
for loop - use an image to create an image blocker
Cells at whatever position - add the classlist of the image.
*/
