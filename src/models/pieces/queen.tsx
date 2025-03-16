import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Board from "../board";
import MovementUtils from "../../utils/movement_utils";

class Queen extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("queen", colour, x, y);            
    }
    
    public evaluateMoves(board: Board, log: boolean= true): Map<string, Position>{
        const moves = new Map<string,Position>([...MovementUtils.slideX(this, board), ...MovementUtils.slidePlus(this, board)]);
        if(log){
            console.log("Queen can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }
}

export default Queen
