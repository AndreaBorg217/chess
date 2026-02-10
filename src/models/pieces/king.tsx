import Piece from "../piece";
import Position from "../position";
import { Colour } from "../../enums/colour";
import Utils from "../../utils/utils";
import Board from "../board";
import Move from "../move";
import Rook from "./rook";

class King extends Piece {
    initialPosition: Position;
    constructor(colour: Colour, x: number, y: number) {
        super("king", colour, x, y);
        this.initialPosition = new Position(x, y);
    }

    public evaluateMoves(
        board: Board,
        history: Move[],
        log: boolean = true
    ): Map<string, Position> {
        const moves: Map<string, Position> = new Map<string, Position>();
        const directions = [
            { row: 1, col: -1 }, // up left
            { row: 1, col: 1 }, // up right
            { row: -1, col: -1 }, // down left
            { row: -1, col: 1 }, // down right
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
        ];

        directions.forEach((direction) => {
            const p = new Position(
                this.currentPosition.row + direction.row,
                this.currentPosition.col + direction.col
            );
            if (Utils.isLegalMove(p, board, this.colour)) {
                moves.set(p.key(), p);
            }
        });

        if (log) {
            console.log(
                "King can move to: ",
                Array.from(moves.values())
                    .map((p) => p.toString())
                    .join(", ")
            );
        }
        return moves;
    }

    public getCastlingPosition(
        board: Board,
        rook: Rook,
        isInCheck: boolean
    ): Position | undefined {
        // check if king moved
        if (this.hasMoved()) {
            console.log("King has moved, cannot castle");
            return undefined;
        }

        // check if rook moved
        if (rook.hasMoved()) {
            console.log("Rook has moved, cannot castle");
            return undefined;
        }

        // check if king is in check
        if (isInCheck) {
            console.log("King is in check, cannot castle");
            return undefined;
        }

        // check if any pieces between king and rook
        const moveDirection =
            rook.currentPosition.col > this.currentPosition.col ? 1 : -1;
        let startCol = this.currentPosition.col + moveDirection;
        while (startCol !== rook.currentPosition.col) {
            if (
                board.pieces[this.currentPosition.row][startCol] instanceof
                Piece
            ) {
                return undefined;
            }
            startCol += moveDirection;
        }

        // check if king will pass through check
        // get possible moves for all opponent pieces
        let opponentPossibleMoves = board.getOpponentKills(
            Utils.switchColour(this.colour),
            []
        );

        const kingCastleMoves: Map<string, Position> = new Map<
            string,
            Position
        >();
        let p: Position = new Position(
            this.currentPosition.row,
            this.currentPosition.col + moveDirection * 2
        );
        kingCastleMoves.set(p.key(), p);
        p = new Position(
            this.currentPosition.row,
            this.currentPosition.col + moveDirection * 1
        );
        kingCastleMoves.set(p.key(), p);
        const kingCastleMovesKeys: string[] = Array.from(
            kingCastleMoves.keys()
        );
        const opponentPossibleMovesKeys: string[] = Array.from(
            opponentPossibleMoves.keys()
        );
        if (
            kingCastleMovesKeys.every((move) =>
                opponentPossibleMovesKeys.includes(move)
            )
        ) {
            console.log(
                "King will pass over/onto check position, cannot castle"
            );
            return undefined;
        }

        console.log("Can castle");
        return new Position(
            this.currentPosition.row,
            this.currentPosition.col + moveDirection * 2
        );
    }

    public getCastlingMoves(
        board: Board,
        isInCheck: boolean
    ): Map<string, Position> {
        let castleMoves: Map<string, Position> = new Map<string, Position>();

        const rooks: Rook[] = board.getRooks(this.colour);

        for (let rook of rooks) {
            const castlePosition = this.getCastlingPosition(
                board,
                rook,
                isInCheck
            );
            if (castlePosition) {
                castleMoves.set(castlePosition.key(), castlePosition);
            }
        }

        return castleMoves;
    }
}

export default King;
