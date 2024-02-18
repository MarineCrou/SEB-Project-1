const grid = document.querySelector(".grid");
const width = 10;
const height = 20;

const cellCount = height * width;
const cells = [];
let pacmanCurrentPosition = 50;
let ghostsCurrentPosition = [88, 89, 90];
let dottedCells = [];
let condemnedCells = [];

//creating the grid framework : 20w*10h
function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  });
  addPacman(pacmanCurrentPosition);
  createDottedCells();
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
// function createDottedCells() {
//   cells.forEach((cell, index) => {
//     if (index !== pacmanCurrentPosition) {
//       cell.classList.add("dots");
//     }
//   });
// }
// createDottedCells();

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
function condemnedBlocked() {
  for (let i = 0; i < condemnedCells.length; i++) {
    console.log("This is part of a block element");
    cells.classList.add("dots");
  }
}

//  function createDottedCells() {
//   cells.forEach((cell, index) => {
//     if (index !== pacmanCurrentPosition) {
//       cell.classList.add("dots");
//     }
//   });
// }

// 5. Create a Class for Ghosts*4 with starting point their "prison"
// 5.1. Add a delay - for ghosts coming out of their section
// 6. figure out how to delete a pallet/fruit once packman is on the same cell (look at whack a mole)
// 7. Have lives be discounted when looses

/* to get ghosts to move in random position : control flow of direction - Based on index position of ghost */
/* trace an array of the cells i would to be a barrier */
/* const array = cell value 
function - to add the lava
for loop - use an image to create an image blocker
Cells at whatever position - add the classlist of the image.
*/
