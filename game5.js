var Board = function(x, y) {
  this.x = x;
  this.y = y;
  this.dim = 0;
  this.size = 0;
  this.board = [];
  this.rows = [];
  this.cols = [];
  this.squares = [];
};

Board.prototype.setDimAndSize = function() {
	this.dim = this.x * this.y;
	this.size = this.dim * this.dim;
}

Board.prototype.findSquare = function(row, col) {
	return Math.floor(row / this.x) * this.x + Math.floor(col / this.y);
};

Board.prototype.findSquareCell = function(row, col) {
	var r = this.findSquare(row, col) % this.x;
	var c = this.findSquare(row, col) % this.y;
	return (r * this.x) + c;
};

Board.prototype.randNum = function(n) {
	return Math.floor(Math.random() * n);
};

Board.prototype.createOrdArray = function() {
	var arr = [];
	for (var i = 0; i < this.dim; i+= 1) {
		arr[i] = i+1;
	}
	return arr;
};

Board.prototype.createRandArray = function() {
	var ordArr = this.createOrdArray(this.dim);
	var randArr = [];
	for (var i = 0; i < this.dim; i++) {
		var idx = this.randNum(ordArr.length);
		randArr[i] = ordArr[idx];
		ordArr.splice(idx, 1);
	}
	return randArr;
};

Board.prototype.setRandBoard = function() {
	for (var i = 0; i < this.dim; i++) {
		this.rows[i] = this.createRandArray();
		this.cols[i] = this.createRandArray();
		this.squares[i] = this.createRandArray();
	}
};

Board.prototype.setZeroBoard = function() {
	for (var i = 0; i < this.dim; i++) {
		this.board[i] = [];
		for (var j = 0; j < this.dim; j++) {
			this.board[i][j] = 0;
		}
	}
};

Board.prototype.checkForZeros = function() {
	var count = 0;
	for (var row=0; row < this.dim; row++) {
		for (var col=0; col < this.dim; col++) {
			if (this.board[row][col] == 0) {
				count++;
			}
		}
	}
	return count;	
};

Board.prototype.checkMove = function(row, col, num) {
	if ((this.cols[col].indexOf(num) == -1 ) || (this.squares[this.findSquare(row, col)].indexOf(num) == -1 )) {
		return false;
	}
	return true;
};

Board.prototype.removeFromPossBoard = function(row, col, num) {
	var rowsIdx = this.rows[row].indexOf(num);
	this.rows[row].splice(rowsIdx, 1);
	
	var colsIdx = this.cols[col].indexOf(num);
	this.cols[col].splice(colsIdx, 1);
	
	var squareIdx = this.findSquare(row, col);
	this.squares[squareIdx].splice(this.squares[squareIdx].indexOf(num), 1);
};

Board.prototype.addToGameBoard = function(row, col, num) {
	this.board[row][col] = num;
};

Board.prototype.toString = function() {
	var data = "";
	for (var i = 0; i < this.dim; i++) {
		data = data + this.board[i].toString() + "\n";
	}
	return data;
};

Board.prototype.setRow = function(row) {
	var possRow = this.rows[row];
	var tempRow = this.board[row];
	for (var c = 0; c < this.dim; c++) {
		for (var idx = 0; idx < possRow.length; idx++) {
			if (this.checkMove(row, c, possRow[idx]) == true) {
				this.addToGameBoard(row, c, possRow[idx]);
				this.removeFromPossBoard(row, c, possRow[idx]);
				break;
			}
		}
	}
}

function startGame(x, y) {
	var trials = 30;
	for (var t = 0; t < trials; t++) {
		// Set up boards
		var board = new Board(x, y);
		board.setDimAndSize();
		board.setRandBoard();
		board.setZeroBoard();
		
		// Assign values to game board cells
		for (var r = 0; r < board.dim; r++) {
			board[r] = board.setRow(r);
		}
		
		// Print board for debugging
		var zeros = board.checkForZeros();
		console.log(board.toString());
		console.log(zeros);
		if (zeros == 0) {
			console.log(board.toString());
			console.log(t);		
			// PUT DISPLAY FUNCTION HERE
			break;
		}
	}	
	
}
