let internalQueue = function(){
	let events = [];
	return {
		length: function(){
			return events.length;
		},
		add: function(move){ 
			events.unshift(move);
		},
		pull: function(){
			return events.pop();
		}
	}
}
let eventQueue = {
	create: function(){
		return internalQueue();
	}
}

module.exports=eventQueue;
