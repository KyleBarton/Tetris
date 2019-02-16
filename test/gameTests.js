let gameService = require('../app/service/gameService.js');
let should = require('should');

describe('The Game', function(){
	describe('Move queue', function(){
		it('should start empty', function(){
			let newGame = gameService.createNewGame();
			newGame.moveQueue.length.should.be.eql(0);
		})
	})
})
