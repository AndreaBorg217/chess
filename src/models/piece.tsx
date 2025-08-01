import { Colour } from '../enums/colour';
import Position from './position'
import Board from './board'

abstract class Piece {
    name: string;
    image: string
    colour: Colour;
    position: Position;
    
    constructor(name: string, colour: Colour, x: number, y: number) {
        this.name = name;
        this.colour = colour;
        this.position = new Position(x, y);
        this.image = `/assets/images/pieces/${this.colour}/${this.name}.png`;
    }

    // to handle Pawn diagonal moves
    public getkillMoves(board: Board, log: boolean): Map<string, Position> {
        return this.evaluateMoves(board, log);
    }
    

    public toString(): string {
        return `${this.name}_${this.colour.charAt(0)}${this.position.toString()}`;
    }

    public getOpponentColour(): Colour {
        return this.colour === Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }
    
    abstract evaluateMoves(board: Board, log: boolean): Map<string, Position>;
}

export default Piece