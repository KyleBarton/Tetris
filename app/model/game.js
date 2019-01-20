let Board = require('./board');
let Level = require('./level');
let pTypes = require('./pieceType');
let pieceService = require('../service/pieceService.js');

class Game {
    constructor(){
    }
    startNew(){
        this.board = new Board().startNew();
        this.level = new Level();
        //TODO hardcoded for now
		this.newPiece = pieceService.newPiece(pTypes.Cube);
        return this;
    }
}

module.exports=Game;
