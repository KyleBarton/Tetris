let d = require('./dimension.js')

let coordinateService = {
	newCoordinate: function(x,y){
		return {
			X: x,
			Y: y
		}
	}
}

module.exports=coordinateService;
