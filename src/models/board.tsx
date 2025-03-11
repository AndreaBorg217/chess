import Piece from "./piece";
import {ROWS, COLUMNS, INITIAL_PIECES, BOARD_GREEN, BOARD_WHITE} from "../constants";

class Board{
	pieces: (Piece | undefined)[][];
	backgroundColours: string[][];

	constructor(){
        this.pieces = [];
        this.backgroundColours = [];
        
        for(let row = 0; row < ROWS; row ++){
            this.pieces[row] = [];
            this.backgroundColours[row] = [];
            for(let col = 0; col < COLUMNS; col ++){
                const stringCoordinate = `${row}${col}`;
                this.pieces[row][col] = INITIAL_PIECES.get(stringCoordinate); 

                this.backgroundColours[row][col] = (row + col) % 2 === 0 ? BOARD_GREEN : BOARD_WHITE;
            }
        }
	}
	
    public printBoard(): void{
        this.pieces.forEach(row => {
        console.log(row.map(piece => piece ? `${piece.name.toUpperCase()}_${piece.colour.charAt(0)}` : "[]").join("\t"));
        });
    }
}

export default Board