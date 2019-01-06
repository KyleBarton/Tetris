let d = require('./dimension');
let Coordinate = require('./coordinate');
let Moves = require('./moves');

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

	//TODO rename to placePiece
    introducePiece(piece){
        this.activePiece = piece;
        for(let i = 0; i < this.activePiece.coveredCoords.length; i++){
            this.coveredCoords.push(new Coordinate(this.activePiece.coveredCoords[i].X, this.activePiece.coveredCoords[i].Y));
        }
    }

    processForActivePiece(move){
        if (move === Moves.Right && !this.activePieceOnEdge(Moves.Right)){
			let oldCoords = this.activePiece.coveredCoords;
			this.coveredCoords = this.coveredCoords.filter(function(cc){
				oldCoords.some(function(pcc){
					return pcc.X === cc.X && pcc.Y == cc.Y;
				});
			});
            this.activePiece.move(move)
			this.introducePiece(this.activePiece);
        }
    }

	activePieceOnEdge(move){
		if (move === Moves.Right){
			return this.coveredCoords.some(function(cc){
				return cc.X === d.WIDTH-1;
			});
		}
	}
}

module.exports=Board;
