import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Board from "../board";
import Utils from "../../utils/utils";

class Knight extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("knight", colour, x, y);            
    }
    
    public evaluateMoves(board: Board, log: boolean = true): Map<string, Position>{
        let moves: Map<string, Position> = new Map<string, Position>();
        
        let p = new Position(this.position.row + 2, this.position.col - 1); // up 2, left 1
        moves.set(p.key(), p)
        p = new Position(this.position.row + 2, this.position.col + 1); // up 2, right 1
        moves.set(p.key(), p)
        p = new Position(this.position.row + 1, this.position.col - 2); // up 1, left 2
        moves.set(p.key(), p)
        p = new Position(this.position.row + 1, this.position.col + 2); // up 1, right 2
        moves.set(p.key(), p)
        p = new Position(this.position.row - 2, this.position.col - 1); // down 2, left 1
        moves.set(p.key(), p)
        p = new Position(this.position.row - 2, this.position.col + 1); // down 2, right 1
        moves.set(p.key(), p)
        p = new Position(this.position.row - 1, this.position.col - 2); // down 1, left 2
        moves.set(p.key(), p)
        p = new Position(this.position.row - 1, this.position.col + 2); // down 1, right 2
        moves.set(p.key(), p)

        for(let [key, p] of moves){
            if(!Utils.isLegalMove(this, p, board)){
                moves.delete(key);
            }
        }

        if(log){
            console.log("Knight can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }
}

export default Knight
