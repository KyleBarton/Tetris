let should = require('should');
let d = require('../app/model/dimension');
let GameFactory = require('../app/model/gameFactory');
let Piece = require('../app/model/piece');
let pTypes = require('../app/model/pieceType');
let Moves = require('../app/model/moves');


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
            beforeEach(function(){
                console.log(this.board.activePiece);
                console.log(this.board.coveredCoords);
                this.board.processForActivePiece(Moves.Right);
            })
            it('should move all coords right if legal', function(){
                //New position, so a right move is legal
                let originalPiece = new Piece(pTypes.Cube).newPosition();
                this.board.activePiece.coveredCoords.should.eql(originalPiece.coveredCoords.map(function(cc){
                    cc.X++;
                    return cc
                }));
                console.log(this.board.activePiece);
                console.log(this.board.coveredCoords);
                this.board.coveredCoords.should.eql(this.board.activePiece.coveredCoords);
            });
            it('should keep piece in the same place if on right wall', function(){
				let originalPiece = new Piece(pTypes.Cube).newPosition();

            });
            it('should keep piece in the same place if coords to the right top are covered', function(){

            });
            it('should keep piece in the same place if coords to the right bottom are covered', function(){

            });
        })
    })

});
