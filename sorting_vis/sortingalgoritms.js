// execution control flag variables
var RUN_ALGORITHM = true
var ABORT_ALGORITHM = false
var SPEED_MODIFIER = 1;
// constants for execution speed
const SPEED_SHOW_SELECT = 500;
const SPEED_SHOW_SWAP = 300;
const SPEED_SHOW_MERGE_GROUPS = 500;
// constants for button color
const BUTTON_COLOR_ENABLED = "mediumblue"
const BUTTON_COLOR_DISABLED = "mediumslateblue"
// constants for bar color
const DEFAULT_BAR_COLOR = "deepskyblue"
const BAR_COLOR_SELECTED_1 = "darkblue"
const BAR_COLOR_SELECTED_2 = "red"
const BAR_COLOR_SORTED = "rgb(49, 226, 13)"
const BAR_COLOR_MERGE_SORT_GROUP_1 = "rgb(89, 78, 228)"
const BAR_COLOR_MERGE_SORT_GROUP_2 = "rgb(36, 32, 80)"
// bar size global variables
var BAR_HEIGHT = 0;
var BAR_WIDTH = 0;
var BAR_SPACING = 0;
var BAR_SPACING_MODIFIER = 0.0;
var BAR_HEIGHT_MODIFIER = 0.0;
const MAX_VALUE = 100

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //adjust the bar height to be larger when on mobile
    BAR_SPACING_MODIFIER = 0.35;
    BAR_HEIGHT_MODIFIER = 0.25;
}
else
{
    BAR_SPACING_MODIFIER = 0.15;
    BAR_HEIGHT_MODIFIER = 0.4;
}
/**
 * Disables the "abortButton" and sets its background color to the disabled color.
 * Also sets the ABORT_ALGORITHM flag to true.
 * This is called when the "Abort" button is clicked.
 * @return {void} This function does not return anything.
 */
function stopExecution() {
    const abortButton = document.getElementById("abortButton");
    abortButton.disabled = true;
    abortButton.style.backgroundColor = BUTTON_COLOR_DISABLED;
    ABORT_ALGORITHM = true;
}


/**
 * Generates bars based on the value selected in the 'barselect' dropdown.
 * The generated bars are appended to the 'container' element.
 * This is called when the 'Generate New Array' button is clicked.
 */
function generate() {
    // Get the selected value from the 'barselect' dropdown
    var bars = document.getElementById("barselect");
    var barsInt = parseInt(bars.value); // Convert the selected value to an integer
    
    // Generate bars with the selected value
    generatebars(barsInt);
}

/**
 * Toggles the execution of the algorithm by changing the value of the `RUN_ALGORITHM` variable.
 * Updates the text of the "pauseButton" element accordingly.
 *
 * @return {void} This function does not return anything.
 */
function toggleAlgorithmExecution() {
    RUN_ALGORITHM = !RUN_ALGORITHM;
    const button = document.getElementById("pauseButton");
    button.innerHTML = RUN_ALGORITHM ? "Pause Algorithm" : "Start Algorithm";
}

/**
 * Generates 'num' amount of bars with random values from 1 to 'MAX_VALUE'
 * and appends them to the 'container' element.
 * This is called when the 'Generate New Array' button is clicked.
 * @param {number} num - The number of bars to generate.
 */
