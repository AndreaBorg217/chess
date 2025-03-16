import { ROWS, COLUMNS, Colour } from '../constants';
import Board from '../models/board';
import Position from '../models/position';


class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }

    public static switchColour(colour: Colour): Colour{
        return colour ===  Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }

    public static isLegalMove(p: Position, board: Board, colour: Colour): boolean{
        return Utils.isWithinBounds(p) &&(board.pieces[p.row][p.col] === undefined || board.pieces[p.row][p.col]?.colour !== colour)
    }
}

export default Utils;