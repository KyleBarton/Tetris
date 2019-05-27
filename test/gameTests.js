let gameService = require('../app/service/gameService.js');
let boardService = require('../app/service/boardService.js');
let pieceService = require('../app/service/pieceService.js');

let should = require('should');
let moves = require('../app/model/moves.js');
let pTypes = require('../app/model/pieceType.js');

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
		describe('with an empty board', function(){
			it('should result in the same board after a right move', function(){
				let game = gameService.createNewGame();
				let expectedBoard = boardService.newBoard();

				//TODO events should be an object
				game = gameService.processEvent(game,{
					move: moves.Right
				});

				let actualBoard = game.board;

				actualBoard.should.be.eql(expectedBoard);
			});
			it('should result in the same board after a left move', function(){
				let game = gameService.createNewGame();
				let expectedBoard = boardService.newBoard();

				game = gameService.processEvent(game, {
					move: moves.Left
				});

				let actualBoard = game.board;

				actualBoard.should.be.eql(expectedBoard);
			});
			it('should result in the same board after a down move', function(){
				let game = gameService.createNewGame();
				let expectedBoard = boardService.newBoard();

				game = gameService.processEvent(game, {
					move: moves.Down
				});

				let actualBoard = game.board;

				actualBoard.should.be.eql(expectedBoard);

			});
		});
		describe('when processing an event to introduce piece', function(){
			it('should introduce the piece on the board', function(){
				let game = gameService.createNewGame();
				
				let newPiece = pieceService.newPiece(pTypes.Cube);

				let expectedBoard = boardService.newBoard(); 

				expectedBoard = boardService.introducePiece(expectedBoard, newPiece);;

				game = gameService.processEvent(game, {
					newPiece: newPiece
				});

				let actualBoard = game.board;

				actualBoard.should.be.eql(expectedBoard);
			});
			it('should ignore the event if the board already has an active piece', function(){
				let game = gameService.createNewGame();
				//Game already has a piece in place
				game = gameService.processEvent(game, {
					newPiece: pieceService.newPiece(pTypes.Cube)
				});
				//move the active piece to make sure we're not just overwriting it
				game = gameService.processEvent(game, {
					move: moves.Right
				});

				let expectedCoveredCoords = boardService.activePieceCoords(game.board);

				game = gameService.processEvent(game, {
					newPiece: pieceService.newPiece(pTypes.Cube)
				});

				let actualCoveredCoords = boardService.activePieceCoords(game.board);

				actualCoveredCoords.should.be.eql(expectedCoveredCoords);
			})
		})
		describe('with a newly active piece', function(){
			it('should process a right move on its board', function(){
				let game = gameService.createNewGame();
				let newPiece = pieceService.newPiece(pTypes.Cube);

				let expectedBoard = boardService.newBoard();

				expectedBoard = boardService.introducePiece(expectedBoard, newPiece);
				expectedBoard = boardService.processForActivePiece(expectedBoard, moves.Right);

				game = gameService.processEvent(game, {newPiece: newPiece});
				game = gameService.processEvent(game, {move: moves.Right});

				let actualBoard = game.board;

				actualBoard.should.be.eql(expectedBoard);
			})
		})
		it('should increment progress when board indicates rows cleared', function(){
		});
	});
});
