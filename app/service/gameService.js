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
	}
}
module.exports=gameService;
