import GameController from '../controller';
import Piece from '../models/piece';
import Position from '../models/position';


export default function Board({ controller }: { controller: GameController }){
    return(
        <div id="board">
        {controller?.board.pieces.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
            <div 
            key={`${rowIndex}${colIndex}`}
            onClick={() => controller.handleClick(new Position(rowIndex, colIndex), cell)} 
            className="tile" 
            style={{backgroundColor: controller.board.backgroundColours[rowIndex][colIndex]
            }}>
            {cell instanceof Piece && <img src={cell.image} alt={cell.name} className="piece" />}
            </div>
            ))}
        </div>
        ))}
        </div>
    );
}