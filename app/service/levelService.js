//TODO promotion default (10) should be configurable
let levelService = {
	startingLevel: function(){
		return {
			stage: 0,
			progress: 0
		}
	},
	increment: function(level, numIncrease){
		let stageIncrement = Math.floor(
			(level.progress + numIncrease) / 10
		);
		level.progress = (numIncrease + level.progress) % 10;
		level.stage += stageIncrement;
		return level;
	}
}

module.exports=levelService;
