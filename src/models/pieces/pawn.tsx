import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Board from "../board";
import Utils from '../../utils/utils';
import Move from "../move";

class Pawn extends Piece{
    initialPosition: Position;
    constructor(colour: Colour, x: number, y: number){
        super("pawn", colour, x, y);            
        this.initialPosition = new Position(x, y);
    }
    
    public GetEnPassantMove(board: Board, history: Move[], log: boolean=true): Position | undefined{
        if (history.length === 0) {
            return undefined;
        }

        // Check if the last move was a two-square pawn advance by the opponent
        const lastOpponentMove = history[history.length - 1];
        if (lastOpponentMove.piece.colour === this.colour) {
            return undefined;
        }
        if (!(lastOpponentMove.piece instanceof Pawn)) {
            return undefined;
        }
        if (Math.abs(lastOpponentMove.oldPosition.row - lastOpponentMove.newPosition.row) !== 2) {
            return undefined;
        }

        // Check if the opponent's pawn is adjacent to the current pawn
        const opponentPawnPosition = lastOpponentMove.newPosition;
        if (opponentPawnPosition.row !== this.position.row) {
            return undefined;
        }
        if (Math.abs(opponentPawnPosition.col - this.position.col) !== 1) {
            return undefined;
        }

        // The en passant capture position is directly behind the opponent's pawn
        const enPassantRow = this.position.row + this.getCardinality();
        const enPassantCol = opponentPawnPosition.col;
        const enPassantPosition = new Position(enPassantRow, enPassantCol);

        // For sanity check it is empty (it should always be)
        if (board.pieces[enPassantPosition.row][enPassantPosition.col] !== undefined) {
            return undefined;
        }
        return enPassantPosition;
    }
    
    public getKillMoves(board: Board, history: Move[]): Map<string, Position>{
        const leftDiagonal: Position = new Position(this.position.row + this.getCardinality(), this.position.col - 1);
        const rightDiagonal: Position = new Position(this.position.row + this.getCardinality(), this.position.col + 1);

        let killMoves: Map<string, Position> = new Map<string, Position>();
        const leftDiagonalWithinBoard = Utils.isWithinBoard(leftDiagonal);
        const leftDiagonalContainsOpponentPiece = board.pieces[leftDiagonal.row][leftDiagonal.col] instanceof Piece;
        const leftDiagonalContainsOpponentColour = board.pieces[leftDiagonal.row][leftDiagonal.col]?.colour !== this.colour;
        if(leftDiagonalWithinBoard && leftDiagonalContainsOpponentPiece && leftDiagonalContainsOpponentColour){
            killMoves.set(leftDiagonal.key(), leftDiagonal);
        }

        const rightDiagonalWithinBoard = Utils.isWithinBoard(rightDiagonal);
        const rightDiagonalContainsOpponentPiece = board.pieces[rightDiagonal.row][rightDiagonal.col] instanceof Piece;
        const rightDiagonalContainsOpponentColour = board.pieces[rightDiagonal.row][rightDiagonal.col]?.colour !== this.colour;
        if(rightDiagonalWithinBoard && rightDiagonalContainsOpponentPiece && rightDiagonalContainsOpponentColour){
            killMoves.set(rightDiagonal.key(), rightDiagonal);
        }

        const enPassantMove = this.GetEnPassantMove(board, history);
        if(enPassantMove){
            killMoves.set(enPassantMove.key(), enPassantMove);
        }

        return killMoves;
    }
    
    public evaluateMoves(board: Board, history: Move[] = [], log: boolean = true): Map<string, Position>{
        const FIRST_MOVE: number = 2;
        const OTHER_MOVES: number = 1;

        const killMoves: Map<string, Position> = this.getKillMoves(board, history);
        
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
