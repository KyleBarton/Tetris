let pTypes = require('../model/pieceType');
let Coordinate = require('../model/coordinate');
let Moves = require('../model/moves');

let PieceService = {
	newPiece: function(pType){
		if (pType === pTypes.Cube){
			let newPiece = {
				pType: pType,
				coveredCoords: [
					new Coordinate(4, 19),
					new Coordinate(4, 18),
					new Coordinate(5, 19),
					new Coordinate(5, 18)
				]
			} 
			return newPiece
		}
		else {
			throw 'only Cubes permitted right now'
		}
	},
	processMove: function(move, piece){
		if (move === Moves.Right){
			return {
				pType: piece.pType,
				coveredCoords: piece.coveredCoords.map(function(cc){
					cc.X++;
					return cc;
				})
			}
		}
		if (move === Moves.Left){
			return {
				pType: piece.pType,
				coveredCoords: piece.coveredCoords.map(function(cc){
					cc.X--;
					return cc;
				})
			}
		}
	},
	hasNeighbor: function(piece, move, coord){
		if (piece.pType === pTypes.Cube){
			if (move === Moves.Right){
				let sorted = piece.coveredCoords.sort(function(a, b){
					return b.X - a.X;
				});
				//ew. Ew ew ew
				let rightMostCoords = [sorted[0], sorted[1]];
				let rightNeighbors = rightMostCoords.map(function(cc){
						return new Coordinate(cc.X+1, cc.Y);
				});
				return rightNeighbors.some(function(cc){
					return cc.X === coord.X && cc.Y == coord.Y;
				});
			}
			if (move === Moves.Left){
				let sorted = piece.coveredCoords.sort(function(a,b){
					return a.X - b.X;
				});
				let leftMostCoords = [sorted[0], sorted[1]];
				let leftNeighbors = leftMostCoords.map(function(cc){
					return new Coordinate(cc.X-1,cc.Y);
				});
				return leftNeighbors.some(function(cc){
					return cc.X === coord.X && cc.Y === coord.Y;
				});
			}
		}
		else {
			throw 'Cube is the only supported pType'
		}
	}
}

module.exports = PieceService
