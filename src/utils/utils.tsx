import { ROWS, COLUMNS } from '../constants';
import Position from '../models/position';
import Pawn from '../models/pieces/pawn';
import Piece from '../models/piece';
import Queen from '../models/pieces/queen';
import Rook from '../models/pieces/rook';
import Bishop from '../models/pieces/bishop';
import Knight from '../models/pieces/knight';

class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }
}

export default Utils;