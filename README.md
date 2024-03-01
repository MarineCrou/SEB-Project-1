# Pacman GA Edition Project

## Introduction

Welcome to the Pacman GA Edition, a modern twist on the classic Pacman game. In this edition, players embark on a nostalgic journey with a unique GA-themed twist. As always, the objective is for Pacman to devour all the pellets scattered across the board while evading the four iconic ghosts: Blinky, Pinky, Inky, and Clyde. Failure to do so risks losing one of Pacman's three precious lives. Crafted with HTML, CSS, and JavaScript, this game promises an engaging experience as players navigate through an original, GA-themed grid.

## Installation Instructions

To dive into the Pacman GA Edition from the comfort of your computer, follow these simple steps:

1. Get the Game: Start by downloading the game files to your computer. You can do this by visiting the project's repository and selecting the option to clone or download the entire project.
2. Launch the Game: Once downloaded, locate and open the index.html file using your preferred web browser. This action initiates the game, setting the stage for your Pacman adventure.
3. Gameplay: Use the arrow keys on your keyboard to guide Pacman through the intricate maze. Your mission is to consume all the pellets spread across the maze.
   Avoid the Ghosts: Keep a keen eye on the ghosts roaming the maze. Your goal is to avoid them at all costs while clearing the pellets.
   Play Online: For those looking to jump straight into the action without downloading, the Pacman GA Edition is also available to play online. Simply click on this link to start playing immediately. (Note: Replace the placeholder # with the actual URL where the game is hosted online.)

## Goal of the project

The core objectives of the Pacman GA Edition were straightforward, focusing on ensuring gameplay functionality and user interaction:

Enable the player to successfully clear at least one board.
Display the player's score upon the conclusion of the game.

## Stack

The game is built using:

- HTML (index.html): Serves as the foundation of the game's layout.
- CSS (main.css): Styles the game, with a key highlight being the creation of Pacman's grid.
- JavaScript (app.js): Adds dynamic elements to the game, such as block/wall placements in the grid, Pacman animation via keydown event listeners, and randomizes the movements of the four ghosts.

## Design and Planning

Development commenced with a thorough design and planning phase spanning the first two days, involving wireframing and pseudocoding the game's mechanics and layout.
![pacman GA WireFrame](./img/readme%20-%20visuals/WireFrame.png)

## Implementing the MVP

A functional Minimum Viable Product (MVP) was established early on to guide subsequent development phases.
![pacman MVP](./img/readme%20-%20visuals/pacman--live-game.png)

## Debugging and Refinement

The final day was dedicated to debugging and refining the game. A prioritized bug list, maintained within the app.js file, facilitated systematic troubleshooting. A notable challenge was addressing a malfunction in the reset button, which was temporarily resolved by implementing location.reload(); to ensure game functionality.

![fixing last bugs](./img/readme%20-%20visuals/Fixing%20Bugs.png)
This phase was crucial for reflection and learning, allowing for an in-depth review of the JavaScript code, identification of redundant function calls, and resolution of infinite loops that compromised game stability.

## Future Enhancements

Looking ahead, several exciting features are planned to enrich the gameplay further:

- Ghost Vulnerability: Introduce a mechanic where ghosts become vulnerable and turn blue when Pacman eats the fruits on the board, allowing them to be eaten.
- Ghost cell Locking: Implement a feature to lock cells after ghosts exit them, preventing their return and adding a strategic layer to ghost movements.
- Smart Ghost tracking: Develop AI for ghosts to track and follow Pacman, increasing the game's challenge.

## Contribution Guidelines

Your contributions are welcome! If you're interested in helping implement the new features or improve the existing code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Submit a pull request.
   Together, we can make Pacman GA Edition even more thrilling and enjoyable for players around the world.
