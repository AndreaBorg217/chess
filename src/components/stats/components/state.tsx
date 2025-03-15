import { Colour } from "../../../constants";
import { GameState } from "../../../constants";

function ColourStateContainer({ colour, gameStates }: { colour: Colour, gameStates: Map<Colour, GameState> }) {
    return (
        <div className='colour-state-container'>
            <img src={`/assets/images/pieces/${colour}/king.png`} />
            <div 
            className='colour-check-container' 
            style={{ backgroundColor: gameStates.get(colour) === GameState.CHECK ? 'green' : 'transparent' }}
            ></div>
            <div 
            className='colour-checkmate-container'
            style={{ backgroundColor: gameStates.get(colour) === GameState.CHECKMATE ? 'green' : 'transparent' }}
            ></div>
        </div>
    );
}


export default function State({ gameStates }: { gameStates: Map<Colour, GameState> }) {
    return (
        <div id="state-container">
            <ColourStateContainer colour={Colour.WHITE} gameStates={gameStates} />
            <div 
                id='stale-mate-container'
                style={{ 
                    backgroundColor: 
                    [Colour.WHITE, Colour.BLACK].some(colour => gameStates.get(colour) === GameState.STALEMATE) 
                    ? 'green' 
                    : 'transparent' 
                }}
            ></div>
            <ColourStateContainer colour={Colour.BLACK} gameStates={gameStates} />
        </div>
    );
}