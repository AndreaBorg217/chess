import Piece from "./piece";
import {ROWS, COLUMNS, INITIAL_PIECES, BOARD_GREEN, BOARD_WHITE} from "../constants";
import { Colour } from "../enums/colour";
import Rook from "./pieces/rook";
import King from "./pieces/king";
import Position from "./position";

class Board{
	pieces: (Piece | undefined)[][];
	backgroundColours: string[][];
    clickable: boolean [][];

	constructor(){
        this.pieces = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(undefined));
        this.backgroundColours = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(""));
        this.clickable = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(true));
        
        this.setInitialPieces();
        this.setBoardColours();
	}
	
    public printBoard(): void{
        this.pieces.forEach(row => {
        console.log(row.map(piece => piece ? `${piece.name.toUpperCase()}_${piece.colour.charAt(0)}` : "[]").join("\t"));
        });
    }

    public setBoardColours(): void{
        for(let row = 0; row < ROWS; row ++){
            for(let col = 0; col < COLUMNS; col ++){
                this.backgroundColours[row][col] = (row + col) % 2 === 0 ? BOARD_GREEN : BOARD_WHITE;
            }
        }
    }

    public setInitialPieces(): void{
        for(let row = 0; row < ROWS; row ++){
            for(let col = 0; col < COLUMNS; col ++){
                const stringCoordinate = `${row}${col}`;
                this.pieces[row][col] = INITIAL_PIECES.get(stringCoordinate); 
            }
        }
    }

    public disableBoard(): void{
        this.clickable = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(false));
    }

    public getKing(colour: Colour): King | undefined {
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.pieces[row][col] instanceof King && this.pieces[row][col]?.colour === colour) {
                    return this.pieces[row][col] as King;
                }
            } 
        }
        return undefined;
    }

    public getRooks(colour: Colour): Rook[] {
        let rooks: Rook[] = [];
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.pieces[row][col] instanceof Rook && this.pieces[row][col]?.colour === colour) {
                    rooks.push(this.pieces[row][col] as Rook);
                }
            }
        }
        return rooks;
    }

    public getOpponentKills(colour: Colour): Map<string, Position> {
        let opponentPossibleMoves: Map<string, Position> = new Map<string, Position>();
        for(let row = 0; row < ROWS; row++) {
            for(let col = 0; col < COLUMNS; col++) {
                if(this.pieces[row][col] instanceof Piece && this.pieces[row][col]?.colour === colour) {
                    const piece: Piece = this.pieces[row][col]!;
                    const moves: Map<string, Position> = piece.getkillMoves(this, false);
                    opponentPossibleMoves = new Map([...opponentPossibleMoves, ...moves]);
                }
            }
        }
        return opponentPossibleMoves;
    }
}

export default Board