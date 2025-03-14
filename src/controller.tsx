import Piece from './models/piece';
import Position  from './models/position';
import Board from './models/board';
import { Colour, BOARD_MOVE, BOARD_KILL } from './constants';

class GameController {
    board: Board;
    selectedPiece: Piece | undefined;
    currentTurn: Colour = Colour.WHITE;
    deadPieces: Map<Colour, Piece[]> = new Map<Colour, Piece[]>();
    private updateUI?: () => void; 

    constructor() {
        this.board = new Board();
        this.selectedPiece = undefined;
        this.deadPieces.set(Colour.WHITE, []);
        this.deadPieces.set(Colour.BLACK, []);
    }

    public setUpdateCallback(callback: () => void) {
        this.updateUI = callback;
    }

    public handleClick(
        clickedPosition: Position,
        clickedCell: Piece | undefined, 
    ) {
        if (clickedCell === undefined && this.selectedPiece === undefined) {
            console.log("Clicked on an empty cell", clickedPosition ,"No piece selected.");
            return;
        } else if ((clickedCell === undefined || (clickedCell instanceof Piece && clickedCell.colour === this.getOpponentColour())) && this.selectedPiece instanceof Piece) {
            // check if clicked cell is a possible move
            const possibleMoves: Map<string, Position> = this.selectedPiece.evaluateMoves(this.board);
            let isPossibleMove = false;
            for (let [key, position] of possibleMoves) {
                if (position.key() === clickedPosition.key()) {
                    isPossibleMove = true;
                    break;
                }
            }
            if (!isPossibleMove){
                return
            }
            // move piece
            console.log("Moved", this.selectedPiece.name,"from", this.selectedPiece.position, "to", clickedPosition);
            this.board.pieces[clickedPosition.row][clickedPosition.col] = this.selectedPiece;
            this.board.pieces[this.selectedPiece.position.row][this.selectedPiece.position.col] = undefined;
            this.board.pieces[clickedPosition.row][clickedPosition.col]!.position = clickedPosition;
            // check if piece was killed
            if (clickedCell instanceof Piece && clickedCell.colour === this.getOpponentColour()) {
                console.log("Killed", clickedCell.toString());
                this.deadPieces.get(this.getOpponentColour())?.push(clickedCell);

            }
            // clear selected pieces
            this.selectedPiece = undefined;
            console.log("Cleared selectedPiece");
            // reset background colours
            this.board.setBoardColours();
            // switch turn
            this.currentTurn = this.getOpponentColour();
            console.log("Switched turn to", this.currentTurn);
        } else if (clickedCell instanceof Piece && clickedCell.colour === this.currentTurn) {
            if (this.selectedPiece) {
                this.board.setBoardColours();
            }
            // select piece
            console.log("Selected piece: ", clickedCell.toString());
            this.selectedPiece = clickedCell;
            // get possible moves
            const possibleMoves: Map<string, Position> = clickedCell.evaluateMoves(this.board);
            // mark cells with possible moves for selected piece
            for (let [key, position] of possibleMoves) {
                if (this.board.pieces[position.row][position.col] === undefined) {
                    this.board.backgroundColours[position.row][position.col] = BOARD_MOVE;
                    console.log("Marked cell", position.toString(), "as possible move");
                }
                else {
                    this.board.backgroundColours[position.row][position.col] = BOARD_KILL;
                    console.log("Marked cell", position.toString(), "as possible kill");
                }
            }
        }
        this.updateUI?.();
    }

    private getOpponentColour(): Colour {
        return this.currentTurn === Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }


}
export default GameController;