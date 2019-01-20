let d = require('./dimension');
let Moves = require('./moves');
let coordService = require('../service/coordinateService.js');
let pieceService = require('../service/pieceService.js');

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
                //coords.push(new Coordinate(col, row));
				coords.push(coordService.newCoordinate(col,row));
            }
        }
        return coords;
    }

	//TODO rename to placePiece
    introducePiece(piece){
        this.activePiece = piece;
        for(let i = 0; i < this.activePiece.coveredCoords.length; i++){
            //this.coveredCoords.push(new Coordinate(this.activePiece.coveredCoords[i].X, this.activePiece.coveredCoords[i].Y));
			this.coveredCoords.push(
				coordService.newCoordinate(
					this.activePiece.coveredCoords[i].X,
					this.activePiece.coveredCoords[i].Y)
			);
        }
    }

    processForActivePiece(move){
        if (move === Moves.Right 
			&& 
			!this.activePieceOnEdge(Moves.Right)
			&&
			this.coordsAreClear(Moves.Right)
			)
		{
			let oldCoords = this.activePiece.coveredCoords;
			this.coveredCoords = this.coveredCoords.filter(function(cc){
				oldCoords.some(function(pcc){
					return pcc.X === cc.X && pcc.Y == cc.Y;
				});
			});
			this.activePiece = pieceService.processMove(move, this.activePiece);
			this.introducePiece(this.activePiece);
        }
		if (move === Moves.Left
			&&
			!this.activePieceOnEdge(Moves.Left)
			&&
			this.coordsAreClear(Moves.Left)
		){
			//TODO this is a function
			let oldCoords = this.activePiece.coveredCoords;
			this.coveredCoords = this.coveredCoords.filter(function(cc){
				oldCoords.some(function(pcc){
					return pcc.X === cc.X && pcc.Y == cc.Y;
				});
			});
			this.activePiece = pieceService.processMove(move, this.activePiece);
			this.introducePiece(this.activePiece);
		}
    }
	activePieceCoords(){
		return this.activePiece.coveredCoords;
	}
	coordsAreClear(move){
		let piece = this.activePiece;
		return !this.coveredCoords.some(function(cc){
			return pieceService.hasNeighbor(piece, move, cc);
		})
	}

	activePieceOnEdge(move){
		if (move === Moves.Right){
			return this.coveredCoords.some(function(cc){
				return cc.X === d.WIDTH-1;
			});
		}
		if (move === Moves.Left){
			return this.coveredCoords.some(function(cc){
				return cc.X === 0;
			})
		}
	}
	//TODO this is probably too powerful and needs to be private
	addCoveredCoords(coords){
		//TODO this really needs to be abstracted somehow
		for (let i = 0; i < coords.length; i++){
			if (!this.coveredCoords.some(function(cc){
				return cc.X === coords[i].X && cc.Y === coords[i].Y;
			})){
				this.coveredCoords.push(coords[i]);
			}

		}
	}
}

module.exports=Board;
