import { useState, useEffect } from 'react';
import './App.css';

import Piece from './models/piece'
import Position from './models/position'
import GameController from './controller'
import { Colour } from './constants'
import Utils from './utils/utils'

function App() {
  const [controller] = useState<GameController>(new GameController());
  const [_, setForceRender] = useState(0); // Dummy state to force re-render

  useEffect(() => {
    controller.setUpdateCallback(() => setForceRender(prev => prev + 1));
  }, [controller]);

    return (
    <div className="App">
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

      <div id="stats-container">
        <div id="turn-container">
        <h1>Turn:</h1>
        <img src={`/assets/images/pieces/${controller.currentTurn}/king.png`} id="turn-piece"/>
        </div>
        <div id="dead-container">
        <div className="dead-pieces">
          <div className='colour-dead-pieces'>
          {controller.deadPieces.get(Colour.WHITE)?.map((piece: Piece) => (
            <img key={piece.toString()} src={piece.image} alt={piece.name} className="dead-piece"/>
          ))}
          <br/>
          </div>
          <div className='colour-dead-pieces'>
          {controller.deadPieces.get(Colour.BLACK)?.map((piece: Piece) => (
            <img key={piece.toString()} src={piece.image} alt={piece.name} className="dead-piece"/>
          ))}
          </div>
          
        </div>
        </div>
      </div>

      {controller.swappablePawn !== undefined && (
        <div className="modal">
        <div className="modal-content">
          <h2>Choose a piece to swap your pawn with:</h2>
          <div className="piece-selection">
          {Utils.getSwappablePieces(controller.swappablePawn).map((piece: Piece) => (
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
      )}
    </div>
  );
}

export default App;
