/* Creates a board with y rows and x columns of squares with x rows and y 
columns, e.g. for x = 3 and y = 2:
x x | x x | x x 
x x | x x | x x 
x x | x x | x x 
----|-----|----
x x | x x | x x
x x | x x | x x
x x | x x | x x   
So the overall size of the board is (xy) by (xy) - aka. a square. 
*/

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

/* Checks if a move if legal - returns true if it is, else false if placing n in
row r, column c or square s is illegal */
function check_move(r, c, s, n, rows, cols, squares) {
	if (indexOf(rows[r], n) === -1) {
		return false;
	} else if (indexOf(cols[c], n) === -1) {
		return false;
	} else if (indexOf(squares[s], n) === -1){
		return false;
	}
	return true;
}

/* Removes value n from the possible values for row r, column c and square s */
function remove_from_possibles(r, c, s, n, rows, cols, squares) {
	var r_idx = indexOf(rows[r], n);
	if(r_idx !== -1){
		rows[r].splice(r_idx, 1);
	}
	var c_idx = indexOf(cols[c], n);
	if(c_idx !== -1) {
		cols[c].splice(c_idx, 1);
	}
	var s_idx = indexOf(squares[s], n);
	if(s_idx !== -1) {
		squares[s].splice(indexOf(squares[s], n), 1);
	}
	return [rows, cols, squares];
}

/* For the given row, find legal values for each number on the board */
function create_row(x, y, r, board, rows, cols, squares) {
	var row = []; // empty array for row values - returned
	var size = x * y; // size of board
	var rand_nums = create_rand_arr(size); // rand array of 1 to size ints
	
	for (var c = 0; c < size; c += 1) {
		// Calculate which square we're in
		var s = Math.floor(r / x) * x + Math.floor(c / y);
		// Flag so we can check for an unfilled box
		var flag = false;
		for (var i = 0; i < size; i += 1) {
			var n = rand_nums[i];
			if (check_move(r, c, s, n, rows, cols, squares) === true) {
				var results = remove_from_possibles(r, c, s, n, rows, cols, squares);
				rows = results[0];
				cols = results[1];
				squares = results[2];
				row[c] = rand_nums[i];
				flag = true;
				break;
			}
		}
		// Print an error msg to the console if we couldn't find a value
		if(flag === false) {
			//console.log('Unable to find value for square', r, c);
			row[c] = 0;
		}
	}
	return [row, rows, cols, squares];	
}
	
/* Create a game board with all numbers initialised with legal values */
function create_board(x, y) {
	// Overall size of the board
	var size = x * y;

	// Arrays for numbers on the board, and for the possible numbers in each 
	// row, column and square. These are initialised with the numbers 1 to size
	// and a number is removed from the three arrays when it is placed in the 
	// board.
	var board = [];
	var rows = [];
	var cols = [];
	var squares = [];
	
	for (var r = 0; r < size; r += 1) {
		board[r] = [];
		rows[r] = [];
		cols[r] = [];
		squares[r] = [];
		for (var c = 0; c < size; c += 1) {
			board[r][c] = 0;
			rows[r][c] = c+1;
			cols[r][c] = c+1;
			squares[r][c] = c+1;
		}
	}
	
	// For each row of the board, find legal values to place in each square
	for (var r = 0; r < size; r += 1) {
		// var temp_rows = rows.slice();
		// var temp_cols = cols.slice();
		// var temp_squares = squares.slice();
				console.log(rows[r]);
		var results = create_row(x, y, r, board, rows, cols, squares);
		var temp_row = results[0];
		rows = results[1];
		cols = results[2];
		squares = results[3];
				console.log(rows[r]);
		// var zeros = check_row_for_zeros(temp_row);
		// if (zeros > 0) {
			// rows = temp_rows;
			// cols = temp_cols;
			// squares = temp_squares;
				// console.log(rows[r]);
			// results = create_row(x, y, r, board, rows, cols, squares);
			// temp_row = results[0];
			// rows = results[1];
			// cols = results[2];
			// squares = results[3];
		// }
				console.log(rows[r]);
				console.log(" ");
		//console.log('r: ', temp_row);
		for (var c = 0; c < size; c += 1) {
			board[r][c] = temp_row[c];
		}
	}
	return board;
}

function check_row_for_zeros(row) {
	var count = 0;
	for (var i=0; i < row.length; i += 1) {
		if (row[i] == 0) {
			count += 1;
		}
	}
	return count;	
}

function check_board_for_zeros(board) {
	var count = 0;
	for (var i=0; i < board.length; i += 1) {
		count += check_row_for_zeros(board[i]);
	}
	return count;	
}

function start_game(x, y) {
	var current_board = create_board(x,y);
	var current_count = check_board_for_zeros(current_board);
	var best_board = current_board;
	var best_count = current_count;
	
	for (var i=0; i < 10; i += 1) {
		console.log(i);
		current_board = create_board(x,y);
		current_count = check_board_for_zeros(current_board);
		
		if (current_count < best_count) {
			best_board = current_board;
			best_count = current_count;
		}
	}
	console.log(" ");
	console.log(best_count);
	console.log(best_board);
}