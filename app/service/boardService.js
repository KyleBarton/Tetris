let d = require('../model/dimension');
let Moves = require('../model/moves');
let coordService = require('./coordinateService.js');
let pieceService = require('./pieceService.js');

let boardService = {
	initCoords: function(rows, columns){
		let coords = [];
		for (let row = 0; row < rows; row++){
			for (let col = 0; col < columns; col++){
				coords.push(coordService.newCoordinate(col,row));
			}
		}
		return coords;
	},
	activePieceCoords: function(board){
		return board.activePiece.coveredCoords;
	},
	coordsAreClear: function(board, move){
		let piece = board.activePiece;
		return !board.coveredCoords.some(function(cc){
			return pieceService.hasNeighbor(piece, move, cc);
		});
	},
	activePieceOnEdge: function(board, move){
		if (move === Moves.Right){
			return board.coveredCoords.some(function(cc){
				return cc.X === d.WIDTH-1;
			});
		}
		if (move === Moves.Left){
			return board.coveredCoords.some(function(cc){
				return cc.X === 0;
			})
		}
	},

	newBoard: function(){
		return {
			coveredCoords: [],
			columns: d.WIDTH,
			rows: d.HEIGHT,
			coordinates: this.initCoords(d.HEIGHT, d.WIDTH),
			activePiece: null,
			coveredCoords: []
		}
	},
	introducePiece: function(board,piece){
        board.activePiece = piece;
        for(let i = 0; i < this.activePieceCoords(board).length; i++){
			board.coveredCoords.push(
				coordService.newCoordinate(
					this.activePieceCoords(board)[i].X,
					this.activePieceCoords(board)[i].Y)
			);
        }
		return board;
    },
	processForActivePiece: function(board,move){
        if (move === Moves.Right 
			&& 
			!this.activePieceOnEdge(board,Moves.Right)
			&&
			this.coordsAreClear(board,Moves.Right)
			)
		{
			let oldCoords = board.activePiece.coveredCoords;
			board.coveredCoords = board.coveredCoords.filter(function(cc){
				oldCoords.some(function(pcc){
					return pcc.X === cc.X && pcc.Y == cc.Y;
				});
			});
			
			return this.introducePiece(board, pieceService.processMove(move, board.activePiece));
        }
		if (move === Moves.Left
			&&
			!this.activePieceOnEdge(board,Moves.Left)
			&&
			this.coordsAreClear(board,Moves.Left)
		){
			//TODO this is a function
			let oldCoords = board.activePiece.coveredCoords;
			board.coveredCoords = board.coveredCoords.filter(function(cc){
				oldCoords.some(function(pcc){
					return pcc.X === cc.X && pcc.Y == cc.Y;
				});
			});
			return this.introducePiece(board, pieceService.processMove(move, board.activePiece));
		}
		return board;
    },

	//TODO this is probably too powerful and needs to be private
	//TODO this really needs to be abstracted somehow
	addCoveredCoords: function(board, coords){
		for (let i = 0; i < coords.length; i++){
			if (!board.coveredCoords.some(function(cc){
				return cc.X === coords[i].X && cc.Y === coords[i].Y;
			})){
				board.coveredCoords.push(coords[i]);
			}
		}
		return board;
	}
}

module.exports=boardService;
