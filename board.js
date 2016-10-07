/**
 * Created by BlackCat on 7/10/2016.
 */
function board(x, y) {
    // A board is made of y by x squares, each of which is x by y cells

    var dim = x * y;
    var cells = dim * dim;
    var fullBoard = [];
    var gameBoard = [];
    var difficulty = 0.5; // TODO: add options!

    var reps = 0;

    var genFullBoard = function() {
        // First row can just be an array
        var row = genRandomArr();
        for (var c = 0; c < dim; c++) {
            fullBoard[c] = row[c];
        }

        // Need to generate the rest of the board
        var startRow = 1;
        createRows(startRow);

        var max = 100;
        var trials = 0;
        var rows = checkRows();
        while (rows.indexOf(false) > -1 && trials < max) {
            for (var r = rows.indexOf(false); r < dim; r++ ) {
                row = genRandomArr();
                for (c = 0; c < dim; c++) {
                    for (var i = 0; i < row.length; i ++) {
                        if (checkValidMove(r, c, row[i])) {
                            fullBoard[(r * dim) + c] = row[i];
                            row.slice(i, 1);
                            break;
                        }
                    }
                }
            }
            rows = checkRows();
            trials++;
        }

        // If the board is still not possible, start over
        var maxReps = 50;
        rows = checkRows();
        if (rows.indexOf(false) > -1 && reps < maxReps) {
            reps++;
            console.log("REP " + reps + " " + fullBoard + " " + rows.indexOf(false));
            fullBoard = [];
            genFullBoard();
        }

        rows = checkRows();
        if (rows.indexOf(false) > -1 && reps === maxReps && dim === 9) {
            console.log("DEF " + rows.indexOf(false) > -1 + " " + dim);
            fullBoard = default3x3();
        }

        // Now go through and shift
        console.log(fullBoard);
    };

    var createRows = function(startRow) {
        for (var r = startRow; r < dim; r++) {
            var row = genRandomArr();
            for (var c = 0; c < dim; c++) {
                for (var i = 0; i < row.length; i ++) {
                    if (checkValidMove(r, c, row[i])) {
                        fullBoard[(r * dim) + c] = row[i];
                        row.slice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    var checkRows = function() {
        var rows = [];
        for (var r = 0; r < dim; r++) {
            var row = getRow(r);
            rows[r] = row.indexOf(undefined) <= -1;
        }
        return rows;
    };

    var genGameBoard = function() {
        for (var i = 0; i < cells; i++) {
            // if (Math.random() > difficulty && isNumeric(fullBoard[i])) {
                gameBoard[i] = fullBoard[i];
            // } else {
            //     gameBoard[i] = " ";
            // }
        }
    };

    var isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var genRandomArr = function() {
        var arr = genArr();
        for (var i = 0; i < dim; i++) {
            var idx1 = Math.floor(Math.random() * dim);
            var idx2 = Math.floor(Math.random() * dim);

            var temp = arr[idx1];
            arr[idx1] = arr[idx2];
            arr[idx2] = temp;
        }
        return arr;
    };

    var genArr = function() {
        var arr = [];
        for (var i = 0; i < dim; i++) {
            arr[i] = i + 1;
        }
        return arr;
    };

    var getRow = function(rowNum) {
        var row = [];
        for (var i = 0; i < dim; i++) {
            row[i] = fullBoard[(dim * rowNum) + i];
        }
        return row;
    };

    var getCol = function(colNum) {
        var col = [];
        for (var i = 0; i < dim; i++) {
            col[i] = fullBoard[(dim * i) + colNum];
        }
        return col;
    };

    var getSquare = function(args) {
        var square = [];

        var startRow, startCol;

        if (args.hasOwnProperty("squareNum")) {
            startRow = Math.floor(args.squareNum / x);
            startCol = Math.floor(args.squareNum / y);
        } else {
            startRow = args.row;
            startCol = args.col;
        }

        var r = startRow;
        var c = startCol;
        for (var i = 0; i < dim; i++) {
            square[i] = fullBoard[(r * dim) + c];
            r = startRow + Math.floor(i / startRow);
            c = startCol + (i % startCol);
        }

        return square;
    };

    var checkValidRow = function(r, row) {
        for (var c = 0; c < dim; c++) {
            var col = getCol(c);
            var square = getSquare({row: r, col: c});
            if (checkContains(col, row[c] || checkContains(square, row[c]))) {
                return false;
            }
        }
        return true;
    };

    var checkValidMove = function(r, c, n) {
        var row = getRow(r);
        var col = getCol(c);
        var square = getSquare({row: r, col: c});

        return !(checkContains(row, n) || checkContains(col, n) || checkContains(square, n));
    };

    var checkContains = function(arr, num) {
        return arr.indexOf(num) > -1;
    };

    var getBoard = function() {
        return {
            fullBoard: fullBoard,
            gameBoard: gameBoard,
            x: x,
            y: y,
            dim: dim,
            cells: cells
        };
    };

    var default3x3 = function() {
        return arr = [7, 4, 2, 3, 5, 6, 1, 9, 8, 2, 7, 9, 8, 3, 1, 5, 4, 6, 8, 3, 7, 9, 6, 5, 2, 1, 4, 1, 6, 8, 4, 7,
            3, 9, 2, 5, 4, 8, 3, 7, 2, 9, 6, 5, 1, 6, 5, 4, 2, 1, 7, 3, 8, 9, 3, 9, 5, 1, 4, 8, 7, 6, 2, 5, 2, 1, 6,
            9, 4, 8, 3, 7, 9, 1, 6, 5, 8, 2, 4, 7, 3];
    };

    return {
        genFullBoard: genFullBoard,
        genGameBoard: genGameBoard,
        getBoard: getBoard,
        checkValidMove: checkValidMove
    };
};
