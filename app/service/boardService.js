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
			return this.activePieceCoords(board).some(function(cc){
				return cc.X === d.WIDTH-1;
			});
		}
		if (move === Moves.Left){
			return this.activePieceCoords(board).some(function(cc){
				return cc.X === 0;
			})
		}
		if (move === Moves.Down){
			return this.activePieceCoords(board).some(function(cc){
				return cc.Y === 0;
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
			coveredCoords: [],
			readyForNewPiece: true
		}
	},
	introducePiece: function(board,piece){
		board.readyForNewPiece = false;
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
			!this.activePieceOnEdge(board,move)
			&&
			this.coordsAreClear(board,move)
			)
		{
			board = this.stripActivePieceCoords(board);
			return this.introducePiece(board, pieceService.processMove(move, board.activePiece));
        }
		if (move === Moves.Left
			&&
			!this.activePieceOnEdge(board,move)
			&&
			this.coordsAreClear(board,move)
		){
			board = this.stripActivePieceCoords(board);
			return this.introducePiece(board, pieceService.processMove(move, board.activePiece));
		}
		if (move === Moves.Down
			&&
			this.coordsAreClear(board,move)
			&&
			!this.activePieceOnEdge(board,move)
		){
			board = this.stripActivePieceCoords(board);
			return this.introducePiece(board, pieceService.processMove(move, board.activePiece));
		}
		//blegh
		if (move === Moves.Down && (!this.coordsAreClear(board,move) || this.activePieceOnEdge(board, move))){ 
			board.readyForNewPiece = true;
		}
		return board;
    },

	//Should be private
	stripActivePieceCoords: function(board){
		let oldCoords = this.activePieceCoords(board);
		board.coveredCoords = board.coveredCoords.filter(function(cc){
			return !oldCoords.some(function(pcc){
				return pcc.X === cc.X && pcc.Y === cc.Y;
			});
		});
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
