




/* Requirements of assignment

Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.

-Create a Tic-Tac-Toe game grid using your HTML element of choice.

-When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.

-A heading should say whether it is X's or O's turn and change with each move made.

-A button should be available to clear the grid and restart the game.

-When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

*/



//#############################################################################################################
// Easy Recall to icon and other resources for copy/paste

//    circle icon
// <i class="bi bi-circle"></i>

//    x icon
// <i class="bi bi-x-lg"></i>
//#############################################################################################################


/* IIFE
// IIFE to encapsulate the code
// Example:

// (function() {
//   // Your code here
// })();
*/
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', (e) => { //Ensures page is fully loaded before executing code.

    // Most variable and dom grabs initialized here
    const cell = document.querySelectorAll('.cell');                 // Grabs cells within game element (or whole page, but the HTML only has them in game)
    const game = document.getElementById('game');                    // Grabs Game dom element
    let currentPlayer = 'x';                                         // Default initialization of player. X always goes first
    const turnStatusElement = document.getElementById('turnStatus'); // Turn indicator header

    // Define winning combinations for Tic Tac Toe
    const winningCombinations = [
      // Rows
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Columns
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonals
      [0, 4, 8], [2, 4, 6]
    ];

    // Check if a player has won
    /**
     * Checks if the player's cells match any winning combination.
     *
     * @param {number[]} playerCells - An array of cell numbers owned by the player.
     * @returns {boolean} `true` if the player's cells form a winning combination, `false` otherwise.
     */
    function checkWin(playerCells) {                            // Asks for predetermined playerCells variable for function
      return winningCombinations.some(combination =>            // .some() checks any winning combo array against the generated player cells array
        combination.every(cell => playerCells.includes(cell))   // .every() ensures that
      );
    }

    // Check if it's a draw
    /**
     * Checks if the game has ended in a draw.
     * 
     * @returns {boolean} `true` if all cells are occupied by players, indicating a draw; otherwise, `false`.
     */
    function checkDraw() {
      return Array.from(cell).every(cell => cell.dataset.player);
    }

    // Get the cells played by the current player
    /**
     * Gets the indexes of cells owned by a specific player.
     *
     * @param {string} player - The player identifier to search for.
     * @returns {number[]} An array containing the indexes of cells owned by the specified player.
     */
    function getPlayerCells(player) {
      const playerCellIndexes = [];
      for (let i = 0; i < cell.length; i++) {
        if (cell[i].dataset.player === player) {
          playerCellIndexes.push(i);
        }
      }
      return playerCellIndexes;
    }

    // Add click event listeners to cells
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener('click', () => {
        const currentCell = cell[i];

        // Log the index of the clicked cell
        console.log('Clicked cell index:', i);

        if (!currentCell.dataset.player) {
          currentCell.dataset.player = currentPlayer;

          const playerIcon = document.createElement('i');
          playerIcon.classList.add('bi');

          if (currentPlayer === 'x') {
            playerIcon.classList.add('bi-x-lg');
          } else {
            playerIcon.classList.add('bi-circle');
          }

          currentCell.appendChild(playerIcon);

          if (checkWin(getPlayerCells(currentPlayer))) {
            // Handle win here
            console.log(`${currentPlayer} wins!`);
            const successAlert = document.createElement('div');
            successAlert.classList.add('alert', 'alert-success');
            successAlert.setAttribute('role', 'alert');
            successAlert.textContent = `${currentPlayer.toUpperCase()} wins!`;
          
            const alertContainer = document.getElementById('alertContainer');
            alertContainer.appendChild(successAlert);

            // Disable clicks on all cells
            for (let j = 0; j < cell.length; j++) {
              if (!cell[j].dataset.player) {
                cell[j].setAttribute('data-player', 'no-click');
              }
            }

          } else if (checkDraw()) {
            // Handle draw here
            console.log("It's a draw!");
            const successAlert = document.createElement('div');
            successAlert.classList.add('alert', 'alert-success');
            successAlert.setAttribute('role', 'alert');
            successAlert.textContent = `Game is a draw!`;
          
            const alertContainer = document.getElementById('alertContainer');
            alertContainer.appendChild(successAlert);

            // Disable clicks on remaining cells
            for (let j = 0; j < cell.length; j++) {
              if (!cell[j].dataset.player) { // !cell[j] = If cell[j] does not have data set as a player, fill with data 'no-click'
                cell[j].setAttribute('data-player', 'no-click');
              }
            }
          } else { // If current player stricly equals x, (?) switch to o (:) otherwise switch to x
            currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
            turnStatusElement.textContent = `It's ${currentPlayer.toUpperCase()}'s turn`;
            turnStatusElement.classList.remove('header-x', 'header-o');
            turnStatusElement.classList.add(`header-${currentPlayer}`);
          }
        }
      });
    }

      // Add click event listener to the restart button
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', () => {
    // Clear the game board
    Array.from(cell).forEach(cellElement => {
      cellElement.dataset.player = '';
      cellElement.innerHTML = '';
      cellElement.removeAttribute('data-player');
    });

    // Reset game state
    currentPlayer = 'x';
    turnStatusElement.textContent = `It's X's turn`;
    turnStatusElement.classList.remove('header-o');
    turnStatusElement.classList.add('header-x');

      // Clear the win alert
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = ''; // Clear the content of the alert container
  });
  });
  
})();


// This code was moved outside of IIFE to reduce clutter
// It should be near the top with variable declarations if you want to use it

//----------This Code is for testing only. It's kind of broken. Disregard it.---------------------------
  // // Add event listener for Test State 1 button
  // document.getElementById('testState1').addEventListener('click', () => {
  //   const gameState = ['x', '', 'o', '', 'x', 'o', 'o', '', 'x'];
  //   populateBoard(gameState);
  //   checkGameState(gameState);
  // });

  // // Add event listener for Test State 2 button
  // document.getElementById('testState2').addEventListener('click', () => {
  //   const gameState = ['o', 'x', '', '', 'o', 'x', 'x', '', 'o'];
  //   populateBoard(gameState);
  //   checkGameState(gameState);
  // });

  // // Function to check for wins after populating the board
  // function checkGameState(state) {
  //   const xCells = state.map((value, index) => value === 'x' ? index : null).filter(index => index !== null);
  //   const oCells = state.map((value, index) => value === 'o' ? index : null).filter(index => index !== null);

  //   if (checkWin(xCells)) {
  //     console.log('X wins in this state!');
  //   } else if (checkWin(oCells)) {
  //     console.log('O wins in this state!');
  //   } else {
  //     console.log('No win in this state.');
  //   }
  // }

  
  // // Function to populate the game board based on a given state
  // function populateBoard(state) {
  //   for (let i = 0; i < cell.length; i++) {
  //     cell[i].dataset.player = state[i];
  //     cell[i].innerHTML = ''; // Clear any previous content
  //     if (state[i] === 'x') {
  //       const playerIcon = document.createElement('i');
  //       playerIcon.classList.add('bi', 'bi-x-lg');
  //       cell[i].appendChild(playerIcon);
  //     } else if (state[i] === 'o') {
  //       const playerIcon = document.createElement('i');
  //       playerIcon.classList.add('bi', 'bi-circle');
  //       cell[i].appendChild(playerIcon);
  //     }
  //   }
  // }
//------------------------------------------------------------------------------------------------------