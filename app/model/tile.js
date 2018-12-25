"use strict";
let Coordinate = require('./coordinate.js');
class Tile {
    contructor(upLeft){
        this.UpperLeft = upLeft
        this.UpperRight = new Coordinate(this.UpperLeft.X + 1, this.UpperLeft.Y);
        this.LowerLeft = new Coordinate(this.UpperLeft.X, this.UpperLeft.Y - 1);
        this.LowerRight = new Coordinate(this.UpperRight.X, this.UpperRight.Y - 1);
    }
}

module.exports=Tile;