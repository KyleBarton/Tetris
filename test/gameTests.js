let gameService = require('../app/service/gameService.js');
let boardService = require('../app/service/boardService.js');
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
		});
	});
	describe('When incrementing progress', function(){
		it('should raise level by progress directed', function(){
			let game = gameService.createNewGame();
			game = gameService.addProgress(game, 5);
			game.level.progress.should.be.eql(5);
		})
		it('should raise level if progress moves past 9', function(){
			let game = gameService.createNewGame();
			game = gameService.addProgress(game, 10);
			game.level.stage.should.be.eql(1);
		});
		it('should carry progress over to next level if processing multiple progress', function(){
			let game = gameService.createNewGame();
			game = gameService.addProgress(game, 13);
			game.level.stage.should.be.eql(1);
			game.level.progress.should.be.eql(3);
		});
	});
	describe('When processing an event', function(){ 
		xit('should pass a right move on to the board', function(){
			let game = gameService.createNewGame();
			let expectedBoard = boardService.processForActivePiece(game.board, moves.Right);

			game = gameService.processEvent(game,{
				move: moves.Right
			});

			let actualBoard = game.board;

			//We have a problem; we can't introduce a "right" move on a virgin board
			//because there is no active piece to make a "right" move against. So the board needs some
			//way to indicate that it is ready to accept new pieces
			actualBoard.should.be.eql(expectedBoard);
		});
		it('should pass a left move on to the board', function(){

		});
		it('should pass a down move on to the board', function(){

		});
		it('should increment progress when board indicates rows cleared', function(){

		});
	});
});