function generatebars(num) {
    // Reset the abort button
    document.getElementById("abortButton").disabled = false;
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR_ENABLED;
    // Set the abort flag to false
    ABORT_ALGORITHM = false;

    const container = document.querySelector(".data-container");

    // Remove all previous bars
    const previousbars = document.getElementsByClassName("bar");
    while (previousbars.length > 0) {
        previousbars[0].parentNode.removeChild(previousbars[0]);
    }

    // Calculate the bar width based on the container width and number of bars
    const container_width_vw = document.getElementById("data-container").getBoundingClientRect().width / window.innerWidth * 100;
    BAR_SPACING = container_width_vw / num;
    const container_height_vh = document.getElementById("data-container").getBoundingClientRect().height / window.innerHeight * 100;
    BAR_HEIGHT = container_height_vh - (container_height_vh * BAR_HEIGHT_MODIFIER);
    // Subtract 15% of the bar width so they don't overlap
    BAR_WIDTH = BAR_SPACING - (BAR_SPACING * BAR_SPACING_MODIFIER);

    for (let i = 0; i < num; i += 1) {
        // Generate a random value between 1 and MAX_VALUE
        const value = Math.floor(Math.random() * MAX_VALUE) + 1;

        // Create a new bar element
        const bar = document.createElement("div");
        bar.classList.add("bar"); // Add class "bar" to the div

        // Set the height of the bar based on the value
        bar.style.height = `${value/MAX_VALUE * BAR_HEIGHT}vh`;
        
        // Translate the bar towards positive X axis
        bar.style.transform = `translateX(${i * BAR_SPACING}vw)`;
        bar.style.width = `${BAR_WIDTH}vw`;

        // Create a label element to display the value of the bar
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        // if the number of bars is greater than 50, make the text hidden
        if (num > 50) {
            barLabel.style.visibility = "hidden";
        }
        bar.appendChild(barLabel);
        

        // Append the bar to the container
        container.appendChild(bar);
    }
}

/**
 * Checks if the algorithm should be executed. If `RUN_ALGORITHM` is false, the function
 * waits for the algorithm to be enabled or for the ABORT_ALGORITHM flag to be set to true.
 *
 * @return {Promise<boolean>} A Promise that resolves to true if the algorithm should be executed,
 * or false if the algorithm was aborted.
 */
async function checkExecution() {
    do{
        if (ABORT_ALGORITHM) {
            enable();
            return false;
        }else if(!RUN_ALGORITHM) {
            await delay(250);
        }
    }while(!RUN_ALGORITHM)
    return Promise.resolve();
}

/**
 * Swaps the height and content of two bars.
 *
 * @param {Array} bars - The array of bars.
 * @param {number} bar_idx_1 - The index of the first bar.
 * @param {number} bar_idx_2 - The index of the second bar.
 * @return {Promise<void>} A Promise that resolves when the swap is complete.
 */
async function swapBars(bars, bar_idx_1, bar_idx_2){
    var temp1 = bars[bar_idx_1].style.height;
    var temp2 = bars[bar_idx_1].childNodes[0].innerHTML;
    bars[bar_idx_1].style.height = bars[bar_idx_2].style.height;
    bars[bar_idx_2].style.height = temp1;
    bars[bar_idx_1].childNodes[0].innerText = bars[bar_idx_2].childNodes[0].innerHTML;
    bars[bar_idx_2].childNodes[0].innerText = temp2;
    await delay(SPEED_SHOW_SWAP/SPEED_MODIFIER);
}

function algorithmFinished(bars)
{
    for( var d = 0; d < bars.length; d++){//after there are no more swaps to be done change all the bars colors to green
        bars[d].style.backgroundColor = BAR_COLOR_SORTED
    }
    enable()//re-enable the buttons after execution
}

function updateMiscText(text){
    document.getElementById("miscAlgorithmDescText").innerHTML = text
}
 
/**
 * Sorts an array of elements using the Selection Sort algorithm.
 *
 * @return {Promise<void>} A promise that resolves when the sorting is complete.
 */
