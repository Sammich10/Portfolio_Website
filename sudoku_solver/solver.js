// Get references to the puzzle grids
const puzzleGrids = document.querySelectorAll('.puzzle-grid');
var TRY_TIMEOUT = 0;
var CHECK_TIMEOUT = 0;

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

function checkPuzzle(elements, puzzleMatrix, highlightCells = false)
{    
    // Check that the puzzle rows are valid
    validPuzzle = true;
    for(let i = 0; i < puzzleMatrix.length; i++) {
        if (!checkRow(puzzleMatrix[i])) {
            if(highlightCells) {
                highlightInvalidCells(elements[i]);
            }
            validPuzzle = false;
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
            if(highlightCells) {
                highlightInvalidCells(colElements);
            }
            validPuzzle = false;
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
                if(highlightCells) {
                    for(let x = 0; x < subgrid_elements.length; x++) {
                        highlightInvalidCells(subgrid_elements[x]);
                    }
                }
                validPuzzle = false;
            }
        }
    }
    return validPuzzle;
}

function getCellDomain(i, j, puzzleMatrix, cellDomains, mode) {
    const cell = puzzleMatrix[i][j];
    if (cell == 0) {
        cellDomains[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    else {
        cellDomains[i][j] = [cell];
    }    
}

async function solve(elements, puzzleMatrix){
    var cellDomains = Array.from({length: 9}, () => Array.from({length: 9}, () => []));
    // make an array of booleans to mark the cells that are modifiable
    var modifiable = Array.from({length: 9}, () => Array.from({length: 9}, () => true));
    // Find the cells that are modifiable
    mode = 'brute force';
    for(let i = 0; i < puzzleMatrix.length; i++) {
        for(let j = 0; j < puzzleMatrix.length; j++) {
            if (puzzleMatrix[i][j] != 0) {
                modifiable[i][j] = false;
                cellDomains[i][j] = [puzzleMatrix[i][j]];
            }
            else
            {
                getCellDomain(i, j, puzzleMatrix, cellDomains, mode);
            }
        }
    }
    if(mode == 'brute force') {
        let mtrx = puzzleMatrix.slice(0);
        let start = [0, 0];
        var counter = 0;
        const puzzle = await solveBruteForce(elements, mtrx, cellDomains, modifiable, start, counter);
        if(puzzle == null){
            console.log("No solution found");
        }
        else{
            stats = document.getElementById("stats-text");
            stats.innerHTML = "Solved in " + puzzle[1] + " steps";
        }
    }
    console.log(counter)
} 
function clearPuzzle()
{
    resetCellBackgrounds();
    const table = document.querySelector('.puzzle'); 
    const rows = table.querySelectorAll('tr'); // Get all the rows in the table
    for(let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td'); // Get all the cells in the row
        for(let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            cell.textContent = '';
        }
    }
}
// Function to solve the puzzle when the button is clicked
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
    if (!checkPuzzle(el_arr, num_arr, true)) {
        alert('Unsolvable puzzle');
        return;
    }
    solve(el_arr, num_arr);
}

function incrementIndex(index) {
    let newIndex = index.slice();
    if(index[1] == 8)
    {
        newIndex[0] += 1;
        newIndex[1] = 0;
    }
    else
    {
        newIndex[1] += 1;
    }
    return newIndex;
}

// Iterative brute force solving algorithm. Attempt all possible solutions and return the first one that works.
async function solveBruteForce(elements, puzzleMatrix, cellDomains, modifiable, index, counter)
{
    let matrix = puzzleMatrix.map(row => row.slice()); // Create a copy of the puzzle matrix
    let stack = [[index, 0]];
    while(stack.length > 0)
    {
        let [myIndex, i] = stack.pop();
        while(modifiable[myIndex[0]][myIndex[1]] == false)
        {
            myIndex = incrementIndex(myIndex);
        }
        if(i >= cellDomains[myIndex[0]][myIndex[1]].length)
        {
            matrix[myIndex[0]][myIndex[1]] = 0;
            elements[myIndex[0]][myIndex[1]].textContent = '';
            if(myIndex[0] == 8 && myIndex[1] == 8)
            {
                return null;
            }
            [prevIdx, i] = stack.pop();
            stack.push([prevIdx, i+1]);
        }
        else
        {
            const cell = cellDomains[myIndex[0]][myIndex[1]][i];
            matrix[myIndex[0]][myIndex[1]] = cell;
            elements[myIndex[0]][myIndex[1]].textContent = cell;
            if(TRY_TIMEOUT != 0) await sleep(TRY_TIMEOUT);
            counter++;
            if(checkPuzzle(elements, matrix))
            {
                if(CHECK_TIMEOUT != 0) await sleep(CHECK_TIMEOUT);
                
                if(myIndex[0] == 8 && myIndex[1] == 8)
                {
                    return [matrix,counter];
                }
                let newIndex = incrementIndex(myIndex);
                stack.push([myIndex,i]);
                stack.push([newIndex, 0]);
            }
            else{
                if(i < cellDomains[myIndex[0]][myIndex[1]].length - 1)
                {
                    stack.push([myIndex, i+1]);
                }
                else{
                    matrix[myIndex[0]][myIndex[1]] = 0;
                    elements[myIndex[0]][myIndex[1]].textContent = '';
                    [nextIndex, i] = stack.pop();
                    stack.push([nextIndex, i+1]);
                }
            }
        }
    }
    return [matrix,counter];
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleCheckbox(el)
{
    if(el.checked)
    {
        CHECK_TIMEOUT = 35;
    }
}