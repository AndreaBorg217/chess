import Piece from "../models/piece";
import Position from "../models/position";
import Board from "../models/board";

class MovementUtils{
    // encapsulates common movement logic for Queen and Bishop
    public static slideX(piece: Piece, board: Board): Map<string, Position>{
        // start from current position and move in X shape
        let moves: Map<string, Position> = new Map<string, Position>();

        // decrease current row, decrease current col (left up from middle of board)
        let row: number = piece.position.row - 1;
        let col: number = piece.position.col - 1;
        while (row >= 0 && col >= 0) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== piece.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === piece.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row--;
            col--;
        }

        // decrease current row, increase current col (right up from middle of board)
        row = piece.position.row - 1;
        col = piece.position.col + 1;
        while (row >= 0 && col < 8) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== piece.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === piece.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row--;
            col++;
        }

        // increase current row, decrease current col (left down from middle of board)
        row = piece.position.row + 1;
        col = piece.position.col - 1;
        while (row < 8 && col >= 0) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== piece.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === piece.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row++;
            col--;
        }
        
        // increase current row, increase current col (right down from middle of board)
        row = piece.position.row + 1;
        col = piece.position.col + 1;
        while (row < 8 && col < 8) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== piece.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === piece.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row++;
            col++;
        }
        return moves;
    }

    // encapsulates common movement logic for Queen and Rook
    public static slidePlus(piece: Piece, board: Board): Map<string, Position>{
        // move in plus shape starting from current position
        let moves = new Map<string, Position>();

        // increase row (move up from centre of the board)
        let row: number = piece.position.row + 1;
        while (row < 8) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[row][piece.position.col] instanceof Piece && board.pieces[row][piece.position.col]?.colour !== piece.colour){
                let p: Position = new Position(row, piece.position.col);
                moves.set(p.key(), p);   
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[row][piece.position.col] instanceof Piece && board.pieces[row][piece.position.col]?.colour === piece.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(row, piece.position.col);
            moves.set(p.key(), p);
            row++;
        }
        // decrease row (move down from centre of the board)
        row = piece.position.row - 1;
        while (row >= 0) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[row][piece.position.col] instanceof Piece && board.pieces[row][piece.position.col]?.colour !== piece.colour){
                let p: Position = new Position(row, piece.position.col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[row][piece.position.col] instanceof Piece && board.pieces[row][piece.position.col]?.colour === piece.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(row, piece.position.col);
            moves.set(p.key(), p);
            row--;
        }
        // increase column (move right from centre of the board)
        let col: number = piece.position.col + 1;
        while (col < 8) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[piece.position.row][col] instanceof Piece && board.pieces[piece.position.row][col]?.colour !== piece.colour){
                let p: Position = new Position(piece.position.row, col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[piece.position.row][col] instanceof Piece && board.pieces[piece.position.row][col]?.colour === piece.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(piece.position.row, col);
            moves.set(p.key(), p);
            col++;
        }
        // decrease column (move left from centre of the board)
        col = piece.position.col - 1;
        while (col >= 0) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[piece.position.row][col] instanceof Piece && board.pieces[piece.position.row][col]?.colour !== piece.colour){
                let p: Position = new Position(piece.position.row, col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[piece.position.row][col] instanceof Piece && board.pieces[piece.position.row][col]?.colour === piece.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(piece.position.row, col);
            moves.set(p.key(), p);
            col--;
        }

        return moves;
    }
}

export default MovementUtils;