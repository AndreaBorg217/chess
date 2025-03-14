import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Board from "../board";

class Bishop extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("bishop", colour, x, y);            
    }
    
    public evaluateMoves(board: Board): Map<string, Position>{
        // start from current position and move in X shape
        let moves: Map<string, Position> = new Map<string, Position>();

        // decrease current row, decrease current col (left up from middle of board)
        let row: number = this.position.row - 1;
        let col: number = this.position.col - 1;
        while (row >= 0 && col >= 0) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== this.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === this.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row--;
            col--;
        }

        // decrease current row, increase current col (right up from middle of board)
        row = this.position.row - 1;
        col = this.position.col + 1;
        while (row >= 0 && col < 8) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== this.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === this.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row--;
            col++;
        }

        // increase current row, decrease current col (left down from middle of board)
        row = this.position.row + 1;
        col = this.position.col - 1;
        while (row < 8 && col >= 0) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== this.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === this.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row++;
            col--;
        }
        
        // increase current row, increase current col (right down from middle of board)
        row = this.position.row + 1;
        col = this.position.col + 1;
        while (row < 8 && col < 8) {
            // if opponent piece is found, add to moves, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour !== this.colour) {
                let p: Position = new Position(row, col);
                moves.set(p.key(), p);
                break;
            }
            // if own piece is found, break
            if (board.pieces[row][col] instanceof Piece && board.pieces[row][col]?.colour === this.colour) {
                break;
            }
            // if empty cell is found, add to moves
            let p: Position = new Position(row, col);
            moves.set(p.key(), p);
            row++;
            col++;
        }

        console.log("Knight can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        return moves;
    }
}

export default Bishop
