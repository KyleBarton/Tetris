let d = require('../model/dimension.js')

let coordinateService = {
	newCoordinate: function(x,y){
		return {
			X: x,
			Y: y
		}
	}
}

module.exports=coordinateService;
