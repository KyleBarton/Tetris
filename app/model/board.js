let d = require('./dimension');
let Coordinate = require('./coordinate');

class Board {
    constructor(){}
    startNew(){
        this.coveredCoords = [];
        this.columns = d.WIDTH;
        this.rows = d.HEIGHT;
        this.coordinates = this.initCoords(this.rows, this.columns);
        return this;
    }
    initCoords(rows, columns){
        let coords = [];
        for (let row = 0; row < rows; row++){
            for (let col = 0; col < columns; col++){
                coords.push(new Coordinate(col, row));
            }
        }
        return coords;
    }
    introducePiece(piece){
        this.activePiece = piece;
        for(let i = 0; i < this.activePiece.coveredCoords.length; i++){
            // console.log(`yo, ${coord}`);
            this.coveredCoords.push(this.activePiece.coveredCoords[i]);;
        }
    }
}

module.exports=Board;