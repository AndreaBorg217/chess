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

        const directions = [
            { row: 2, col: -1 },  // up 2, left 1
            { row: 2, col: 1 },   // up 2, right 1
            { row: 1, col: -2 }, // up 1, left 3
            { row: 1, col: 2 },  // up 1, right 3
            { row: -2, col: -1 },  // down 2, left 1
            { row: -2, col: 1 },   // down 2, right 1
            { row: -1, col: -2 }, // down 1, left 3
            { row: -1, col: 2 }    // down 1, right 3
        ]

        directions.forEach(direction => {
            const p = new Position(this.position.row + direction.row, this.position.col + direction.col);
            if(Utils.isLegalMove(p, board, this.colour)){
                moves.set(p.key(), p);
            }
        });
        
        if(log){
            console.log("Knight can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }
}

export default Knight
