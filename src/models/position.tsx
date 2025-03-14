class Position {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public equal(position: Position): boolean {
        return this.row === position.row && this.col === position.col;
    }

    public key(): string {
        return `${this.row}${this.col}`;
    }

    public toString(): string {
        return `(${this.row}, ${this.col})`;
    }
}

export default Position;