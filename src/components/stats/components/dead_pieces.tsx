import { Colour } from "../../../enums/colour";
import Piece from "../../../models/piece";

function ColourDeadPieces({ deadPieces }: { deadPieces: Piece[] }) {
    return (
        <div className="colour-dead-pieces">
            {deadPieces.map((piece: Piece) => (
                <img
                    key={piece.currentPosition.key()}
                    src={piece.image}
                    alt={piece.name}
                    className="dead-piece"
                />
            ))}
        </div>
    );
}

export default function DeadPieces({
    deadPieces,
}: {
    deadPieces: Map<Colour, Piece[]>;
}) {
    return (
        <div id="dead-container">
            <div className="dead-pieces">
                <ColourDeadPieces
                    deadPieces={deadPieces.get(Colour.WHITE) || []}
                />
                <ColourDeadPieces
                    deadPieces={deadPieces.get(Colour.BLACK) || []}
                />
            </div>
        </div>
    );
}
