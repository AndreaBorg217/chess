import GameController from "../controller";
import Piece from "../models/piece";
import Bishop from "../models/pieces/bishop";
import Knight from "../models/pieces/knight";
import Pawn from "../models/pieces/pawn";
import Queen from "../models/pieces/queen";
import Rook from "../models/pieces/rook";


function getSwappablePieces(pawnToSwap: Pawn): Piece[]{
    return [
        new Queen(pawnToSwap.colour, pawnToSwap.position.row, pawnToSwap.position.col),
        new Rook(pawnToSwap.colour, pawnToSwap.position.row, pawnToSwap.position.col),
        new Bishop(pawnToSwap.colour, pawnToSwap.position.row, pawnToSwap.position.col),
        new Knight(pawnToSwap.colour, pawnToSwap.position.row, pawnToSwap.position.col),
    ];
}

export default function PawnSwapModal({ controller }: { controller: GameController }){
    if(controller.swappablePawn === undefined){
        return null;
    }
    return(
        <div className="modal">
        <div className="modal-content">
          <h2>Choose a piece to swap your pawn with:</h2>
          <div className="piece-selection">
          {getSwappablePieces(controller.swappablePawn).map((piece: Piece) => (
            <img 
            key={piece.toString()} 
            src={piece.image} 
            alt={piece.name} 
            className="swappable-piece" 
            onClick={() => controller.handlePawnSwap(piece)}
            />
          ))}
          </div>
        </div>
        </div>
    );
}