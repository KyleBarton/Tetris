let should = require('should');
let d = require('../app/model/dimension');
let GameFactory = require('../app/model/gameFactory');
let Piece = require('../app/model/piece');
let pTypes = require('../app/model/pieceType');
let Moves = require('../app/model/moves');
let Coordinate = require('../app/model/coordinate.js')

const arbitraryCoordSort = (a,b) => { 
	//factor of 2 breaks the tie and prefers x comparison over y
	return (2*b.X + b.Y) - (2*a.X + a.Y);
}


describe('The Board', function(){
    describe('at starting position', function(){
        beforeEach(function(){
            this.board = GameFactory.createNewGame().board;
        })
        it('should have no covered coordinates', function(){
            this.board.coveredCoords.should.be.empty();
        });
    });
    describe('always', function(){
        beforeEach(function(){
            this.board = GameFactory.createNewGame().board;
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
            this.board = GameFactory.createNewGame().board;
            this.newPiece = new Piece(pTypes.Cube).newPosition();
            this.board.introducePiece(this.newPiece);
        });
        it('should have the new piece listed as active', function(){
            this.board.activePiece.should.eql(this.newPiece);
        });
        it("should have the piece's coordinates covered", function(){
            this.board.coveredCoords.should.eql(this.newPiece.coveredCoords);
        });
    });
    describe('when processing piece move', function(){
        beforeEach(function(){
            this.board = GameFactory.createNewGame().board;
            this.newPiece = new Piece(pTypes.Cube).newPosition();
            this.board.introducePiece(this.newPiece);
        });
        describe('right', function(){
			beforeEach(function(){})
            it('should move all coords right if legal', function(){
                this.board.processForActivePiece(Moves.Right);
                let originalPiece = new Piece(pTypes.Cube).newPosition();
                this.board.activePiece.coveredCoords.sort(arbitraryCoordSort).should.eql(originalPiece.coveredCoords.map(function(cc){
                    cc.X++;
                    return cc
                }).sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if on right wall', function(){
				for (let i = 0; i < 5; i++){
					this.board.processForActivePiece(Moves.Right);
				}

				//Need an elegant way to assert that our coords aren't out of bounds
				this.board.activePiece.coveredCoords.should.eql([
					new Coordinate(d.WIDTH-2,d.HEIGHT-1),
					new Coordinate(d.WIDTH-2,d.HEIGHT-2),
					new Coordinate(d.WIDTH-1,d.HEIGHT-1),
					new Coordinate(d.WIDTH-1,d.HEIGHT-2)
				].sort(arbitraryCoordSort)) 
            });
            it('should keep piece in the same place if coords to the right top are covered', function(){
				// 0 1 2 3 4 5 6 7 8 9
				let startingPiece = new Piece(pTypes.Cube).newPosition();
				this.board.addCoveredCoords([new Coordinate(6, d.HEIGHT-1)]);

				this.board.processForActivePiece(Moves.Right);

				this.board.activePiece.coveredCoords.sort(arbitraryCoordSort).should.eql(startingPiece.coveredCoords.sort(arbitraryCoordSort));
            });
            it('should keep piece in the same place if coords to the right bottom are covered', function(){

            });
			it('should not include the coords where the piece moved off in coveredcoords', function(){});
			it('should include the coords where the piece moved to in coveredcoords', function(){});
        });
		describe('left', function(){
		})
	
    })

});
