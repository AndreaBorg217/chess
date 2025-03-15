import { useState, useEffect } from 'react';
import './App.css';

import Piece from './models/piece'
import GameController from './controller'
import { Colour } from './constants'
import {GameState} from './constants'
import PawnSwapModal from './components/pawn_swap_modal';
import Board from './components/board';
import { Stats } from './components/stats/stats';

function App() {
  const [controller] = useState<GameController>(new GameController());
  const [_, setForceRender] = useState(0); // Dummy state to force re-render

  useEffect(() => {
    controller.setUpdateCallback(() => setForceRender(prev => prev + 1));
  }, [controller]);

    return (
    <div className="App">
      <Board controller={controller}/>
      <Stats controller={controller}/>
      <PawnSwapModal controller={controller}/>
    </div>
  );
}

export default App;
