import { ROWS, COLUMNS } from './constants';
import Position from './models/position';

export class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }

}
