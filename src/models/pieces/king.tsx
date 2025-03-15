import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Utils from "../../utils/utils";
import Board from "../board";

class King extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("king", colour, x, y);            
    }
    
    public evaluateMoves(board: Board, log: boolean = true): Map<string, Position>{
        let moves: Map<string, Position> = new Map<string, Position>();
        let p = new Position(this.position.row + 1, this.position.col - 1); // increase row, decrease column (up left)
        moves.set(p.key(), p);
        p = new Position(this.position.row + 1, this.position.col + 1); // increase row, increase column (up right)
        moves.set(p.key(), p);
        p = new Position(this.position.row - 1, this.position.col - 1); // decrease row, decrease column (down left)
        moves.set(p.key(), p);
        p = new Position(this.position.row - 1, this.position.col + 1); // decrease row, increase column (down right)
        moves.set(p.key(), p);
        p = new Position(this.position.row, this.position.col - 1); // left
        moves.set(p.key(), p);
        p = new Position(this.position.row, this.position.col + 1); // right
        moves.set(p.key(), p);
        p = new Position(this.position.row -1, this.position.col); // up
        moves.set(p.key(), p);
        p = new Position(this.position.row + 1, this.position.col); // down
        moves.set(p.key(), p);

        for(let [key, p] of moves){
            if(!Utils.isLegalMove(this, p, board)){
                moves.delete(key);
            }
        }

        if(log){
            console.log("King can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }
}

export default King
