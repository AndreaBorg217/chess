import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Board from "../board";

class Rook extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("rook", colour, x, y);            
    }
    
    public evaluateMoves(board: Board): Map<string, Position>{
        // move in plus shape
        let moves = new Map<string, Position>();

        // increase row (move up from centre of the board)
        let row: number = this.position.row + 1;
        while (row < 8) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[row][this.position.col] instanceof Piece && board.pieces[row][this.position.col]?.colour !== this.colour){
                let p: Position = new Position(row, this.position.col);
                moves.set(p.key(), p);   
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[row][this.position.col] instanceof Piece && board.pieces[row][this.position.col]?.colour === this.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(row, this.position.col);
            moves.set(p.key(), p);
            row++;
        }
        // decrease row (move down from centre of the board)
        row = this.position.row - 1;
        while (row >= 0) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[row][this.position.col] instanceof Piece && board.pieces[row][this.position.col]?.colour !== this.colour){
                let p: Position = new Position(row, this.position.col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[row][this.position.col] instanceof Piece && board.pieces[row][this.position.col]?.colour === this.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(row, this.position.col);
            moves.set(p.key(), p);
            row--;
        }
        // increase column (move right from centre of the board)
        let col: number = this.position.col + 1;
        while (col < 8) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[this.position.row][col] instanceof Piece && board.pieces[this.position.row][col]?.colour !== this.colour){
                let p: Position = new Position(this.position.row, col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[this.position.row][col] instanceof Piece && board.pieces[this.position.row][col]?.colour === this.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(this.position.row, col);
            moves.set(p.key(), p);
            col++;
        }
        // decrease column (move left from centre of the board)
        col = this.position.col - 1;
        while (col >= 0) {
            // if position is occupied by opponent, add to moves and break
            if(board.pieces[this.position.row][col] instanceof Piece && board.pieces[this.position.row][col]?.colour !== this.colour){
                let p: Position = new Position(this.position.row, col);
                moves.set(p.key(), p);
                break;
            }
            // if position is occupied by self, break
            if(board.pieces[this.position.row][col] instanceof Piece && board.pieces[this.position.row][col]?.colour === this.colour){
                break;
            }

            // if position is empty, add to moves
            let p: Position = new Position(this.position.row, col);
            moves.set(p.key(), p);
            col--;
        }

        return moves;
    }
}

export default Rook
