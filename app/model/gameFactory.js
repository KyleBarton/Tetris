let pTypes = require('./pieceType');

let levelService = require('../service/levelService.js');
let pieceService = require('../service/pieceService.js');
let boardService = require('../service/boardService.js');

module.exports={
    createNewGame: function(){
        //return new Game().startNew();
		return { 
			board: boardService.newBoard(),
			level: levelService.startingLevel(),
			newPiece: pieceService.newPiece(pTypes.Cube)
		}
    }
}
