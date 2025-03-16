import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Utils from "../../utils/utils";
import Board from "../board";

class King extends Piece{
    initialPosition: Position
    constructor(colour: Colour, x: number, y: number){
        super("king", colour, x, y);
        this.initialPosition = new Position(x, y);            
    }
    
    public evaluateMoves(board: Board, log: boolean = true): Map<string, Position>{
        const moves: Map<string, Position> = new Map<string, Position>();
        const directions = [
            { row: 1, col: -1 },  // up left
            { row: 1, col: 1 },   // up right
            { row: -1, col: -1 }, // down left
            { row: -1, col: 1 },  // down right
            { row: 0, col: -1 },  // left
            { row: 0, col: 1 },   // right
            { row: -1, col: 0 },  // up
            { row: 1, col: 0 }    // down
        ];

        directions.forEach(direction => {
            const p = new Position(this.position.row + direction.row, this.position.col + direction.col);
            if(Utils.isLegalMove(p, board, this.colour)){
                moves.set(p.key(), p);
            }
        });

        if(log){
            console.log("King can move to: ", Array.from(moves.values()).map(p => p.toString()).join(", "));
        }
        return moves;
    }

    public hasMoved(): boolean{
        return !this.position.isEqual(this.initialPosition);
    }
}

export default King
