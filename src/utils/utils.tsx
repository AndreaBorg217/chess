import { ROWS, COLUMNS, Colour } from '../constants';
import Position from '../models/position';


class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }

    public static switchColour(colour: Colour): Colour{
        return colour ===  Colour.WHITE ? Colour.BLACK : Colour.WHITE;
    }
}

export default Utils;