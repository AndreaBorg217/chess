import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Board from "../board";
import MovementUtils from "../../utils/movement_utils";
import Move from "../move";

class Bishop extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("bishop", colour, x, y);            
    }
    
    public evaluateMoves(board: Board, history: Move[] = [], log: boolean = true): Map<string, Position>{
        const moves = MovementUtils.slideX(this, board);
        if (log){
            console.log("Bishop can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }
}

export default Bishop
