import Piece from './models/piece';
import Position  from './models/position';
import Board from './models/board';
import { Colour, BOARD_MOVE, BOARD_KILL, GameState, ROWS, COLUMNS, LAST_ROW_MAP } from './constants';
import King from './models/pieces/king';
import Pawn from './models/pieces/pawn';

class GameController {
    board: Board;
    selectedPiece: Piece | undefined;
    currentTurn: Colour = Colour.WHITE;
    deadPieces: Map<Colour, Piece[]> = new Map<Colour, Piece[]>();
    kingInCheck: Map<Colour, boolean> = new Map<Colour, boolean>();
    gameStates: Map<Colour, GameState> = new Map<Colour, GameState>();
    swappablePawn: Pawn | undefined;
    private updateUI?: () => void; 

    constructor() {
        this.board = new Board();
        this.selectedPiece = undefined;
        this.deadPieces.set(Colour.WHITE, []);
        this.deadPieces.set(Colour.BLACK, []);
        this.kingInCheck.set(Colour.WHITE, false);
        this.kingInCheck.set(Colour.BLACK, false);
        this.gameStates.set(Colour.WHITE, GameState.PLAY);
        this.gameStates.set(Colour.BLACK, GameState.PLAY);
        this.swappablePawn = undefined;
    }

    public setUpdateCallback(callback: () => void) {
        this.updateUI = callback;
    }

    public handleClick(
        clickedPosition: Position,
        clickedCell: Piece | undefined, 
    ) {
        if(this.board.clickable[clickedPosition.row][clickedPosition.col] === false) {
            return;
        }
        if (clickedCell === undefined && this.selectedPiece === undefined) {
            console.log("Clicked on an empty cell", clickedPosition ,"No piece selected.");
            return;
        } else if ((clickedCell === undefined || (clickedCell instanceof Piece && clickedCell.colour === this.getOpponentColour())) && this.selectedPiece instanceof Piece) {
            // check if clicked cell is a possible move
            const possibleMoves: Map<string, Position> = this.selectedPiece.evaluateMoves(this.board, false);
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
            console.log("Moved", this.selectedPiece.name,"from", this.selectedPiece.position.toString(), "to", clickedPosition.toString());
            this.board.pieces[clickedPosition.row][clickedPosition.col] = this.selectedPiece;
            this.board.pieces[this.selectedPiece.position.row][this.selectedPiece.position.col] = undefined;
            this.board.pieces[clickedPosition.row][clickedPosition.col]!.position = clickedPosition;
            
            // check if pawn reached last row
            this.getSwappablePawn();
            if (this.swappablePawn) {
                this.updateUI?.(); // to show the piece swap dialog
                return;
            }

            // check if piece was killed
            if (clickedCell instanceof Piece && clickedCell.colour === this.getOpponentColour()) {
                console.log("Killed", clickedCell.toString());
                this.deadPieces.get(this.getOpponentColour())?.push(clickedCell);
            }

            // switch turn
            this.switchTurn();
            
            // check if piece was killed
            if (clickedCell instanceof Piece && clickedCell.colour === this.getOpponentColour()) {
                console.log("Killed", clickedCell.toString());
                this.deadPieces.get(this.getOpponentColour())?.push(clickedCell);

            }
        } else if (clickedCell instanceof Piece && clickedCell.colour === this.currentTurn) {
            if (this.selectedPiece) {
                this.board.setBoardColours();
            }
            // select piece
            console.log("Selected piece: ", clickedCell.toString());
            this.selectedPiece = clickedCell;
            // get possible moves
            const possibleMoves: Map<string, Position> = clickedCell.evaluateMoves(this.board, true);
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

    private getGameState(checkKingColour: Colour): GameState{
        // find king
        let king: Piece | undefined = undefined;
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.board.pieces[row][col] instanceof King && this.board.pieces[row][col]?.colour === checkKingColour) {
                    king = this.board.pieces[row][col];
                    break;
                }
            } 
        }

        if (king === undefined) {
            console.log(`${checkKingColour} king is in CHECKMATE`);
            return GameState.CHECKMATE;
        }

        // get king's possible moves
        const kingPossibleMoves: Map<string, Position> = king!.evaluateMoves(this.board, false);

