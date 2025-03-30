import Piece from './models/piece';
import Position  from './models/position';
import Board from './models/board';
import { BOARD_MOVE, BOARD_KILL, ROWS, COLUMNS, LAST_ROW_MAP } from './constants';
import { Colour } from './enums/colour';
import {GameState} from './enums/game_state';
import King from './models/pieces/king';
import Pawn from './models/pieces/pawn';
import Rook from './models/pieces/rook';
import Utils from './utils/utils';

class GameController {
    board!: Board;
    selectedPiece: Piece | undefined;
    currentTurn: Colour = Colour.WHITE;
    deadPieces: Map<Colour, Piece[]> = new Map<Colour, Piece[]>();
    kingInCheck: Map<Colour, boolean> = new Map<Colour, boolean>();
    gameStates: Map<Colour, GameState> = new Map<Colour, GameState>();
    swappablePawn: Pawn | undefined;
    private updateUI?: () => void; 

    constructor() {
        this.init();
    }

    private init(): void {
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

    public setUpdateCallback(callback: () => void): void {
        this.updateUI = callback;
    }

    public handleClick(
        clickedPosition: Position,
        clickedCell: Piece | undefined, 
    ): void {
        if((this.board.clickable[clickedPosition.row][clickedPosition.col] === false) || (clickedCell === undefined && this.selectedPiece === undefined)) {
            return;
        } else if ((clickedCell === undefined || (clickedCell instanceof Piece && clickedCell.colour !== this.selectedPiece?.colour)) && this.selectedPiece instanceof Piece) {
            // check if clicked cell is a possible move
            let possibleMoves: Map<string, Position> = this.selectedPiece.evaluateMoves(this.board, false);

            // add castling moves
            if(this.selectedPiece instanceof King) {
                const king: King = this.selectedPiece as King;
                const rooks: Rook[] = this.board.getRooks(king.colour);
                possibleMoves = new Map([...possibleMoves, ...this.getCastleMoves(king, rooks)]);
            }

            const isPossibleMove = possibleMoves.has(clickedPosition.key());
            if (!isPossibleMove){
                return
            }

            // move piece
            const oldPosition: Position = this.selectedPiece.position;
            console.log("Moved", this.selectedPiece.name,"from", this.selectedPiece.position.toString(), "to", clickedPosition.toString());
            this.movePiece(oldPosition, clickedPosition);

            // if move is a castling move, move rook over king
            if(this.selectedPiece instanceof King && Math.abs(oldPosition.col - clickedPosition.col) === 2) {
                const newKingPosition: Position = clickedPosition;
                const kingMovementDirection: number = newKingPosition.col > oldPosition.col ? 1 : -1;
                const rookMovementDirection: number = kingMovementDirection * -1;

                // move rook
                const newRookPosition: Position = new Position(newKingPosition.row, newKingPosition.col + rookMovementDirection);
                const oldRookCol: number = newKingPosition.col + (kingMovementDirection * 2);
                // queen-side castle moves rook 3 places, king-side castle moves rook 2 places
                const adjustedRookCol: number = kingMovementDirection === 1 ? oldRookCol -1 : oldRookCol;
                const oldRookPosition: Position = new Position(newKingPosition.row, adjustedRookCol);
                this.movePiece(oldRookPosition, newRookPosition);
                console.log("Rook was castled from", oldRookPosition.toString(), "to", newRookPosition.toString());
            }
            
            // check if pawn reached last row
            this.getSwappablePawn();
            if (this.swappablePawn) {
                this.updateUI?.(); // to show the piece swap dialog
                return;
            }

            // check if piece was killed
            if (clickedCell instanceof Piece && clickedCell.colour === this.selectedPiece.getOpponentColour()) {
                console.log("Killed", clickedCell.toString());
                this.deadPieces.get(clickedCell.getOpponentColour())?.push(clickedCell);
            }

            // switch turn
            this.switchTurn();
        // selected another piece
        } else if (clickedCell instanceof Piece && clickedCell.colour === this.currentTurn) {
            if (this.selectedPiece) {
                this.board.setBoardColours();
            }
            // select piece
            console.log("Selected piece: ", clickedCell.toString());
            this.selectedPiece = clickedCell;
            
            // get possible moves
            let possibleMoves: Map<string, Position> = clickedCell.evaluateMoves(this.board, true);

            // add castling moves
            if(clickedCell instanceof King) {
                const king: King = clickedCell as King;
                const rooks: Rook[] = this.board.getRooks(king.colour);
                possibleMoves = new Map([...possibleMoves, ...this.getCastleMoves(king, rooks)]);
            }

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

    private getGameState(checkKingColour: Colour): GameState{
        // find king
        let king: King | undefined = this.board.getKing(checkKingColour);

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
        let opponentPossibleMoves = this.board.getOpponentKills(Utils.switchColour(checkKingColour));

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

    public handlePawnSwap(selectedPiece: Piece): void {
        this.board.pieces[this.swappablePawn!.position.row][this.swappablePawn!.position.col] = selectedPiece;
        this.switchTurn();
        this.updateUI?.();
    }

    private switchTurn(): void {
        // check game state
        this.gameStates.set(Colour.WHITE, this.getGameState(Colour.WHITE));
        this.gameStates.set(Colour.BLACK, this.getGameState(Colour.BLACK));
        // switch turn
        if (this.selectedPiece) {
            this.currentTurn = this.selectedPiece.getOpponentColour();
        }
        console.log("Switched turn to", this.currentTurn);
        this.swappablePawn = undefined;
        this.selectedPiece = undefined;
        console.log("Cleared selected piece");
        this.board.setBoardColours(); // reset board colours
    }

    private canCastle(king: King, rook: Rook): Position | undefined {

        // check if king is in check
        if(this.kingInCheck.get(king.colour)) {
            console.log("King is in check, cannot castle");
            return undefined;
        }

        // check if king moved
        if(king.hasMoved()) {
            console.log("King has moved, cannot castle");
            return undefined;
        }

        // check if rook moved
        if(rook.hasMoved()) {
            console.log("Rook has moved, cannot castle");
            return undefined;
        }
        

        // check if any pieces between king and rook
        const moveDirection = rook.position.col > king.position.col ? 1 : -1;
        let startCol = king.position.col + moveDirection;
        while(startCol !== rook.position.col) {
            if(this.board.pieces[king.position.row][startCol] instanceof Piece) {
                return undefined;
            }
            startCol += moveDirection;
        }

        // check if king will pass through check
        // get possible moves for all opponent pieces
        let opponentPossibleMoves = this.board.getOpponentKills(Utils.switchColour(king.colour));

        const kingCastleMoves: Map<string, Position> = new Map<string, Position>();
        let p: Position = new Position(king.position.row, king.position.col + (moveDirection * 2));
        kingCastleMoves.set(p.key(), p);
        p = new Position(king.position.row, king.position.col + (moveDirection * 1));
        kingCastleMoves.set(p.key(), p);
        const kingCastleMovesKeys: string[] = Array.from(kingCastleMoves.keys());
        const opponentPossibleMovesKeys: string[] = Array.from(opponentPossibleMoves.keys());
        if(kingCastleMovesKeys.every(move => opponentPossibleMovesKeys.includes(move))) {
            console.log("King will pass over/onto check position, cannot castle");
            return undefined;
        }

        console.log("Can castle");
        return new Position(king.position.row, king.position.col + (moveDirection * 2));
    }

    private movePiece(oldPosition: Position, newPosition: Position): void {
        this.board.pieces[newPosition.row][newPosition.col] = this.board.pieces[oldPosition.row][oldPosition.col];
        this.board.pieces[oldPosition.row][oldPosition.col] = undefined;
        this.board.pieces[newPosition.row][newPosition.col]!.position = newPosition;
    }

    private getCastleMoves(king: King, rooks: Rook[]): Map<string, Position> {
        let castleMoves: Map<string, Position> = new Map<string, Position>();

        for (let rook of rooks) {
            const castlePosition = this.canCastle(king, rook);
            if(castlePosition) {
                castleMoves.set(castlePosition.key(), castlePosition);
            }
        }

        return castleMoves;
    }

    public restartGame(): void {
        this.init();
        this.updateUI?.();
        console.log("Game restarted");
    }
}
export default GameController;