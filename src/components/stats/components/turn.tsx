import GameController from "../../../controller";
import { GameState } from "../../../enums/game_state";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function Turn({ controller }: { controller: GameController }) {
    return (
        <div id="turn-container">
            {Array.from(controller.gameStates.values()).some(
                (state) =>
                    state === GameState.CHECKMATE ||
                    state === GameState.STALEMATE
            ) ? (
                <button
                    id="restart-button"
                    onClick={() => controller.restartGame()}
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                </button>
            ) : (
                <img
                    src={`/assets/images/pieces/${controller.currentTurn}/king.png`}
                    id="turn-piece"
                />
            )}
        </div>
    );
}
