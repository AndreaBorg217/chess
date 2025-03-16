import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Board from "../board";
import Utils from '../../utils/utils';

class Pawn extends Piece{
    initialPosition: Position;
    constructor(colour: Colour, x: number, y: number){
        super("pawn", colour, x, y);            
        this.initialPosition = new Position(x, y);
    }
    
    public getkillMoves(board: Board): Map<string, Position>{
        const leftDiagonal: Position = new Position(this.position.row + this.getCardinality(), this.position.col - 1);
        const rightDiagonal: Position = new Position(this.position.row + this.getCardinality(), this.position.col + 1);

        let killMoves: Map<string, Position> = new Map<string, Position>();
        if(Utils.isWithinBounds(leftDiagonal) && board.pieces[leftDiagonal.row][leftDiagonal.col] instanceof Piece && board.pieces[leftDiagonal.row][leftDiagonal.col]?.colour !== this.colour){
            killMoves.set(leftDiagonal.key(), leftDiagonal);
        }
        if(Utils.isWithinBounds(rightDiagonal) && board.pieces[rightDiagonal.row][rightDiagonal.col] instanceof Piece && board.pieces[rightDiagonal.row][rightDiagonal.col]?.colour !== this.colour){
            killMoves.set(rightDiagonal.key(), rightDiagonal);
        }

        return killMoves;
    }
    
    public evaluateMoves(board: Board, log: boolean = true): Map<string, Position>{
        const FIRST_MOVE: number = 2;
        const OTHER_MOVES: number = 1;

        const killMoves: Map<string, Position> = this.getkillMoves(board);
        
        let forwardMoves: Map<string, Position> = new Map<string, Position>();
        
        // 1 move forward
        let p: Position = new Position(this.position.row + (this.getCardinality() * OTHER_MOVES), this.position.col);
        if(board.pieces[p.row][p.col] === undefined){
            forwardMoves.set(p.key(), p)
        }
                
        if (this.position.isEqual(this.initialPosition)){
            let p = new Position(this.position.row + (this.getCardinality() * FIRST_MOVE), this.position.col);
            if(board.pieces[p.row][p.col] === undefined && forwardMoves.size > 0){ // if there is a piece in front, we can't move 2 steps
                forwardMoves.set(p.key(), p)
            }
        }

        let toReturn: Map<string, Position> = new Map<string, Position>([...killMoves, ...forwardMoves]);
        if(log){
            console.log("Pawn can move to: ", Array.from(toReturn.values()).map(p => p.toString()).join(", "));
        }
        return toReturn 
    }

    private getCardinality(): number{
        return this.colour === Colour.WHITE ? -1 : 1;  // black moves down, white moves up
    }
}

export default Pawn
