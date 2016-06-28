"use strict";

function get_rand_num(max) {
    return Math.floor(Math.random() * max);
}

function check_num(num, array) {
    var check = -1;
    for (var i = 0; i < array.length; i += 1) {
        if (array[i] === num) {
            check = i;
        }
    }
    return check;
}

function create_ordered_array(n) {
	var arr = [];
	for (var i = 0; i < n; i += 1) {
		arr[i] = i+1;
	}
	return arr;	
}

function create_rand_array(n, arr) {
	for (var i = 0; i < (Math.floor(n/2)+1); i += 1) {
		var a = get_rand_num(n);
		var b = get_rand_num(n);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return arr;
}



function choose_numbers(size) {
	for (var trials = 0; trials < 1; trials += 1) {
		// Create basic array of numbers 1 to n
		var ord_arr = create_ordered_array(size);
		// Create n arrays of randomly ordered array of numbers 1 to n
		var rand_arr = create_rand_array(size, ord_arr);
		console.log(rand_arr);
		
		var rows = [];
		var cols = [];
		var squares = [];
		var board = [];
		for (var i = 0; i < size; i += 1) {
			rows[i] = [];
			cols[i] = [];
			squares[i] = [];
			board[i] = [];
			for (var j = 0; j < size; j += 1) {
				rows[i][j] = j+1;
				cols[i][j] = j+1;
				squares[i][j] = j+1;
				board[i][j] = 0;
			}
		}
		
		for (var r = 0; r < size; r += 1) {
			for (var c = 0; c < size; c += 1) {
				var n = Math.sqrt(size);
				var s = Math.floor(r / n) * n + Math.floor(c / n);
				console.log(r, c, s, ': ');
				
				//console.log(rows[r].length, cols[c].length, rows[r]);
				var cell_comp = false;
				for (var i = 0; i < size; i += 1) {
					//console.log(i);
					var check_r_idx = check_num(rand_arr[i], rows[r]);
					var check_c_idx = check_num(rand_arr[i], cols[c]);
					var check_s_idx = check_num(rand_arr[i], squares[s]);
					if (check_r_idx !== -1 && check_c_idx !== -1 && check_s_idx !== -1) {
						console.log(rand_arr[i]);
						console.log(rows[r]);
						console.log(cols[c]);
						console.log(squares[s]);
						board[r][c] = rand_arr[i];
						rows[r].splice(check_r_idx, 1);
						cols[c].splice(check_c_idx, 1);
						squares[s].splice(check_s_idx, 1);
						console.log(rows[r]);
						console.log(cols[c]);
						console.log(squares[s]);
						cell_comp = true;
						break;
					}
				}
				if (cell_comp === false) {
					console.log('error ', r, c);
				}
				
			}
		}
		
		// Second pass
		var count = 0;
		for (var r = 0; r < size; r += 1) {
			for (var c = 0; c < size; c += 1) {
				if (board[r][c] === 0) {
					var cell_comp = false;
					for (var i = 0; i < size; i += 1) {
					//console.log(i);
						var check_r_idx = check_num(rand_arr[i], rows[r]);
						var check_c_idx = check_num(rand_arr[i], cols[c]);
						var check_s_idx = check_num(rand_arr[i], squares[s]);
						if (check_r_idx !== -1 && check_c_idx !== -1 && check_s_idx !== -1) {
							console.log(rand_arr[i]);
							console.log(rows[r]);
							console.log(cols[c]);
							console.log(squares[s]);
							board[r][c] = rand_arr[i];
							rows[r].splice(check_r_idx, 1);
							cols[c].splice(check_c_idx, 1);
							squares[s].splice(check_s_idx, 1);
							console.log(rows[r]);
							console.log(cols[c]);
							console.log(squares[s]);
							break;
						}
					}
					if (cell_comp === false) {
						count += 1;
						console.log('error ', r, c);
					}
				
				}
			}
		}
		console.log(count);
		return board;
		
	}
	console.log('fin');
    return board;
}

function create_board(mode) {
    var board = document.getElementById("board");
    var size = mode * mode;
    var num_cells = size * size;

    var rows = [];
    var cells = [];

    var nums = choose_numbers(size);
	
    if (nums != 0) {
		for (var r = 0; r < size; r += 1) {
			rows[r] = board.insertRow(r);

			for (var c = 0; c < size; c += 1) {
				var cell = r * size + c;
				cells[cell] = rows[r].insertCell(c);
				cells[cell].innerHTML = parseInt(nums[r][c], 10);

				if (c % mode == 0) {
					cells[cell].style = "border-left: 2px solid #999;";
				}
			}

			if (r % mode == 0) {
				rows[r].style = "border-top: 2px solid #999;";
			}
		}
    }
}

function board_2() {
    create_board(2);
}

function board_3() {
    create_board(3);
}

function board_4() {
    create_board(4);
}