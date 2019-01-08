let pTypes = require('./pieceType');
let Coordinate = require('./coordinate');
let Moves = require('./moves');

class Piece {
    constructor(pType){
        this.pType = pType;
        //Decide initial covered tiles based on pType
    }
    newPosition(){
        if (this.pType === pTypes.Cube){
            this.coveredCoords = [
                new Coordinate(4, 19),
                new Coordinate(4, 18),
                new Coordinate(5, 19),
                new Coordinate(5, 18)
            ]
        } 
        else {
            throw new Error('Only cube piece type is supported currently');
        }
        return this;
    }
	hasNeighbor(move, coord){
		if (this.pType === pTypes.Cube){
			if (move === Moves.Right){
				let sorted = this.coveredCoords.sort(function(a, b){
					return b.X - a.X;
				});
				//ew. Ew ew ew
				let rightMostCoords = [sorted[0], sorted[1]];
				let rightNeighbors = rightMostCoords.map(function(cc){
						return new Coordinate(cc.X+1, cc.Y);
				});
				return rightNeighbors.some(function(cc){
					return cc.X === coord.X && cc.Y == coord.Y;
				})
			}
		}
	}
	move(move){
		if (move === Moves.Right){
			this.coveredCoords = this.coveredCoords.map(function(cc){
				cc.X++;
				return cc;
			});
		}
	}

}

module.exports=Piece;


// Piece = {
//     Type :: PieceType,
//     Locus :: Coordinate,
//     CoveredTiles :: Array<Tile>
//     Landed :: Boolean //TODO do we need this?
// }
