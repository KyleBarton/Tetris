let pTypes = require('../model/pieceType');
let eventQueue = require('../model/eventQueue.js');

let levelService = require('../service/levelService.js');
let pieceService = require('../service/pieceService.js');
let boardService = require('../service/boardService.js');

let gameService = {
	createNewGame: function (){
		return { 
			board: boardService.newBoard(),
			level: levelService.startingLevel(),
			newPiece: pieceService.newPiece(pTypes.Cube),
			eventQueue: eventQueue.create()
		}
	},
	addProgress: function(game, numIncrease){
		game.level = levelService.increment(game.level, numIncrease);
		return game;
	},

	processEvent(game, evnt){
		//TODO process what kind of event it is here
		//This needs a whole class of validation that I'm going to do later
		if (evnt.move != null){
			game.board = boardService.processForActivePiece(game.board, evnt.move);
			return game;
		}
		if (evnt.newPiece != null){
			game.board = boardService.introducePiece(game.board, evnt.newPiece);
			return game;
		}
		return null;
	}
}
module.exports=gameService;
