// Get references to the puzzle grids
const puzzleGrids = document.querySelectorAll('.puzzle-grid');






function checkRow(row)
{
    // Check that the row is valid
    const rowSet = new Set();
    for(let i = 0; i < row.length; i++) {
        if (row[i] == 0) {
            continue;
        }
        if (rowSet.has(row[i])) {
            return false;
        }
        rowSet.add(row[i]);
    }
    return true;
}

function highlightInvalidCells(cells)
{
    for(let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'red';
    }
}

function resetCellBackgrounds()
{
    const table = document.querySelector('.puzzle');
    if (table) {
        const rows = table.querySelectorAll('tr'); // Get all the rows in the table
        for(let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll('td'); // Get all the cells in the row
            for(let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                cell.style.backgroundColor = '';
            }
        }
    } else {
        console.log("Table element with class 'puzzle' not found.");
    }
}

function checkPuzzle(elements, puzzleMatrix)
{    
    // Check that the puzzle rows are valid
    for(let i = 0; i < puzzleMatrix.length; i++) {
        if (!checkRow(puzzleMatrix[i])) {
            highlightInvalidCells(elements[i]);
            return false;
        }
    }
    // Check that the puzzle columns are valid
    for(let i = 0; i < puzzleMatrix.length; i++) {
        const column = [];
        const colElements = elements.map(elements => elements[i]);
        for(let j = 0; j < puzzleMatrix.length; j++) {
            column.push(puzzleMatrix[j][i]);
        }
        if (!checkRow(column)) {
            highlightInvalidCells(colElements);
            return false;
        }
    }
    // Check the 3x3 subgrids are valid
    for(let i = 0; i < puzzleMatrix.length; i += 3) {
        for(let j = 0; j < puzzleMatrix.length; j += 3) {
            const subgrid = [];
            const subgrid_elements = elements.slice(i, i+3).map(row => row.slice(j, j+3));
            for(let k = 0; k < 3; k++) {
                for(let l = 0; l < 3; l++) {
                    subgrid.push(puzzleMatrix[i+k][j+l]);
                }
            }
            if (!checkRow(subgrid)) {
                for(let x = 0; x < subgrid_elements.length; x++) {
                    highlightInvalidCells(subgrid_elements[x]);
                }

            }
        }
    }
    return true;
}

function solve(elements, puzzleMatrix){
    
}
// Function to solve a puzzle
function solvePuzzle() {
    resetCellBackgrounds();
    // Get the puzzle grid and its elements
    const table = document.querySelector('.puzzle'); 
    const rows = table.querySelectorAll('tr'); // Get all the rows in the table
    // create a 2D array of the td elements for each table row
    var el_arr = [];
    var num_arr = [];
    // load the arrays and validate that the values are within the correct range
    valid = true;
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        el_arr[i] = [];
        num_arr[i] = [];
        for(let j = 0; j < cells.length; j++) {
            el_arr[i][j] = cells[j];
            const val = parseInt(cells[j].textContent);
            if (isNaN(val))
            {   // clear the cell if it is not a number, but don't return false
                el_arr[i][j].textContent = '';
                num_arr[i][j] = 0;
                continue;
            }
            if(val > 0 && val <= 9) 
            {   // if it is a number between 1 and 9, add it to the array
                num_arr[i][j] = val;
            } else 
            {   // if it is not a number between 1 and 9, return false
                el_arr[i][j].style.backgroundColor = 'red';
                num_arr[i][j] = -1;
                valid = false;
            }
        }
    }
    if(!valid)
    {
        alert('Invalid puzzle');
        return;
    }
    // Check the puzzle is valid
    if (!checkPuzzle(el_arr, num_arr)) {
        alert('Unsolvable puzzle');
        return;
    }
    solve(el_arr, num_arr);
}
