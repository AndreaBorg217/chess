import { Colour } from "../../../constants"

export default function Turn({ currentTurn }: { currentTurn: Colour }) {
    return(
        <div id="turn-container">
            {/* <h1>Turn:</h1> */}
            <img src={`/assets/images/pieces/${currentTurn}/king.png`} id="turn-piece"/>
        </div>
    );
    
}