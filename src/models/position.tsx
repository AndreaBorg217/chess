class Position{
    col: number;
    row: number;
    
    constructor(col: number, row: number){
        this.col = col;
        this.row = row;
    }
    
    public equal(position: Position): boolean {
        return this.col === position.col && this.row === position.row;
    }
    
    public key(): string {
        return `${this.col}${this.row}`;
    }
}

export default Position