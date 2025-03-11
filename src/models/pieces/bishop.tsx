import Piece from "../piece";
import Position from "../position";
import {Colour} from '../../constants'

class Bishop extends Piece{
    constructor(colour: Colour, x: number, y: number){
        super("bishop", colour, x, y);            
    }
    
    public evaluateMoves(): Map<string, Position>{
        return new Map<string, Position>();
    }
}

export default Bishop
