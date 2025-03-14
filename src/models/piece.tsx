import {Colour} from '../constants'
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
    public killMoves(board: Board): Map<string, Position> {
        return this.evaluateMoves(board);
    }
    

    public toString(): string {
        return `${this.name}_${this.colour.charAt(0)}${this.position.toString()}`;
    }
    
    abstract evaluateMoves(board: Board): Map<string, Position>;
}

export default Piece