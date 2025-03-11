import { useState } from 'react';
import './App.css';

import Board from './models/board'

function App() {
  const [board, setBoard] = useState<Board>(new Board());
  
    return (
    <div className="App">
      <header className="App-header">
        <div className="board">
          {board.pieces.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div 
                  key={`${rowIndex}${colIndex}`} 
                  className="tile" 
                  style={{backgroundColor: board.backgroundColours[rowIndex][colIndex]
                }}>
                  {cell && <img src={cell.image} alt={cell.name} className="piece" />}
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
