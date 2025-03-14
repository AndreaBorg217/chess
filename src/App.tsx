import { useState, useEffect } from 'react';
import './App.css';

import Piece from './models/piece'
import Position from './models/position'
import GameController from './controller'

function App() {
  const [controller] = useState<GameController>(new GameController());
  const [_, setForceRender] = useState(0); // Dummy state to force re-render

  useEffect(() => {
    controller.setUpdateCallback(() => setForceRender(prev => prev + 1));
  }, [controller]);

    return (
    <div className="App">
      <header className="App-header">
        <div className="board">
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
      </header>
    </div>
  );
}

export default App;
