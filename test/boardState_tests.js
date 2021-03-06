let should = require('should');
let d = require('../app/model/dimension');
let gameService = require('../app/service/gameService.js');
let pTypes = require('../app/model/pieceType');
let Moves = require('../app/model/moves');

let coordinateService = require('../app/service/coordinateService.js');
let pieceService = require('../app/service/pieceService.js');
let boardService = require('../app/service/boardService.js');

const arbitraryCoordSort = (a,b) => { 
	//factor of 2 breaks the tie and prefers x comparison over y
	return (2*b.X + b.Y) - (2*a.X + a.Y);
}


describe('The Board', function(){
    describe('at starting position', function(){
        beforeEach(function(){
            this.board = gameService.createNewGame().board;
        })
        it('should have no covered coordinates', function(){
            this.board.coveredCoords.should.be.empty();
        });
		it('should be ready for new piece', function(){
			this.board.readyForNewPiece.should.be.eql(true);
		})
    });
    describe('always', function(){
        beforeEach(function(){
            this.board = gameService.createNewGame().board;
        });
        it(`should have ${d.WIDTH} columns`, function(){
            for (let i = 0; i < this.board.rows; i++){
                this.board.coordinates.filter(function(coord){
                    return coord.Y == i;
                }).length.should.equal(d.WIDTH);
            }
        });
        it(`should have ${d.HEIGHT} rows`, function(){
            for (let i = 0; i < this.board.columns; i++){
                this.board.coordinates.filter(function(coord){
                    return coord.X == i;
                }).length.should.equal(d.HEIGHT);
            }

        });
        it('should have 200 coordinates', function(){
            this.board.coordinates.length.should.equal(200);
        });
    });
    describe('when fed a piece that fits', function(){
        beforeEach(function(){
            this.board = gameService.createNewGame().board;
			this.newPiece = pieceService.newPiece(pTypes.Cube);
			this.board = boardService.introducePiece(this.board, this.newPiece);
        });
		it('should not be ready for new piece', function(){
			this.board.readyForNewPiece.should.be.eql(false);
		})
        it('should have the new piece listed as active', function(){
            this.board.activePiece.should.eql(this.newPiece);
        });
        it("should have the piece's coordinates covered", function(){
            this.board.coveredCoords.should.eql(this.newPiece.coveredCoords);
        });
    });
    describe('when processing piece move', function(){
        describe('right', function(){
			beforeEach(function(){
				this.board = gameService.createNewGame().board;
				this.newPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.introducePiece(this.board, this.newPiece);
			});
            it('should keep piece in the same place if on right wall', function(){
				for (let i = 0; i < 5; i++){
					this.board = boardService.processForActivePiece(this.board, Moves.Right);
				}

				//Need an elegant way to assert that our coords aren't out of bounds
				boardService.activePieceCoords(this.board).should.eql([
					coordinateService.newCoordinate(d.WIDTH-2,d.HEIGHT-1),
					coordinateService.newCoordinate(d.WIDTH-2,d.HEIGHT-2),
					coordinateService.newCoordinate(d.WIDTH-1,d.HEIGHT-1),
					coordinateService.newCoordinate(d.WIDTH-1,d.HEIGHT-2)
				].sort(arbitraryCoordSort)) 
            });
            it('should move all coords right if legal', function(){
                this.board = boardService.processForActivePiece(this.board, Moves.Right);
				let originalPiece = pieceService.newPiece(pTypes.Cube);
                boardService.activePieceCoords(this.board).sort(arbitraryCoordSort).should.eql(originalPiece.coveredCoords.map(function(cc){
                    cc.X++;
                    return cc
                }).sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if coords to the right top are covered', function(){
				// 0 1 2 3 4 5 6 7 8 9
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(6, d.HEIGHT-1)]);

				this.board = boardService.processForActivePiece(this.board, Moves.Right);

				boardService.activePieceCoords(this.board)
					.sort(arbitraryCoordSort)
					.should.eql(startingPiece.coveredCoords.sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if coords to the right bottom are covered', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(6, d.HEIGHT-2)])

				this.board = boardService.processForActivePiece(this.board, Moves.Right);

				boardService.activePieceCoords(this.board)
					.sort(arbitraryCoordSort)
					.should.eql(startingPiece.coveredCoords.sort(arbitraryCoordSort));

            });
			it('should not include the coords where the piece moved off in coveredcoords', function(){
				this.board = boardService.processForActivePiece(this.board, Moves.Right);

				this.board.coveredCoords.should.not.matchAny(function(cc){
					cc.X.should.be.eql(4);
				})
			});
			it('should include the coords where the piece moved to in coveredcoords', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.processForActivePiece(this.board, Moves.Right);

				this.board.coveredCoords.sort(arbitraryCoordSort).should.be.eql(startingPiece.coveredCoords.map(function(cc){
					return coordinateService.newCoordinate(cc.X+1, cc.Y);
				}).sort(arbitraryCoordSort));
			});
        });
		describe('left', function(){
			beforeEach(function(){
				this.board = gameService.createNewGame().board;
				this.newPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.introducePiece(this.board, this.newPiece);
			});
            it('should move all coords left if legal', function(){
				this.board = boardService.processForActivePiece(this.board, Moves.Left);
				let originalPiece = pieceService.newPiece(pTypes.Cube);
                boardService.activePieceCoords(this.board).sort(arbitraryCoordSort).should.eql(originalPiece.coveredCoords.map(function(cc){
                    cc.X--;
                    return cc
                }).sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if on left wall', function(){
				for (let i = 0; i < 5; i++){
					this.board = boardService.processForActivePiece(this.board, Moves.Left);
				}

				//Need an elegant way to assert that our coords aren't out of bounds
				boardService.activePieceCoords(this.board).sort(arbitraryCoordSort).should.eql([
					coordinateService.newCoordinate(0,d.HEIGHT-1),
					coordinateService.newCoordinate(0,d.HEIGHT-2),
					coordinateService.newCoordinate(1,d.HEIGHT-1),
					coordinateService.newCoordinate(1,d.HEIGHT-2)
				].sort(arbitraryCoordSort)) 
            });
            it('should keep piece in the same place if coords to the left top are covered', function(){
				// 0 1 2 3 4 5 6 7 8 9
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(3, d.HEIGHT-1)]);

				this.board = boardService.processForActivePiece(this.board, Moves.Left);

				boardService.activePieceCoords(this.board)
					.sort(arbitraryCoordSort)
					.should.eql(startingPiece.coveredCoords.sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if coords to the left bottom are covered', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(3, d.HEIGHT-2)]);

				this.board = boardService.processForActivePiece(this.board, Moves.Left);

				boardService.activePieceCoords(this.board)
					.sort(arbitraryCoordSort)
					.should.eql(startingPiece.coveredCoords.sort(arbitraryCoordSort));

            });
			it('should not include the coords where the piece moved off in coveredcoords', function(){
				this.board = boardService.processForActivePiece(this.board, Moves.Left);

				this.board.coveredCoords.should.not.matchAny(function(cc){
					cc.X.should.be.eql(5);
				})
			});
			it('should include the coords where the piece moved to in coveredcoords', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.processForActivePiece(this.board, Moves.Left);
				this.board.coveredCoords.sort(arbitraryCoordSort).should.be.eql(startingPiece.coveredCoords.map(function(cc){
					return coordinateService.newCoordinate(cc.X-1, cc.Y);
				}).sort(arbitraryCoordSort));
			});
		});
		describe("down", function(){
			beforeEach(function(){
				this.board = gameService.createNewGame().board;
				this.newPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.introducePiece(this.board, this.newPiece);
			});
			it('should move all coords down if legal', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.processForActivePiece(this.board, Moves.Down);
				this.board.coveredCoords.sort(arbitraryCoordSort).should.be.eql(startingPiece.coveredCoords.map(function(cc){
					return coordinateService.newCoordinate(cc.X, cc.Y-1);
				}).sort(arbitraryCoordSort));
			});
			it('should keep piece in the same place if coords to the bottom left are covered', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(4, 17)]);
				this.board = boardService.processForActivePiece(this.board, Moves.Down);
				boardService.activePieceCoords(this.board).sort(arbitraryCoordSort).should.be.eql(
					startingPiece.coveredCoords.sort(arbitraryCoordSort)
				);
			});
			it('should keep piece in the same place if coords to the bottom right are covered', function(){
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(5, 17)]);
				this.board = boardService.processForActivePiece(this.board, Moves.Down);
				boardService.activePieceCoords(this.board).sort(arbitraryCoordSort).should.be.eql(
					startingPiece.coveredCoords.sort(arbitraryCoordSort)
				);
			});
			it('should be ready for new piece if coords to the bottom are covered', function(){
				//arrange
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				this.board = boardService.addCoveredCoords(this.board, [coordinateService.newCoordinate(5, 0)]);
				//act
				for (let i = 0; i < 18; i++){
					this.board = boardService.processForActivePiece(this.board, Moves.Down);
				}
				//assert
				this.board.readyForNewPiece.should.be.eql(true);
			});
			it('should keep coords covered when setting and introducing new piece', function(){
				//arrange
				let startingPiece = pieceService.newPiece(pTypes.Cube);
				for (let i = 0; i < 19; i++){
					this.board = boardService.processForActivePiece(this.board, Moves.Down);
				}
				let bottomPieceCoords = boardService.activePieceCoords(this.board);
				//precondition
				this.board.readyForNewPiece.should.be.eql(true);
				//act
				this.board = boardService.introducePiece(this.board, startingPiece);
				//assert
				b = this.board
				this.board.coveredCoords.filter(function(cc){
					return !boardService.activePieceCoords(b).some(function(bcc){
						return cc.X === bcc.X && cc.Y === bcc.Y;
					});
				})
				.sort(arbitraryCoordSort)
				.should
				.eql(bottomPieceCoords.sort(arbitraryCoordSort));
			});
		});
    });
});
