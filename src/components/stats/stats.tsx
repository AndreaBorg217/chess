import GameController from "../../controller";
import Turn from "./components/turn";
import State from "./components/state";
import DeadPieces from "./components/dead_pieces";

export function Stats({ controller }: { controller: GameController }) {
    return (
        <div id="stats-container">
            <Turn controller={controller} />
            <State gameStates={controller.gameStates} />
            <DeadPieces deadPieces={controller.deadPieces} />
        </div>
    );
}