async function SelectionSort() { //function to perform "Selection Sort"
    let bars = document.querySelectorAll(".bar");
    var comparison_counter = 0;
    var swap_counter = 0;
    // Assign 0 to min_idx
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {
        if(await checkExecution() == false) return;
        min_idx = i; // Assign i to min_idx
        bars[i].style.backgroundColor = BAR_COLOR_SELECTED_1; // Provide darkblue color to the ith bar
        for (var j = i + 1; j < bars.length; j += 1) {
            bars[j].style.backgroundColor = BAR_COLOR_SELECTED_2; // Provide red color to the jth bar
            if(await checkExecution() == false) return;
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER) //slow execution so users can see the process occuring 
            
            var val1 = parseInt(bars[j].childNodes[0].innerHTML); // To store the integer value of jth bar to var1  
            var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML); // To store the integer value of (min_idx)th bar to var2 
            
            if (val1 < val2) { // Compare val1 & val2
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = DEFAULT_BAR_COLOR;  // Provide skyblue color to the (min-idx)th bar
                }
                min_idx = j;
            } 
            else
            {
                bars[j].style.backgroundColor = DEFAULT_BAR_COLOR; // Provide skyblue color to the jth bar
            }
            comparison_counter++;
            updateMiscText("Comparisons: " + comparison_counter + " | Swaps: " + swap_counter)
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        swapBars(bars, min_idx, i); //swap ith and (min_idx)th bar
        swap_counter++;
        updateMiscText("Comparisons: " + comparison_counter + " | Swaps: " + swap_counter)
        await delay(SPEED_SHOW_SWAP/SPEED_MODIFIER);
        bars[min_idx].style.backgroundColor = DEFAULT_BAR_COLOR; // Provide skyblue color to the (min-idx)th bar
        bars[i].style.backgroundColor = BAR_COLOR_SORTED; // Provide lightgreen color to the ith bar
    }
    algorithmFinished(bars);
}

/**
 * This function performs bubble sort on the bars.
 *
 * @returns {Promise<void>} - A promise that resolves when the sorting is finished.
 */
async function bubbleSort(){
    var comparison_counter = 0;
    var swap_counter = 0;
    let bars = document.querySelectorAll(".bar");
    var swapped = true //keep track of weather a swap took place 
    do{
        swapped = false //set swapped to false by default
        for(var i = 0; i < bars.length - 1; i++){
            if(await checkExecution() == false) return;
            // get the value of the i and ith+1 bar 
            var val1 = parseInt(bars[i].childNodes[0].innerHTML); 
            var val2 = parseInt(bars[i+1].childNodes[0].innerHTML);
            //change the bars red to show comparison
            bars[i].style.backgroundColor = BAR_COLOR_SELECTED_2;
            bars[i+1].style.backgroundColor = BAR_COLOR_SELECTED_2;

            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
            //if the ith value is greater than the value after is, swap the values
            if(val1 > val2){
                swapped = true
                swap_counter++;
                await swapBars(bars, i, i+1);
            }
            //change bars back to their normal color
            bars[i].style.backgroundColor=DEFAULT_BAR_COLOR; 
            bars[i+1].style.backgroundColor=DEFAULT_BAR_COLOR;
            updateMiscText("Comparisons: " + comparison_counter++ + " Swaps: " + swap_counter);
        }
    }
    while(swapped);
    algorithmFinished(bars);
}

/**
 * Sorts an array of elements using the Insertion Sort algorithm.
 *
 * @return {Promise<void>} A promise that resolves when the sorting is complete.
 */
async function insertionSort(){
    let bars = document.querySelectorAll(".bar");
    var comparison_counter = 0;
    var swap_counter = 0;
    // start at index 1 and make it the key
    for(var i = 1; i<bars.length; i++)
    {
        bars[i].style.backgroundColor = BAR_COLOR_SELECTED_1;
        await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        // get the value of the ith bar
        key = parseInt(bars[i].childNodes[0].innerHTML);
        // compare the key to the value in front of it
        var j = i - 1;       
        // loop until the key is less than the value in front of it
        while(j>=0){ 
            if(await checkExecution() == false) return;
            bars[j].style.backgroundColor = BAR_COLOR_SELECTED_2; //change the jth bar red to show comparison 
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
            // if the key is less than the value in front of it, swap the values
            if(parseInt(bars[j].childNodes[0].innerHTML) > key)
            {
                swapBars(bars, j, j+1); //swap the ith and the jth values values
                swap_counter++;
                await delay(SPEED_SHOW_SWAP/SPEED_MODIFIER);
            }
            else
            {   // found the correct position for the key, so break out of the loop and change the colors back
                bars[j].style.backgroundColor = DEFAULT_BAR_COLOR;
                bars[j+1].style.backgroundColor = DEFAULT_BAR_COLOR;
                break;
            }
            // restore the color of the swapped bar, mark the jth bar as dark blue
            bars[j].style.backgroundColor = BAR_COLOR_SELECTED_1;
            bars[j+1].style.backgroundColor = DEFAULT_BAR_COLOR;
            j--;
            updateMiscText("Comparisons: " + comparison_counter++ + " | Swaps: " + swap_counter);
        }
        updateMiscText("Comparisons: " + comparison_counter++ + " | Swaps: " + swap_counter);
        bars[i].style.backgroundColor = DEFAULT_BAR_COLOR;
        bars[j+1].style.height = key * 30;
        bars[j+1].style.backgroundColor = DEFAULT_BAR_COLOR;
        bars[j+1].childNodes[0].innterText = key;
    }
    algorithmFinished(bars);
}

