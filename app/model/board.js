let coordService = require('../service/coordinateService.js');
let d = require('../model/dimension');

let board = {
	//this is thie only piece of logic allowed in this object
	initBoard = function(){
		this.coords = []
		for (let x = 0; x < d.WIDTH; x++){
			for (let y = 0; y < d.HEIGHT; y++){
				this.coords.push(coordService.newCoordinate(x,y));
			}
		}
		
		this.coveredCoords = [];
		this.activePieceCoords = [];
		this.activePiece = null;
	}

}

module.exports = board;
