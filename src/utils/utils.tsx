import { ROWS, COLUMNS } from "../constants";
import { Colour } from "../enums/colour";
import Board from "../models/board";
import Position from "../models/position";

class Utils {
    public static isWithinBoard(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }

    public static switchColour(colour: Colour): Colour {
        return colour === Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }

    public static isLegalMove(
        p: Position,
        board: Board,
        colour: Colour
    ): boolean {
        if (!Utils.isWithinBoard(p)) {
            return false;
        }
        const targetCell = board.pieces[p.row][p.col];
        if (targetCell === undefined) {
            return true;
        }
        return targetCell.colour !== colour;
    }
}

export default Utils;
