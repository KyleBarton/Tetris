let should = require('should');
let d = require('../app/model/dimension');
let GameFactory = require('../app/model/gameFactory');

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
        })
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

        })
        it('should have 200 coordinates', function(){
            this.board.coordinates.length.should.equal(200);
        })
    })
});