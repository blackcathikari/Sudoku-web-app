var Board = function(x, y) {
  this.x = x;
  this.y = y;
  this.dim = 0;
  this.size = 0;
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

Board.prototype.createRandBoard = function() {
	var tempBoard = [];
	for (var i = 0; i < this.dim; i++) {
		tempBoard[i] = this.createRandArray();
	}
	return tempBoard;
};

Board.prototype.setRandBoard = function() {
	this.rows = this.createRandBoard();
	this.cols = this.createRandBoard();
	this.squares = this.createRandBoard();
};

Board.prototype.setZeroBoard = function() {
	for (var i = 0; i < this.dim; i++) {
		this.rows[i] = [];
		this.cols[i] = [];
		this.squares[i] = [];
		for (var j = 0; j < this.dim; j++) {
			this.rows[i][j] = 0;
			this.cols[i][j] = 0;
			this.squares[i][j] = 0;
		}
	}
};

Board.prototype.checkForZeros = function() {
	var count = 0;
	for (var row=0; row < this.dim; row++) {
		for (var col=0; col < this.dim; col++) {
			if (this.rows[row][col] == 0) {
				count++;
			}
		}
	}
	return count;	
};

Board.prototype.checkMove = function(row, col, num, possBoard) {
	console.log("CM: " + " " + row + " " + col + " " + num);
	console.log(possBoard.cols[col]);
	console.log(possBoard.squares[possBoard.findSquare(row, col)]);
	if ((possBoard.cols[col].indexOf(num) == -1 ) || (possBoard.squares[possBoard.findSquare(row, col)].indexOf(num) == -1 )) {
		console.log("false");
		return false;
	}
	console.log("true");
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
	console.log("ATGB: " + row + " " + col + " " + num);
	this.rows[row][col] = num;
	this.cols[col][row] = num;
	this.squares[this.findSquare(row, col)][this.findSquareCell(row, col)] = num;
	console.log("ROW: " + row + " " + this.rows[row]);
};

Board.prototype.toString = function() {
	var data = "";
	for (var i = 0; i < this.dim; i++) {
		data = data + this.rows[i].toString() + "\n";
	}
	return data;
};

Board.prototype.setRow = function(row, possBoard) {
	var possRow = possBoard.rows[row];
	var tempRow = this.rows[row];
	for (var c = 0; c < this.dim; c++) {
		for (var idx = 0; idx < possRow.length; idx++) {
			if (this.checkMove(row, c, possRow[idx], possBoard) == true) {
				this.addToGameBoard(row, c, possRow[idx]);
				possBoard.removeFromPossBoard(row, c, possRow[idx]);
				break;
			}
		}
	}
}

function startGame(x, y) {
	var trials = 1;
	for (var t = 0; t < trials; t++) {
		// Set up boards
		var possBoard = new Board(x, y);
		possBoard.setDimAndSize();
		possBoard.setRandBoard();
		
		var gameBoard = new Board(x, y);
		gameBoard.setDimAndSize();
		gameBoard.setZeroBoard();
		
		// Assign values to game board cells
		for (var r = 0; r < gameBoard.dim; r++) {
			gameBoard[r] = gameBoard.setRow(r, possBoard);
		}
		
		// Print board for debugging
		var zeros = gameBoard.checkForZeros();
		console.log(gameBoard.toString());
		console.log(zeros);
		if (zeros == 0) {
			console.log(gameBoard.toString());
			console.log(t);		
			// PUT DISPLAY FUNCTION HERE
			break;
		}
	}	
	
}
