let pTypes = require('./pieceType');
let Coordinate = require('./coordinate');

/*
0 1 2 3 4 5 6 7 8 9
*/

class Piece {
    constructor(pType){
        this.pType = pType;
        //Decide initial covered tiles based on pType
    }
    newPosition(){
        if (this.pType === pTypes.Cube){
            this.coveredCoords = [
                new Coordinate(4, 19),
                new Coordinate(4, 18),
                new Coordinate(5, 19),
                new Coordinate(5, 18)
            ]
        } 
        else {
            throw new Error('Only cube piece type is supported currently');
        }
        return this;
    }

}

module.exports=Piece;


// Piece = {
//     Type :: PieceType,
//     Locus :: Coordinate,
//     CoveredTiles :: Array<Tile>
//     Landed :: Boolean //TODO do we need this?
// }