"use strict";

let d = require('./dimension.js')
class Coordinate{
    constructor(x,y){
       if (x < 0 || x >= d.WIDTH) {
           throw new Error("Invalid width");
       }
       if (y < 0 || y >= d.HEIGHT) {
           throw new Error("Invalid height");
       }
       this.X = x;
       this.Y = y;
    }
}
module.exports=Coordinate;