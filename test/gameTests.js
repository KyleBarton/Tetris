let gameService = require('../app/service/gameService.js');
let should = require('should');
let moves = require('../app/model/moves.js');

describe('The Game', function(){
	describe('Move queue', function(){
		it('should start empty', function(){
			let newGame = gameService.createNewGame();
			newGame.eventQueue.length().should.be.eql(0);
		});
		it('should produce the oldest event when called for process', function(){
			let newGame = gameService.createNewGame();
			let moveQueue = newGame.eventQueue;
			moveQueue.add(moves.Down);
			moveQueue.add(moves.Right);
			moveQueue.add(moves.Left);
			
			moveQueue.pull().should.be.eql(moves.Down);
		});
		it('should have one fewer move in queue after pulling a move', function(){
			let newGame = gameService.createNewGame();
			let moveQueue = newGame.eventQueue;
			moveQueue.add(moves.Right);
			moveQueue.add(moves.Left);
			moveQueue.add(moves.Down);
			moveQueue.add(moves.Left);

			moveQueue.length().should.be.eql(4);
			let move = moveQueue.pull();
			moveQueue.length().should.be.eql(3);
		})
	})
})
