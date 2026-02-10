# Chess

This is a fully functional chess game built using React. The project was developed from the ground up, focusing on implementing the game logic without relying on AI; just me and a good old-fashioned debugger (Claude did help a bit with the CSS).

## Features

- **Interactive Chessboard**: A user-friendly chessboard that updates based on user interactions.
- **Game Logic**: Implements all chess rules, including most special moves like castling, pawn promotion, and en passant.
- **Stats Panel**: Displays game statistics, including the current turn, captured pieces, and game state.
- **Pawn Promotion**: A modal allows players to select a piece when a pawn reaches the opposite end of the board.
- **Responsive Design**: The UI is styled to work on different screen sizes.

## Project Structure

The project is organized into the following key directories:

- **`components/`**: Contains React components for the chessboard, pawn promotion modal, and stats panel.
- **`models/`**: Defines the core game logic, including classes for the board, pieces, and positions.
- **`utils/`**: Includes utility functions for movement validation and other shared logic.
- **`enums/`**: Contains enumerations for game states and piece colors.

### Key Files

- **`App.tsx`**: The main entry point for the application rendering components, and using the GameController for orchestration.
- **`Board.tsx`**: Renders the chessboard and handles user interactions like piece movement.
- **`Controller.tsx`**: Implements the game logic and orchestrates the game by managing all state including the board, turn, allowance of special moves, game end etc.

### Details about the algorithm

### The Board

`Board` stores the pieces (or absence thereof) in a matrix, as well as the background colours of the cells and if they can be clicked. 

A cell in `Board` can be of type `Piece` or `undefined`. `Piece` is an abstract class used to implement a common interface for moving logic. `evaluateMoves` is used to determine where a piece can move, including kills. This means that if a `Piece` moves to a cell containing another `Piece` of a different colour, it is identified as a kill.

A `Piece` tracks its location on the `Board` using `Position`. `Position` provides utilities for comparing the location of two pieces on the board. It is also used to determine which cell has been clicked in the board UI.

A distinction is to be made between `clickedCell` and `clickedPostion` in the controller's `handleClick`. `clickedCell` contains the state of the cell when it was clicked, before pieces were move etc. `clickedPosition` stores the coordinates that were clicked.

### Pawn

`getKillMoves` is used for the `Pawn`, other pieces just return `evaluateMoves`. This is because all pieces can move and kill, however a `Pawn` can only kill with a diagonal move.

Since the `Pawn` can only move in one direction, vertically towards the other side of the board, `getCardinality` uses the colour of the `Pawn` to determine this direction.


## Running the Solution

To run the application locally, follow these steps:

1. Ensure you have Docker installed on your machine.
2. Run the following command to build and start the application:
   ```bash
   docker compose up --build -d
