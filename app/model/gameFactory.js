let Level = require('./level');
let pTypes = require('./pieceType');

let pieceService = require('../service/pieceService.js');
let boardService = require('../service/boardService.js');

module.exports={
    createNewGame: function(){
        //return new Game().startNew();
		return { 
			board: boardService.newBoard(),
			level: new Level(),
			newPiece: pieceService.newPiece(pTypes.Cube)
		}
    }
}
