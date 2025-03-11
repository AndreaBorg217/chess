import Piece from "./models/piece";
import Knight from "./models/pieces/knight";
import Rook from "./models/pieces/rook";
import Bishop from "./models/pieces/bishop";
import Queen from "./models/pieces/queen";
import King from "./models/pieces/king";
import Pawn from "./models/pieces/pawn";

export enum Colour {
    BLACK = "black",
    WHITE = "white",
};

export const ROWS: number = 8;
export const COLUMNS: number = 8;

export const INITIAL_PIECES: Map<string, Piece> = new Map<string, Piece>([
    ["00", new Rook(Colour.BLACK, 0, 0)],
    ["01", new Knight(Colour.BLACK, 0, 1)],
    ["02", new Bishop(Colour.BLACK, 0, 2)],
    ["03", new Queen(Colour.BLACK, 0, 3)],
    ["04", new King(Colour.BLACK, 0, 4)],
    ["05", new Bishop(Colour.BLACK, 0, 5)],
    ["06", new Knight(Colour.BLACK, 0, 6)],
    ["07", new Rook(Colour.BLACK, 0, 7)],
    ["10", new Pawn(Colour.BLACK, 1, 0)],
    ["11", new Pawn(Colour.BLACK, 1, 1)],
    ["12", new Pawn(Colour.BLACK, 1, 2)],
    ["13", new Pawn(Colour.BLACK, 1, 3)],
    ["14", new Pawn(Colour.BLACK, 1, 4)],
    ["15", new Pawn(Colour.BLACK, 1, 5)],
    ["16", new Pawn(Colour.BLACK, 1, 6)],
    ["17", new Pawn(Colour.BLACK, 1, 7)],
    ["70", new Rook(Colour.WHITE, 7, 0)],
    ["71", new Knight(Colour.WHITE, 7, 1)],
    ["72", new Bishop(Colour.WHITE, 7, 2)],
    ["73", new Queen(Colour.WHITE, 7, 3)],
    ["74", new King(Colour.WHITE, 7, 4)],
    ["75", new Bishop(Colour.WHITE, 7, 5)],
    ["76", new Knight(Colour.WHITE, 7, 6)],
    ["77", new Rook(Colour.WHITE, 7, 7)],
    ["60", new Pawn(Colour.WHITE, 6, 0)],
    ["61", new Pawn(Colour.WHITE, 6, 1)],
    ["62", new Pawn(Colour.WHITE, 6, 2)],
    ["63", new Pawn(Colour.WHITE, 6, 3)],
    ["64", new Pawn(Colour.WHITE, 6, 4)],
    ["65", new Pawn(Colour.WHITE, 6, 5)],
    ["66", new Pawn(Colour.WHITE, 6, 6)],
    ["67", new Pawn(Colour.WHITE,6, 7)],
]);

export const BOARD_GREEN: string = "#769656";
export const BOARD_WHITE: string = "#ded4c0";