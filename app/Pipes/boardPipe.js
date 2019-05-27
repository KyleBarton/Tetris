let boardPipe = {
	//TODO this is probably too powerful and needs to be private
	//TODO this really needs to be abstracted somehow
	addCoveredCoords: function(board, coords){
		for (let i = 0; i < coords.length; i++){
			if (!board.coveredCoords.some(function(cc){
				return cc.X === coords[i].X && cc.Y === coords[i].Y;
			})){
				board.coveredCoords.push(coords[i]);
			}
		}
		return this;
	}

	introducePiece: function(board,piece){
		if (!board.readyForNewPiece){
			return board;
		}
		
		board.readyForNewPiece = false;
        board.activePiece = piece;
	}
}


module.exports=boardPipe;
