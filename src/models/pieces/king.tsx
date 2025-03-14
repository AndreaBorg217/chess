import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Utils from "../../utils/utils";
import Board from "../board";

class King extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("king", colour, x, y);            
    }
    
    public evaluateMoves(board: Board): Map<string, Position>{
        let moves: Map<string, Position> = new Map<string, Position>();
        // increase row, decrease column (up left)
        let p = new Position(this.position.row + 1, this.position.col - 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // increase row, increase column (up right)
        p = new Position(this.position.row + 1, this.position.col + 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // decrease row, decrease column (down left)
        p = new Position(this.position.row - 1, this.position.col - 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // decrease row, increase column (down right)
        p = new Position(this.position.row - 1, this.position.col + 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // left
        p = new Position(this.position.row, this.position.col - 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // right
        p = new Position(this.position.row, this.position.col + 1);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // up
        p = new Position(this.position.row -1, this.position.col);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // down
        p = new Position(this.position.row + 1, this.position.col);
        if(Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }

        console.log("King can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        return moves;
    }
}

export default King
