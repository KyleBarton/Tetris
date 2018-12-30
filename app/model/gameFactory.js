let Game = require('./game.js');
module.exports={
    createNewGame: function(){
        return new Game().startNew();
    }
}