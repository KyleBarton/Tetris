let Board = require('./board');
let Level = require('./level');
let Piece = require('./piece');
let pTypes = require('./pieceType');

class Game {
    constructor(){
    }
    startNew(){
        this.board = new Board().startNew();
        this.level = new Level();
        //TODO hardcoded for now
        this.newPIece = new Piece(pTypes.Cube);
        return this;
    }
}

module.exports=Game;