async function mergeSort(){
    let bars = document.querySelectorAll(".bar");
    var num_comparisons = 0;
    var recursive_calls = 0;
    var recursion_depth = 0;
    //create an auxiliary array to aid with visualization 
    var valuesArray = [];
    for(var i = 0; i<bars.length; i++){
        valuesArray.push(parseInt(bars[i].childNodes[0].innerHTML));
    }
    //make the initial function call on the array
    doMergeSort(valuesArray, 0, valuesArray.length - 1, recursion_depth);
    async function doMergeSort(valueArray,start,end, depth){
        if(start<end){
            var mid = parseInt((start + end) / 2)
            depth++;
            recursive_calls++;
            await doMergeSort(valueArray, start, mid, depth) //recursively call doMergeSort function
            await doMergeSort(valuesArray, mid+1, end, depth)
            await merge(valuesArray, start, mid, end, depth)
        }
    }

    async function merge(valueArray,start,mid,end, depth){
        if(await checkExecution() == false) return;
        var tempArray = [];
        var i = start;
        var j  = mid + 1;
        var k = 0;
        var t = 0;
        for(t = start; t < j; t++)
        {
            bars[t].style.backgroundColor = BAR_COLOR_MERGE_SORT_GROUP_1;
        }
        for(t = j; t <= end; t++)
        {
            bars[t].style.backgroundColor = BAR_COLOR_MERGE_SORT_GROUP_2;
        }
        await delay(SPEED_SHOW_MERGE_GROUPS/SPEED_MODIFIER);
        while(i <= mid && j <= end){
            if(await checkExecution() == false) return;
            bars[i].style.backgroundColor = BAR_COLOR_SELECTED_2; //change bar color to red to show comparison
            bars[j].style.backgroundColor = BAR_COLOR_SELECTED_2;
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);          
            if(valueArray[i] <= valueArray[j]){
                bars[i].style.backgroundColor = BAR_COLOR_SORTED; //change bar color to green to show its been added to the temporary sorted array
                bars[j].style.backgroundColor = BAR_COLOR_MERGE_SORT_GROUP_2;
                tempArray[k] = valueArray[i];
                // underneath the bar, display the order in the temporary sorted array in which the values have been added
                k++;
                i++;
                }
                else
                {
                bars[i].style.backgroundColor = BAR_COLOR_MERGE_SORT_GROUP_1;
                bars[j].style.backgroundColor = BAR_COLOR_SORTED; //change bar color to green to show its been added to the temporary sorted array
                tempArray[k] = valueArray[j];
                k++;
                j++;
            }
            num_comparisons++;
            updateMiscText("Comparisons: " + num_comparisons + " | Recursive calls: " + recursive_calls + " | Recursion depth: " + depth);
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        while(i <= mid){
            tempArray[k] = valueArray[i];
            bars[i].style.backgroundColor = BAR_COLOR_SORTED;
            k++;
            i++;
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        while(j <= end){
            tempArray[k] = valueArray[j];
            bars[j].style.backgroundColor = BAR_COLOR_SORTED;
            k++;
            j++;
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        for(var i = start; i <= end; i++){ //swap the values in tempArray with bars on screen to display sorted array section
            var newbarheight = parseInt(tempArray[i-start]);
            bars[i].style.height = `${newbarheight/MAX_VALUE * BAR_HEIGHT}vh`;
            if(valueArray.size < 50)
            {
                bars[i].childNodes[0].innerText = newbarheight;
            }
            bars[i].style.backgroundColor = DEFAULT_BAR_COLOR;
            valueArray[i] = tempArray[i - start];
        }
        if(tempArray.length == valueArray.length){//re-enables the buttons when the algorithm is finished
            for(var i =0; i<bars.length; i++){bars[i].style.backgroundColor = BAR_COLOR_SORTED}
            enable();
        }
    }
}

/**
 * Sorts an array using the quicksort algorithm. This is the callback function for the quicksort button.
 *
 * @return {Promise<void>} - A promise that resolves when the sorting is complete.
 */
async function quickSort(){
    let num_comparisons = 0;
    let num_swaps = 0;
    let recursive_calls = 0;
    let recursion_depth = 0;
    let bars = document.querySelectorAll(".bar")
    var valuesArray = []
    for(var i = 0; i<bars.length; i++){
        valuesArray.push(parseInt(bars[i].childNodes[0].innerHTML))
    }

    //make the initial function call on the array
    sort(valuesArray,0,valuesArray.length-1, recursion_depth);

    /**
     * Partitions an array using the quicksort algorithm.
     *
     * @param {Array} array - The array to be partitioned.
     * @param {number} low - The starting index of the subarray to be partitioned.
     * @param {number} high - The ending index of the subarray to be partitioned.
     * @param {number} depth - The current depth of recursion.
     * @return {Promise<number>} - The index of the pivot element after partitioning.
     */
    async function partition(array, low, high, depth){
        bars[high].style.backgroundColor = BAR_COLOR_SORTED
        var pivot_value = array[high]
        var i = (low-1)
        await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        if(await checkExecution() == false) return;
        for(var j = low; j<high; j++){
            // turn the current value being compared to pivot blue
            bars[j].style.backgroundColor = BAR_COLOR_SELECTED_1 
            // turn the current pivot value red 
            bars[i+1].style.backgroundColor = BAR_COLOR_SELECTED_2 
            await delay(SPEED_SHOW_SELECT/SPEED_MODIFIER)
            if(await checkExecution() == false) return;
            bars[j].style.backgroundColor = DEFAULT_BAR_COLOR
            bars[i+1].style.backgroundColor = DEFAULT_BAR_COLOR
            if(array[j] <= pivot_value){ // if the jth element in the array is smaller than the pivot, swap it with the ith element
                // increment the pivot index
                i++
                var temp1 = array[i]
                array[i] = array[j]
                array[j] = temp1
                swapBars(bars, i, j);
                num_swaps++;
                await delay(SPEED_SHOW_SWAP/SPEED_MODIFIER);            
            }
            num_comparisons++;
            updateMiscText("Comparisons: " + num_comparisons + " | Swaps: " + num_swaps + " | Recursive calls: " + recursive_calls + " | Recursion depth: " + depth);
        }
        swapBars(bars, high, i+1);  // emplace the pivot in the correct place
        num_swaps++;
        bars[high].style.backgroundColor = DEFAULT_BAR_COLOR
        bars[i+1].style.backgroundColor = "lime" // make the pivot green to show it is now in its correct sorted position
        updateMiscText("Comparisons: " + num_comparisons + " | Swaps: " + num_swaps + " | Recursive calls: " + recursive_calls + " | Recursion depth: " + depth);
        await delay(SPEED_SHOW_SWAP/SPEED_MODIFIER);
        // update the auxiliary array with the sorted values
        var temp3 = array[i+1]
        array[i+1] = array[high]
        array[high] = temp3
        return i+1
    }
    /**
     * Sorts an array using the quicksort algorithm.
     *
     * @param {Array} array - The array to be sorted.
     * @param {number} low - The starting index of the subarray to be sorted.
     * @param {number} high - The ending index of the subarray to be sorted.
     * @param {number} depth - The current depth of recursion.
     * @return {Promise<void>} - A promise that resolves when the sorting is complete.
     */
    async function sort(array, low, high, depth){
        if(low<high){
            recursive_calls++; 
            var pi = await partition(array, low, high, depth);
            depth++;
            await sort(array, low, pi-1, depth);
            await sort(array, pi+1, high, depth);
        }
        var temparray = []
        for(var i = 0; i<bars.length; i++){
            temparray.push(parseInt(bars[i].childNodes[0].innerHTML))
        }
        function isArraySorted(arr) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i + 1] && arr[i + 1] > arr[i]) {
                continue;
              } else if (arr[i + 1] && arr[i + 1] < arr[i]) {
                return false;
              }
            }
            return true;
          }
        if(isArraySorted(temparray)){
            for(var i =0; i<bars.length; i++){bars[i].style.backgroundColor = BAR_COLOR_SORTED}
            enable()
        }
    }

}

