function Board(x, y, board, arrs) {
	this.size = x*y;
	this.board = board.splice;
	this.rows = arrs.splice;
	this.cols = arrs.splice;
	this.squares = arrs.splice;
}

/* Checks if a move if legal - returns true if it is, else false if placing n in row r, column c or square s is illegal */
Board.prototype.check_move = function(n, r, c, s) {
	console.log(n);
	if (indexOf(this.rows[r], n) == -1) {
		return false;
	} else if (indexOf(this.cols[c], n) == -1) {
		return false;
	} else if (indexOf(this.squares[s], n) == -1){
		return false;
	}
	return true;
}

/* Removes value n from the possible values for row r, column c and square s */
Board.prototype.remove_from_possibles = function(n, r, c, s) {
	var r_idx = indexOf(board.rows[r], n);
	if(r_idx !== -1){
		board.rows[r].splice(r_idx, 1);
	}
	var c_idx = indexOf(board.cols[c], n);
	if(c_idx !== -1) {
		board.cols[c].splice(c_idx, 1);
	}
	var s_idx = indexOf(board.squares[s], n);
	if(s_idx !== -1) {
		board.squares[s].splice(indexOf(squares[s], n), 1);
	}
}

/* For the given row r, find legal values for each number on the board */
Board.prototype.create_row = function(r) {
	console.log("cr");
	var rand_nums = create_rand_arr(board.size); // rand array of 1 to size ints
	console.log(board.size);
	for (var c = 0; c < this.board.size; c += 1) {
		// Calculate which square we're in
		var s = Math.floor(r / x) * x + Math.floor(c / y);
		console.log(s);
		// Try values and place if legal
		for (var i = 0; i < board.size; i += 1) {
			var n = rand_nums[i];
			
			if (board.check_move(n, r, c, s) === true) {
				board[r][c] = n;
				remove_from_possibles(n, r, c, s);
				console.log(n);
				break;
			}
		}
	}
	console.log(" ");
}

function start_game(x, y) {
	// Create an array for the board, rows, cols and squares with nums 1
	// to x*y
	var temp_arr = [];
	var temp_board = [];
	for (var i = 0; i < x*y; i++) {
		temp_arr[i] = [];
		temp_board[i] = [];
		for (var j = 0; j < x*y; j++) {
			temp_arr[i][j] = j+1;
			temp_board[i][j] = 0;
		}
	}
	
	var board = new Board(x, y, temp_board, temp_arr);
	for (var r = 0; r < board.size; r++) {
		board.create_row(r);
	}
	console.log(board.check_board_for_zeros);
}

Board.prototype.check_row_for_zeros = function(r) {
	var count = 0;
	for (var i=0; i < this.board.size; i++) {
		if (this.board[r][i] == 0) {
			count += 1;
		}
	}
	return count;	
}

function check_board_for_zeros(board) {
	var count = 0;
	for (var i=0; i < this.board.size; i += 1) {
		count += board.check_row_for_zeros(board[i]);
	}
	return count;	
}



/* Generates a random number between 0 and n */
function rand_num(n) {
	return Math.floor(Math.random() * n);
}	

/* Creates an array of numbers 1 to n in ascending order */
function create_ord_arr(n) {
	var arr = [];
	for (var i = 0; i < n; i+= 1) {
		arr[i] = i+1;
	}
	return arr;
}

/* Creates an array of numbers 1 to n in random order */
function create_rand_arr(n) {
	var ord_arr = create_ord_arr(n);
	var rand_arr = [];
	for (var i = 0; i < n; i += 1) {
		var idx = rand_num(ord_arr.length);
		rand_arr[i] = ord_arr[idx];
		ord_arr.splice(idx, 1);
	}
	return rand_arr;
}

/* Returns the index of n in array arr, else -1 if n doesn't exist in arr */
function indexOf(arr, n) {
	for (var i = 0; i < arr.length; i += 1) {
		if (arr[i] === n) {
			return i;
		}
	}
	return -1;
}
