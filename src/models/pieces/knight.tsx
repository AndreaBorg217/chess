import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Board from "../board";
import Utils from "../../utils/utils";

class Knight extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("knight", colour, x, y);            
    }
    
    public evaluateMoves(board: Board): Map<string, Position>{
        let moves: Map<string, Position> = new Map<string, Position>();
        // up 2, left 1
        let p = new Position(this.position.row + 2, this.position.col - 1);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // up 2, right 1
        p = new Position(this.position.row + 2, this.position.col + 1);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // up 1, left 3
        p = new Position(this.position.row + 1, this.position.col - 2);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // up 1 right 3
        p = new Position(this.position.row + 1, this.position.col + 2);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // down 2, left 1
        p = new Position(this.position.row - 2, this.position.col - 1);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // down 2, right 1
        p = new Position(this.position.row - 2, this.position.col + 1);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // down 1, left 3
        p = new Position(this.position.row - 1, this.position.col - 2);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        // down 1, right 3
        p = new Position(this.position.row - 1, this.position.col + 2);
        if(Utils.isWithinBounds(p) && (board.pieces[p.row][p.col]?.colour !== this.colour)){
            moves.set(p.key(), p);
        }
        console.log("Knight can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        return moves;
    }
}

export default Knight
