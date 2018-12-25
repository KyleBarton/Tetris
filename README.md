# Tetris
Trying to write tetris in javascript for kicks

# Plans
-- Create a tetris application in the form of a javascript library, so that it can be downloaded & run on a browser

-- Dimensions of a tetris board:
    --> Width: 10
    --> Height: 20

-- Pieces come down from the top middle, starting at speed S


VOCAB:

WIDTH == Game width, 10
HEIGHT == Game height, 20
L == Player level; starts at 1 and increments by 1 for every 10 rows cleared
S == Unit of game speed (should be configurable) 
LS == Speed at which the pieces are moving (when game starts at level 1, pieces move at speed S)
Piece = {
    Type :: PieceType,
    Locus :: Coordinate,
    CoveredTiles :: Array<Tile>
    Landed :: Boolean //TODO do we need this?
}

Coordinate = {
    X int in [1..WIDTH]
    Y int in [1..HEIGHT]
}

Tile = {
    UpLeft :: Coordinate,
    UpRight :: Coordinate,
    DownLeft :: Coordinate
    DownRight :: Coordinate
}

PieceType = [
    Log,
    T,
    ZigLeft,
    ZigRight,
    L,
    LRev,
    Cube
]

Log:
+ + + +
T:
  +    
+ + +
ZigLeft:
    + +
+ + 
ZigRight:
+ +  
  + +
L:
+
+
+ +
LRev:
  +
  +
+ +
Cube:
+ +
+ +

