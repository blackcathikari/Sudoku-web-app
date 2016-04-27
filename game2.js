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
	
function rand_num(n) {
	return Math.floor(Math.random() * n);
}	

function create_ord_arr(n) {
	var arr = [];
	for (var i = 0; i < n; i+= 1) {
		arr[i] = i+1;
	}
	return arr;
}

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

function indexOf(arr, n) {
	for (var i = 0; i < arr.length; i += 1) {
		if (arr[i] === n) {
			return i;
		}
	}
	return -1;
}

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
}

function create_row(x, y, r, board, rows, cols, squares) {
	var row = [];
	var size = x * y;
	var rand_nums = create_rand_arr(size);
	for (var c = 0; c < size; c += 1) {
		var s = Math.floor(r / x) * x + Math.floor(c / y);
		var flag = false;
		for (var i = 0; i < size; i += 1) {
			var n = rand_nums[i];
			if (check_move(r, c, s, n, rows, cols, squares) === true) {
				remove_from_possibles(r, c, s, n, rows, cols, squares);
				row[c] = rand_nums[i];
				flag = true;
				break;
			}
		}
		if(flag === false) {
			console.log('Unable to find value for square', r, c);
			row[c] = 0;
		}
	}
	return row;	
}
	
function create_board(x, y) {
	var size = x * y;
	
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
	
	for (var r = 0; r < size; r += 1) {
		var temp_row = create_row(x, y, r, board, rows, cols, squares);
		console.log('r: ', temp_row);
		for (var c = 0; c < size; c += 1) {
			board[r][c] = temp_row[c];
		}
	}
}