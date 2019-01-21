let Level = require('./level');
let pTypes = require('./pieceType');
let pieceService = require('../service/pieceService.js');

let boardService = require('../service/boardService.js');

class Game {
    constructor(){
    }
    startNew(){
		this.board = boardService.newBoard();
        this.level = new Level();
        //TODO hardcoded for now
		this.newPiece = pieceService.newPiece(pTypes.Cube);
        return this;
    }
}

module.exports=Game;
