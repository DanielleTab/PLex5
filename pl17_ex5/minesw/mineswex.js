var SZ = 12;
var board = [];
for (var r = 0; r < SZ; r++) {
    board[r] = [];
    for (var c = 0; c < SZ; c++) {
        board[r][c] = Math.random() < 0.08 ? 1 : 0;
    }
}


function around(row, col)
{
    var acc = colwise(row);
    function colwise(row) {
        var acc = 0;
        if (col > 0) acc += board[row][col-1];
        if (col < SZ-1) acc += board[row][col+1];
        return acc;
    }
    if (row > 0) {
        acc += board[row-1][col] + colwise(row-1);
    }
    if (row < SZ-1) {
        acc += board[row+1][col] + colwise(row+1);
    }
    return acc;
}


/**
 * Returns the cell element at (row, col).
 * @param row - row index, zero-based
 * @param col - column index, zero-based
 */
function get_cell(row, col)
{
    return $('div').eq(row * SZ + col);
}


/**
 * Returns true if the given cell object has not yet
 * been revealed.
 */
function is_cell_hidden(cellobj)
{
    return cellobj.is(":hidden");
}

function nxt() {
    var i = $('div').index($(this));
    var row = Math.floor(i / SZ);
    var col = i % SZ;
    var value = around(row, col);
    if (board[row][col]) {
        $(this).addClass("mine");
    } else {
        $(this).text(value);

        /* ADD YOUR CODE HERE */
        if (0 != value)
        {
            return;
        }
        
        var handleBoardSizeColRowIndex = function(num)
                                {
                                    if (0 > num)
                                    {
                                        return 0;
                                    }
                                    else if (SZ <= num)
                                    {
                                        return SZ-1;
                                    }

                                    return num;
                                }

        var indexRow = -1;
        for( ; indexRow < 2; indexRow = indexRow + 1)
        {
            var indexCol = -1;
            for( ; indexCol < 2; indexCol = indexCol + 1)
            {
                var realRowIndex = handleBoardSizeColRowIndex(row + indexRow);
                var realColIndex = handleBoardSizeColRowIndex(col + indexCol);
                
                var curCell = get_cell(realRowIndex, realColIndex);
                if (true === is_cell_hidden(curCell))
                {
                    curCell.fadeIn(nxt);
                }
            }            
        }


    }
}


$(function() {
    $('td').append('<div/>');
    $('td').mousedown(function() { $(this).find("div").fadeIn(nxt); });
});
