import { Colour } from "../enums/colour";
import Position from "./position";
import Board from "./board";
import Move from "./move";

abstract class Piece {
    name: string;
    image: string;
    colour: Colour;
    initialPosition: Position;
    currentPosition: Position;

    constructor(name: string, colour: Colour, x: number, y: number) {
        this.name = name;
        this.colour = colour;
        this.initialPosition = new Position(x, y);
        this.currentPosition = new Position(x, y);
        this.image = `/assets/images/pieces/${this.colour}/${this.name}.png`;
    }

    // to handle Pawn diagonal moves
    public getKillMoves(
        board: Board,
        history: Move[],
        log: boolean
    ): Map<string, Position> {
        return this.evaluateMoves(board, history, log);
    }

    public toString(): string {
        return `${this.name}_${this.colour.charAt(0)}${this.currentPosition.toString()}`;
    }

    public getOpponentColour(): Colour {
        return this.colour === Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }

    public hasMoved(): boolean {
        return !this.currentPosition.isEqual(this.initialPosition);
    }

    abstract evaluateMoves(
        board: Board,
        history: Move[],
        log: boolean
    ): Map<string, Position>;
}

export default Piece;