        // get kill moves for king's colour
        let kingPiecesCanKill: Map<string, Position> = new Map<string, Position>();
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.board.pieces[row][col] instanceof Piece && this.board.pieces[row][col]?.colour === checkKingColour) {
                const piece: Piece = this.board.pieces[row][col]!;
                const moves: Map<string, Position> = piece.getkillMoves(this.board, false);
                kingPiecesCanKill = new Map([...kingPiecesCanKill, ...moves]);
                }
            }
        }
        
        // get possible moves for all opponent pieces
        let opponentPossibleMoves: Map<string, Position> = new Map<string, Position>();
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.board.pieces[row][col] instanceof Piece && this.board.pieces[row][col]?.colour !== checkKingColour) {
                    const piece: Piece = this.board.pieces[row][col]!;
                    const moves: Map<string, Position> = piece.getkillMoves(this.board, false);
                    opponentPossibleMoves = new Map([...opponentPossibleMoves, ...moves]);
                }
            }
        }

        // filter out opponent moves that king's pieces can kill
        for (let key of kingPiecesCanKill.keys()) {
            opponentPossibleMoves.delete(key);
        }
        
        let kingPossibleMovesKeys: string[] = Array.from(kingPossibleMoves.keys());
        let opponentPossibleMovesKeys: string[] = Array.from(opponentPossibleMoves.keys());

        const kingCurrentPositionKey: Position = king!.position;  
        const kingCurrentPositionInOpponentMoves: boolean = opponentPossibleMovesKeys.includes(kingCurrentPositionKey.key());
        const allKingMovesInOpponentMoves: boolean = kingPossibleMovesKeys.every(move => opponentPossibleMovesKeys.includes(move));
        // if king current position is not in check && all king moves are in opponent moves -> stalemate
        if (!this.kingInCheck.get(checkKingColour) && ((kingPossibleMovesKeys.length > 0 && allKingMovesInOpponentMoves) || (kingPossibleMovesKeys.length === 0 && kingCurrentPositionInOpponentMoves))) {
            console.log("Game is in STALEMATE");
            this.board.disableBoard();
            return GameState.STALEMATE;
        }
        // if king already in check && all king moves are in opponent moves -> checkmate
        if (this.kingInCheck.get(checkKingColour) && allKingMovesInOpponentMoves) {
            // mark opponent moves in red
            for (let key of opponentPossibleMovesKeys) {
                const position: Position = opponentPossibleMoves.get(key)!;
                this.board.backgroundColours[position.row][position.col] = BOARD_KILL;
            }
            console.log(`${checkKingColour} king is in CHECKMATE`);
            this.board.disableBoard();
            return GameState.CHECKMATE
        }
        // if king current position is in opponent moves -> check
        // let kingOpponentMovesIntersection: string[] = kingPossibleMovesKeys.filter(move => opponentPossibleMovesKeys.includes(move));
        if(kingCurrentPositionInOpponentMoves) {
            console.log(`${checkKingColour} king is in CHECK`);
            this.kingInCheck.set(checkKingColour, true);
            return GameState.CHECK;
        }
        this.kingInCheck.set(checkKingColour, false);
        return GameState.PLAY;
    }

    private getSwappablePawn(): void {
        const lastRowIndex = LAST_ROW_MAP.get(this.currentTurn);

        for (let col = 0; col < COLUMNS; col++) {
            if (this.board.pieces[lastRowIndex!][col] instanceof Pawn && this.board.pieces[lastRowIndex!][col]?.colour === this.currentTurn) {
                console.log("Found swappable pawn", this.board.pieces[lastRowIndex!][col]?.toString());
                this.swappablePawn = this.board.pieces[lastRowIndex!][col] as Pawn;
            }
        }
    }

    public handlePawnSwap(selectedPiece: Piece) {
        this.board.pieces[this.swappablePawn!.position.row][this.swappablePawn!.position.col] = selectedPiece;
        this.switchTurn();
        this.updateUI?.();
    }

    private switchTurn() {
        // check game state
        this.gameStates.set(Colour.WHITE, this.getGameState(Colour.WHITE));
        this.gameStates.set(Colour.BLACK, this.getGameState(Colour.BLACK));
        // switch turn
        this.currentTurn = this.getOpponentColour();
        console.log("Switched turn to", this.currentTurn);
        this.swappablePawn = undefined;
        this.selectedPiece = undefined;
        console.log("Cleared selected piece");
        this.board.setBoardColours(); // reset board colours
    }

}
export default GameController;