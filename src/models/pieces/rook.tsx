import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Board from "../board";
import MovementUtils from "../../utils/movement_utils";
import Move from "../move";

class Rook extends Piece {
    initialPosition: Position;

    constructor(colour: Colour, x: number, y: number) {
        super("rook", colour, x, y);
        this.initialPosition = new Position(x, y);
    }

    public evaluateMoves(
        board: Board,
        history: Move[],
        log: boolean = true
    ): Map<string, Position> {
        const moves = MovementUtils.slidePlus(this, board);
        if (log) {
            console.log(
                "Rook can move to: ",
                Array.from(moves.values())
                    .map((p) => p.toString())
                    .join(", ")
            );
        }
        return moves;
    }
}

export default Rook;