/**
 * Returns a promise that resolves after the specified number of milliseconds.
 * @param {number} milliseconds - The number of milliseconds to delay.
 * @returns {Promise<void>} - A promise that resolves after the specified number of milliseconds.
 */
async function delay(ms){
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, ms)
    );
} 


/**
 * Updates the speed modifier based on the value selected in the 'speed' dropdown.
 * Allows execution speed of algorithm to be changed in real time.
 * @return {void} This function does not return anything.
 */
function changeSpeed()
{
    SPEED_MODIFIER = parseInt(document.getElementById("speed").value);
}

/**
 * Disables all the buttons in the buttons array by setting their disabled property to true and changing their background color to the disabled color.
 * Only affects the generate and algorithm select buttons.
 *
 * @return {void} This function does not return anything.
 */
function disable() {
  const buttons = [
    "generateButton",
    "selectionSortButton",
    "bubbleSortButton",
    "insertionSortButton",
    "mergeSortButton",
    "quickSortButton",
  ];

  buttons.forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    button.disabled = true;
    button.style.backgroundColor = BUTTON_COLOR_DISABLED;
  });
}

/**
 * Enables all buttons in the buttons array by setting their disabled property to false and changing their background color to the enabled color.
 * Only affects the generate and algorithm select buttons.
 * @return {void} This function does not return anything.
 */
