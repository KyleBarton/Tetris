let pTypes = require('../model/pieceType');
let Moves = require('../model/moves');

let coordinateService = require('./coordinateService.js');

let PieceService = {
	newPiece: function(pType){
		if (pType === pTypes.Cube){
			let newPiece = {
				pType: pType,
				coveredCoords: [
					coordinateService.newCoordinate(4, 19),
					coordinateService.newCoordinate(4, 18),
					coordinateService.newCoordinate(5, 19),
					coordinateService.newCoordinate(5, 18)
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
					let coord = coordinateService.newCoordinate(cc.X+1,cc.Y);
					return coord;
				})
			}
		}
		if (move === Moves.Left){
			return {
				pType: piece.pType,
				coveredCoords: piece.coveredCoords.map(function(cc){
					let coord = coordinateService.newCoordinate(cc.X-1,cc.Y);
					return coord;
				})
			}
		}
		if (move === Moves.Down){
			return {
				pType: piece.pType,
				coveredCoords: piece.coveredCoords.map(function(cc){
					let coord = coordinateService.newCoordinate(cc.X,cc.Y-1);
					return coord;
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
						return coordinateService.newCoordinate(cc.X+1, cc.Y);
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
					return coordinateService.newCoordinate(cc.X-1,cc.Y);
				});
				return leftNeighbors.some(function(cc){
					return cc.X === coord.X && cc.Y === coord.Y;
				});
			}
			if (move === Moves.Down){
				let sorted = piece.coveredCoords.sort(function(a,b){
					return a.Y - b.Y;
				});
				let bottomMostCoords = [sorted[0], sorted[1]];
				let bottomNeighbors = bottomMostCoords.map(function(cc){
					return coordinateService.newCoordinate(cc.X,cc.Y-1);
				});
				return bottomNeighbors.some(function(cc){
					return cc.X === coord.X & cc.Y === coord.Y;
				});
			}
		}
		else {
			throw 'Cube is the only supported pType'
		}
	}
}

module.exports = PieceService
