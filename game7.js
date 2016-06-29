// ---------------------------- GENERATE BOARD ------------------------------

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

Board.prototype.findZero = function() {
	for (var row=0; row < this.dim; row++) {
		for (var col=0; col < this.dim; col++) {
			if (this.board[row][col] == 0) {
				return row;
			}
		}
	}
	return -1;
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
	for (var c = 0; c < this.dim; c++) {
		for (var idx = 0; idx < possRow.length; idx++) {
			if (this.checkMove(row, c, possRow[idx]) == true) {
				this.addToGameBoard(row, c, possRow[idx]);
				this.removeFromPossBoard(row, c, possRow[idx]);
				break;
			}
		}
	}
};

Board.prototype.checkRowForZeros = function(row) {
	//console.log("CRFZ " + this.board[row]);
	for (var c = 0; c < this.dim; c++) {
		if (this.board[row][c] == 0) {
			//console.log("CRFZ true");
			return true;
		}
	}
	//console.log("CRFZ false");
	return false;
};

function redoRows(origBoard, row) {
	var x = origBoard.board
	var newBoard = new Board(origBoard.x, origBoard.y);
	newBoard.setDimAndSize();
	newBoard.setRandBoard();
	newBoard.setZeroBoard();
		
	for (var r = 0; r < row; r++) {
		for (var c = 0; c < origBoard.dim; c++) {
			var temp = origBoard.board[r][c];
			newBoard.board[r][c] = temp;
			newBoard.removeFromPossBoard(r, c, temp);
		}
	}
	return newBoard;
};

function generateBoard(x, y) {
	var trials = 100;
	for (var t = 0; t < trials; t++) {
		// Set up boards
		var gameBoard = new Board(x, y);
		gameBoard.setDimAndSize();
		gameBoard.setRandBoard();
		gameBoard.setZeroBoard();
				
		// Assign values to game board cells
		for (var r = 0; r < gameBoard.dim; r++) {
			gameBoard.setRow(r);
			
			// Try making the row again with different possibles if there's a zero in it
			if(gameBoard.checkRowForZeros(r) == true) {
				var newBoard = redoRows(gameBoard, r);
						
				// Assign values to game board cells
				newBoard.setRow(r);
				gameBoard = newBoard;
				newBoard = null;
			}
			
			// Try again one row about if there's still a zero
			if(gameBoard.checkRowForZeros(r) == true && r > 0) {
				var newBoard = redoRows(gameBoard, r-1);
						
				// Assign values to game board cells
				newBoard.setRow(r-1);
				newBoard.setRow(r);
				gameBoard = newBoard;
				newBoard = null;
			}
			
		}
		
		// Print board for debugging
		var zeros = gameBoard.checkForZeros();
		if (zeros == 0) {
			console.log("DONE, t: " + t);
			console.log(gameBoard.toString());
			return gameBoard;
			// PUT DISPLAY FUNCTION HERE
			break;
		} else {
			gameBoard = null;
		}
	}
		console.log("Finished.");
}


// ------------------------ GENERATE PUZZLE ---------------------------------

function generatePuzzle(solution, difficulty) {
	var puzzle = [];
	
	for (var r = 0; r < solution.dim; r++) {
		puzzle[r] = [];
		for (var c = 0; c < solution.dim; c++) {
			if (Math.random() > difficulty) {
				puzzle[r][c] = parseInt(solution.board[r][c], 10);
			} else {
				puzzle[r][c] = " ";
			}
		}
	} 
	return puzzle;
}


// ------------------------ RENDER BOARD ---------------------------------

function renderBoard(solution, puzzle) {
    var pageBoard = document.getElementById("sudokuBoard");
	pageBoard.innerHTML = "";
    
    var tableRows = [];
    var tableCells = [];

	for (var r = 0; r < solution.dim; r += 1) {
		tableRows[r] = pageBoard.insertRow(r);

		for (var c = 0; c < solution.dim; c += 1) {
			var cell = r * solution.dim + c;
			tableCells[cell] = tableRows[r].insertCell(c);
			tableCells[cell].innerHTML = puzzle[r][c];

			if (c % solution.x == 0) {
				tableCells[cell].style = "border-left: 2px solid #777;";
			}
		}

		if (r % solution.y == 0) {
			tableRows[r].style = "border-top: 2px solid #777;";
		}
	}
	
	// Set the board div's width to the correct value
	var boardWidth = document.getElementById("board");
	var gameWidth = document.getElementById("game");
	
	if (solution.dim == 4) {
		boardWidth.style.width = "220px";
		gameWidth.style.width = "370px";
	} else if (solution.dim == 6) {
		boardWidth.style.width = "300px";
		gameWidth.style.width = "450px";
	} else {
		boardWidth.style.width = "420px";
		gameWidth.style.width = "570px";
	} 
	
	// Make the option buttons visible
	var options = document.getElementById("options");
	options.style.visibility = "visible";
}


// ------------------------ BASE FUNCTION ---------------------------------

function startGame(x, y) {
	// Generate a solution board with all numbers present
	var solution = generateBoard(x, y);
	setBtnActive(x, y);
	
	// Generate a puzzle board with some numbers removed
	// difficulty = 0.3, 0.5, 0.7 - NOT IMPLEMENTED YET
	var puzzle = generatePuzzle(solution, 0.5);
	
	// Render the board
	renderBoard(solution, puzzle);
}

function setBtnActive(x, y) {
	// Reset any buttons set to active
	var btns = document.getElementsByClassName("size_btn");
	for (var i = 0; i < btns.length; i++) {
		btns[i].className = "size_btn";
	}
	
	// Set current button to active
	var btnName = x + "x" + y;
	var btn = document.getElementById(btnName);
	btn.className += " btnActive";
}

function updateVal(val) {
}

