import exp from 'constants';
import { ROWS, COLUMNS } from '../constants';
import Position from '../models/position';

class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }
}

export default Utils;