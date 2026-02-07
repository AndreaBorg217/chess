# Chess

This is a fully functional chess game built using React. The project was developed from the ground up, focusing on implementing the game logic without relying on AI (just a good old-fashioned debugger). The game includes features such as move validation, piece-specific movement rules, and a user-friendly interface.

## Features

- **Interactive Chessboard**: A user-friendly chessboard that updates based on user interactions.
- **Game Logic**: Implements all chess rules, including most special moves like castling and pawn promotion. En passant is a TODO.
- **Piece Movement**: Each piece has its own movement logic, encapsulated in reusable classes.
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

## Running the Solution

To run the application locally, follow these steps:

1. Ensure you have Docker installed on your machine.
2. Run the following command to build and start the application:
   ```bash
   docker compose up --build -d