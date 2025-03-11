import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'

class Rook extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("rook", colour, x, y);            
    }
    
    public evaluateMoves(): Map<string, Position>{
        return new Map<string, Position>();
    }
}

export default Rook
