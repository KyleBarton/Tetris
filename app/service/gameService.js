let pTypes = require('../model/pieceType');

let levelService = require('../service/levelService.js');
let pieceService = require('../service/pieceService.js');
let boardService = require('../service/boardService.js');

let gameService = {
	createNewGame: function (){
		return { 
			board: boardService.newBoard(),
			level: levelService.startingLevel(),
			newPiece: pieceService.newPiece(pTypes.Cube),
			moveQueue: []
		}
	}
}
module.exports=gameService;
