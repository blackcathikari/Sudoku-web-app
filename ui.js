/**
 * Created by BlackCat on 7/10/2016.
 */
var ui = function(board) {

    var tableId = "sudokuBoard";

    var genBoard = function() {
        // Clear any existing boards
        destroyBoard();

        // Create a new board
        var table = document.getElementById(tableId);
        for (var r = 0; r < board.dim; r++) {
            var row = document.createElement("TR");
            for (var c = 0; c < board.dim; c++) {
                var cell = document.createElement("TD");
                cell.innerHTML = board.gameBoard[(r * board.dim) + c];
                if (c % board.x == 0) {
                    cell.style = "border-left: 2px solid #777;";
                }
                row.appendChild(cell);
            }
            if (r % board.y == 0) {
                row.style = "border-top: 2px solid #777;";
            }
            table.appendChild(row);
        }
        setWidths();
    };

    var destroyBoard = function() {
        var table = document.getElementById(tableId);
        table.innerHTML = "";
    };

    var setWidths = function() {
        // Set the board div's width to the correct value
        var boardWidth = document.getElementById("board");
        var gameWidth = document.getElementById("game");

        if (board.dim == 4) {
            boardWidth.style.width = "220px";
            gameWidth.style.width = "370px";
        } else if (board.dim == 6) {
            boardWidth.style.width = "300px";
            gameWidth.style.width = "450px";
        } else {
            boardWidth.style.width = "420px";
            gameWidth.style.width = "570px";
        }
    };

    // Make the option buttons visible
    var options = document.getElementById("options");
    options.style.visibility = "visible";

    return {
        genBoard: genBoard
    };
};
