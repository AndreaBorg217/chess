import { ROWS, COLUMNS } from '../constants';
import Position from '../models/position';
import Board from '../models/board';
import Piece from '../models/piece';

class Utils{

    public static isWithinBounds(p: Position): boolean {
        return p.row >= 0 && p.row < ROWS && p.col >= 0 && p.col < COLUMNS;
    }

    public static isLegalMove(piece: Piece, newPosition: Position, board: Board): boolean{
        let newPositionOnBoard = board.pieces[newPosition.row][newPosition.col];
        return this.isWithinBounds(newPosition) && (newPositionOnBoard === undefined || newPositionOnBoard.colour !== piece.colour);
    }
}

export default Utils;