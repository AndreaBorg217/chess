import Position from "./position";
import Piece from "./piece";

class Move {
    oldPosition: Position;
    newPosition: Position;
    piece: Piece;
    kill: boolean = false;
    castle: boolean = false;
    pawnPromoted: boolean = false;

    constructor(piece: Piece, oldPosition: Position, newPosition: Position) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
        this.piece = piece;
    }
}

export default Move;