function enable() {
  const buttons = [
    "generateButton",
    "selectionSortButton",
    "abortButton",
    "bubbleSortButton",
    "insertionSortButton",
    "mergeSortButton",
    "quickSortButton",
  ];

  buttons.forEach(buttonId => {
    const button = document.getElementById(buttonId);
    button.disabled = false;
    button.style.backgroundColor = BUTTON_COLOR_ENABLED;
  });
}

/**
 * Shows the description for a given algorithm. Triggered when user hovers over an algorithm button.
 *
 * @param {string} algorithm - The name of the algorithm.
 * @return {void} This function does not return anything.
 */
function showDesc(algorithm){
    d = document.getElementsByClassName("desc");
    for (var i = 0; i<d.length; i++){
        d[i].style.display="none";
    }
    if(algorithm == "bubble"){
        document.getElementById('bubble-desc').style.display='inline';
    }
    if(algorithm == "selection"){
        document.getElementById('selection-desc').style.display='inline';
    }
    if(algorithm == "insertion"){
        document.getElementById('insertion-desc').style.display='inline';
    }
    if(algorithm == "merge"){
        document.getElementById('merge-desc').style.display='inline';
    }
    if(algorithm == "quick"){
        document.getElementById('quick-desc').style.display='inline';
    }
}

/**
 * Generates a new array based on the selected value in the 'barselect' dropdown.
 * The generated array is passed to the 'generatebars' function.
 *
 * @return {void} This function does not return a value.
 */
function init() //generate a new array
{
    var bars = document.getElementById("barselect")//modify speed on function call
    var barsInt = parseInt(bars.value)
    SPEED_MODIFIER = 1;
    generatebars(barsInt)
}

init()//generate initial array when page is loaded 
