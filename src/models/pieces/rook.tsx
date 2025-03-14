import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'
import Board from "../board";
import MovementUtils from "../../utils/movement_utils";

class Rook extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("rook", colour, x, y);            
    }
    
    public evaluateMoves(board: Board): Map<string, Position>{
        const moves = MovementUtils.slidePlus(this, board);
        console.log("Rook can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        return moves;
    }
}

export default Rook
