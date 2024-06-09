const container = document.querySelector(".data-container");
const MAX_VALUE = 100
var runAlgorithm = true
var ABORT_ALGORITHM = false
var SPEED_CONSTANT = 400
let SPEED_MODIFIER = 1;
const SPEED_SHOW_SELECT = 500;
const SPEED_SHOW_SWAP = 300;
const BUTTON_COLOR = "mediumblue"
const BUTTON_COLOR_DISABLED = "mediumslateblue"
const BAR_COLOR = "deepskyblue"
const BAR_COLOR_2 = "darkblue"
const BAR_COLOR_3 = "red"
const BAR_COLOR_4 = "rgb(49, 226, 13)"
var BAR_WIDTH = 27
var BAR_HEIGHT_CONST = 1

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //adjust the bar width to be smaller when on mobile
    BAR_WIDTH = 20
    BAR_HEIGHT_CONST = 2
  }else{
    BAR_WIDTH = 27
    BAR_HEIGHT_CONST = 1
  }

function stop(){
    document.getElementById("abortButton").disabled = true
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR_DISABLED;
    if(!ABORT_ALGORITHM){
        ABORT_ALGORITHM = true;
    }
}


function generate() {
    var bars = document.getElementById("barselect")//modify speed on function call
    var barsInt = parseInt(bars.value)
    generatebars(barsInt)
}
/**
 * Generates 'num' amount of bars with random values from 1 to 'MAX_VALUE'
 * and appends them to the 'container' element.
 * 
 * @param {number} num - The number of bars to generate.
 */
function generatebars(num) {
    // Reset the abort button
    document.getElementById("abortButton").disabled = false;
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR;
    // Set the abort flag to false
    ABORT_ALGORITHM = false;

    // Remove all previous bars
    const previousbars = document.getElementsByClassName("bar");
    while (previousbars.length > 0) {
        previousbars[0].parentNode.removeChild(previousbars[0]);
    }

    // Reset the speed constant
    SPEED_CONSTANT = 400;

    // Calculate the bar width based on the container width and number of bars
    const container_width_vw = document.getElementById("data-container").getBoundingClientRect().width / window.innerWidth * 100;
    BAR_SPACING = container_width_vw / num;
    // Subtract 5% of the bar width so they don't overlap
    BAR_WIDTH = BAR_SPACING - (BAR_SPACING * 0.15);

    for (let i = 0; i < num; i += 1) {
        // Generate a random value between 1 and MAX_VALUE
        const value = Math.floor(Math.random() * MAX_VALUE) + 1;

        // Create a new bar element
        const bar = document.createElement("div");
        bar.classList.add("bar"); // Add class "bar" to the div

        // Set the height of the bar based on the value
        bar.style.height = `${value * (1 / 3)}vh`;
        
        // Translate the bar towards positive X axis
        bar.style.transform = `translateX(${i * BAR_SPACING}vw)`;
        bar.style.width = `${BAR_WIDTH}vw`;

        if(num < 50)
        {
            // Create a label element to display the value of the bar
            const barLabel = document.createElement("label");
            barLabel.classList.add("bar_id");
            barLabel.innerHTML = value;
            bar.appendChild(barLabel);
        }

        // Append the bar to the container
        container.appendChild(bar);
    }
}

function stopStartAlgorithm(){
    if(runAlgorithm){
        runAlgorithm = false;
        document.getElementById("pauseButton").innerHTML = "Start Algorithm"
    }else{
        runAlgorithm = true;
        document.getElementById("pauseButton").innerHTML = "Pause Algorithm"
    }
}

function abortCheck(){
    if(ABORT_ALGORITHM){
        if(runAlgorithm == false){
            runAlgorithm = true;
            document.getElementById("pauseButton").innerHTML = "Pause Algorithm"
        }
        enable();
        generate();
        return;
    }
}

async function pauseCheck(){
    while(!runAlgorithm){
        await sleep(SPEED_CONSTANT);
        abortCheck();
    }
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 0)
    )
}

async function checkExecution(){
    if(ABORT_ALGORITHM)
    {
        enable();
        return false;
    } 
    while(!runAlgorithm){
        await sleep(SPEED_CONSTANT);
        if(ABORT_ALGORITHM)
        {
            enable();
            return false;
        } 
    }
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 0)
    )
}

async function swapBars(bars, bar_idx_1, bar_idx_2){
    var temp1 = bars[bar_idx_1].style.height;
    var temp2 = bars[bar_idx_1].childNodes[0].innerText;
    bars[bar_idx_1].style.height = bars[bar_idx_2].style.height;
    bars[bar_idx_2].style.height = temp1;
    bars[bar_idx_1].childNodes[0].innerText = bars[bar_idx_2].childNodes[0].innerText;
    bars[bar_idx_2].childNodes[0].innerText = temp2;
    await sleep(SPEED_SHOW_SWAP/SPEED_MODIFIER);
}

function algorithmFinished(bars)
{
    for( var d = 0; d < bars.length; d++){//after there are no more swaps to be done change all the bars colors to green
        bars[d].style.backgroundColor = BAR_COLOR_4
    }
    enable()//re-enable the buttons after execution
}

function updateMiscText(text){
    document.getElementById("miscAlgorithmDescText").innerHTML = text
}
 
async function SelectionSort(delay = 300) { //function to perform "Selection Sort"
    SPEED_MODIFIER = parseInt(document.getElementById("speed"));//modify speed on function call
    let bars = document.querySelectorAll(".bar");
    var comparison_counter = 0;
    var swap_counter = 0;
    // Assign 0 to min_idx
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {
        if(await checkExecution() == false) return;
        min_idx = i; // Assign i to min_idx
        bars[i].style.backgroundColor = BAR_COLOR_2; // Provide darkblue color to the ith bar
        for (var j = i + 1; j < bars.length; j += 1) {
            bars[j].style.backgroundColor = BAR_COLOR_3; // Provide red color to the jth bar
            if(await checkExecution() == false) return;
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER) //slow execution so users can see the process occuring 
            
            var val1 = parseInt(bars[j].childNodes[0].innerHTML); // To store the integer value of jth bar to var1  
            var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML); // To store the integer value of (min_idx)th bar to var2 
            
            if (val1 < val2) { // Compare val1 & val2
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = BAR_COLOR;  // Provide skyblue color to the (min-idx)th bar
                }
                min_idx = j;
            } 
            else
            {
                bars[j].style.backgroundColor = BAR_COLOR; // Provide skyblue color to the jth bar
            }
            comparison_counter++;
            updateMiscText("Comparisons: " + comparison_counter + " | Swaps: " + swap_counter)
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        swapBars(bars, min_idx, i); //swap ith and (min_idx)th bar
        swap_counter++;
        updateMiscText("Comparisons: " + comparison_counter + " | Swaps: " + swap_counter)
        await sleep(SPEED_SHOW_SWAP/SPEED_MODIFIER);
        bars[min_idx].style.backgroundColor = BAR_COLOR; // Provide skyblue color to the (min-idx)th bar
        bars[i].style.backgroundColor = BAR_COLOR_4; // Provide lightgreen color to the ith bar
    }
    algorithmFinished(bars);
}

/**
 * This function performs bubble sort on the bars.
 * It keeps looping until there are no more swaps, and
 * keeps track of the number of comparisons and swaps.
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
            bars[i].style.backgroundColor = BAR_COLOR_3;
            bars[i+1].style.backgroundColor = BAR_COLOR_3;

            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
            //if the ith value is greater than the value after is, swap the values
            if(val1 > val2){
                swapped = true
                swap_counter++;
                await swapBars(bars, i, i+1);
            }
            //change bars back to their normal color
            bars[i].style.backgroundColor=BAR_COLOR; 
            bars[i+1].style.backgroundColor=BAR_COLOR;
            updateMiscText("Comparisons: " + comparison_counter++ + " Swaps: " + swap_counter);
        }
    }
    while(swapped);
    algorithmFinished(bars);
}

async function insertionSort(){
    SPEED_MODIFIER = parseInt(document.getElementById("speed").value);
    let bars = document.querySelectorAll(".bar");
    var comparison_counter = 0;
    var swap_counter = 0;
    // start at index 1 and make it the key
    for(var i = 1; i<bars.length; i++)
    {
        bars[i].style.backgroundColor = BAR_COLOR_2;
        await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        // get the value of the ith bar
        key = parseInt(bars[i].childNodes[0].innerHTML);
        // compare the key to the value in front of it
        var j = i - 1;       
        // loop until the key is less than the value in front of it
        while(j>=0){ 
            if(await checkExecution() == false) return;
            bars[j].style.backgroundColor = BAR_COLOR_3; //change the jth bar red to show comparison 
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
            // if the key is less than the value in front of it, swap the values
            if(parseInt(bars[j].childNodes[0].innerHTML) > key)
            {
                swapBars(bars, j, j+1); //swap the ith and the jth values values
                swap_counter++;
                await sleep(SPEED_SHOW_SWAP/SPEED_MODIFIER);
            }
            else
            {   // found the correct position for the key, so break out of the loop and change the colors back
                bars[j].style.backgroundColor = BAR_COLOR;
                bars[j+1].style.backgroundColor = BAR_COLOR;
                break;
            }
            // restore the color of the swapped bar, mark the jth bar as dark blue
            bars[j].style.backgroundColor = BAR_COLOR_2;
            bars[j+1].style.backgroundColor = BAR_COLOR;
            j--;
            updateMiscText("Comparisons: " + comparison_counter++ + " | Swaps: " + swap_counter);
        }
        updateMiscText("Comparisons: " + comparison_counter++ + " | Swaps: " + swap_counter);
        bars[i].style.backgroundColor = BAR_COLOR;
        bars[j+1].style.height = key * 30;
        bars[j+1].style.backgroundColor = BAR_COLOR;
        bars[j+1].childNodes[0].innterText = key;
    }
    algorithmFinished(bars);
}

async function mergeSort(){
    let bars = document.querySelectorAll(".bar");
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
            recursive_calls+=2;
            depth++;
            await doMergeSort(valueArray, start, mid, depth) //recursively call doMergeSort function
            await doMergeSort(valuesArray, mid+1, end, depth)
            //await sleep(SPEED_CONSTANT*1.5)
            await merge(valuesArray, start, mid, end, depth)
        }
    updateMiscText("Current Depth: " + depth + " | Current Recursive calls: " + recursive_calls);
}

    async function merge(valueArray,start,mid,end, depth){
        if(await checkExecution() == false) return;
        updateMiscText("Current Depth: " + depth + " | Current Recursive calls: " + recursive_calls);
        var tempArray = [];
        var i = start;
        var j  = mid + 1;
        var k = 0;
        for(var h = i; h <= end; h++){bars[h].style.backgroundColor = BAR_COLOR_2}
        await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        while(i <= mid && j <= end){
            abortCheck();
            await pauseCheck();
            bars[i].style.backgroundColor = BAR_COLOR_3; //change bar color to red to show comparison
            bars[j].style.backgroundColor = BAR_COLOR_3;
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);          
            if(valueArray[i] <= valueArray[j]){
                bars[i].style.backgroundColor = BAR_COLOR_4; //change bar color to green to show its been added to the temporary sorted array
                bars[j].style.backgroundColor = BAR_COLOR_2;
                tempArray[k] = valueArray[i];
                // underneath the bar, display the order in the temporary sorted array in which the values have been added
                k++;
                i++;
                }
                else
                {
                bars[i].style.backgroundColor = BAR_COLOR_2;
                bars[j].style.backgroundColor = BAR_COLOR_4; //change bar color to green to show its been added to the temporary sorted array
                tempArray[k] = valueArray[j];
                k++;
                j++;
            }
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        while(i <= mid){
            tempArray[k] = valueArray[i];
            bars[i].style.backgroundColor = BAR_COLOR_4;
            k++;
            i++;
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        while(j <= end){
            tempArray[k] = valueArray[j];
            bars[j].style.backgroundColor = BAR_COLOR_4;
            k++;
            j++;
            await sleep(SPEED_SHOW_SELECT/SPEED_MODIFIER);
        }
        for(var i = start; i <= end; i++){ //swap the values in tempArray with bars on screen to display sorted array section
            var newbarheight = parseInt(tempArray[i-start]);
            bars[i].style.height = `${newbarheight * 1/3}vh`;
            if(valueArray.size < 50)
            {
                bars[i].childNodes[0].innerText = newbarheight;
            }
            bars[i].style.backgroundColor = BAR_COLOR;
            valueArray[i] = tempArray[i - start];
        }
        if(tempArray.length == valueArray.length){//re-enables the buttons when the algorithm is finished
            for(var i =0; i<bars.length; i++){bars[i].style.backgroundColor = BAR_COLOR_4}
            enable();
        }
    }
}


async function quickSort(){
    var e = document.getElementById("speed")
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / sc
    let bars = document.querySelectorAll(".bar")
    var valuesArray = []
    for(var i = 0; i<bars.length; i++){
        valuesArray.push(parseInt(bars[i].childNodes[0].innerHTML))
    }

    sort(valuesArray,0,valuesArray.length-1)

    async function partition(array, low, high){
        abortCheck();
        pauseCheck();
        bars[high].style.backgroundColor = BAR_COLOR_4
        await sleep(SPEED_CONSTANT)
        var pivot = array[high]
        var i = (low-1)
        for(var j = low; j<high; j++){
            bars[j].style.backgroundColor = BAR_COLOR_2 //turn the current value being compared to pivot blue
            bars[i+1].style.backgroundColor = BAR_COLOR_3 //turn the current index to that the value being compared to pivot will be swapped to if it is less than pivot
            await sleep(SPEED_CONSTANT)
            await pauseCheck();
            abortCheck();

            bars[j].style.backgroundColor = BAR_COLOR
            bars[i+1].style.backgroundColor = BAR_COLOR
            if(array[j] <= pivot){ // if the jth element in the array is smaller than the pivot, swap it with the ith element
                
                i++
                var temp1 = array[i]
                array[i] = array[j]
                array[j] = temp1
                swapBars(bars, i, j);                
            }
        }
        swapBars(bars, high, i+1);//swap the values of the high 
        bars[high].style.backgroundColor = BAR_COLOR
        bars[i+1].style.backgroundColor = "lime"
        await sleep(SPEED_CONSTANT)
        var temp3 = array[i+1]
        array[i+1] = array[high]
        array[high] = temp3
        return i+1
    }

    async function sort(array,low,high){
        abortCheck();
        await pauseCheck();
        if(low<high){
            var pi = await partition(array,low,high)
            await sort(array, low, pi-1)
            await sort(array,pi+1,high)
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
            for(var i =0; i<bars.length; i++){bars[i].style.backgroundColor = BAR_COLOR_4}
            enable()
        }
    }

}

async function sleep(ms){
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, ms)
    );
} 

 function init() //generate a new array
{
    var bars = document.getElementById("barselect")//modify speed on function call
    var barsInt = parseInt(bars.value)
    generatebars(barsInt)
}

function changeSpeed()
{
    SPEED_MODIFIER = parseInt(document.getElementById("speed").value);
}

function disable() //disables buttons after they are clicked
{ 
  document.getElementById("generateButton").disabled = true;
  document.getElementById("generateButton").style.backgroundColor = BUTTON_COLOR_DISABLED;
  
  document.getElementById("selectionSortButton").disabled = true;
  document.getElementById("selectionSortButton").style.backgroundColor = BUTTON_COLOR_DISABLED; 
  
  document.getElementById("bubbleSortButton").disabled = true;
  document.getElementById("bubbleSortButton").style.backgroundColor = BUTTON_COLOR_DISABLED; 
  
  document.getElementById("insertionSortButton").disabled = true;
  document.getElementById("insertionSortButton").style.backgroundColor = BUTTON_COLOR_DISABLED; 

  document.getElementById("mergeSortButton").disabled = true;
  document.getElementById("mergeSortButton").style.backgroundColor = BUTTON_COLOR_DISABLED; 

  document.getElementById("quickSortButton").disabled = true;
  document.getElementById("quickSortButton").style.backgroundColor = BUTTON_COLOR_DISABLED; 
}

//re-enables buttons
function enable(){

  document.getElementById("generateButton").disabled = false;
  document.getElementById("generateButton").style.backgroundColor = BUTTON_COLOR;
  
  document.getElementById("selectionSortButton").disabled = false;
  document.getElementById("selectionSortButton").style.backgroundColor = BUTTON_COLOR;

  document.getElementById("abortButton").disabled = false;
  document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR;

  document.getElementById("bubbleSortButton").disabled = false;
  document.getElementById("bubbleSortButton").style.backgroundColor = BUTTON_COLOR;

  document.getElementById("insertionSortButton").disabled = false;
  document.getElementById("insertionSortButton").style.backgroundColor = BUTTON_COLOR; 

  document.getElementById("mergeSortButton").disabled = false;
  document.getElementById("mergeSortButton").style.backgroundColor = BUTTON_COLOR; 

  document.getElementById("quickSortButton").disabled = false;
  document.getElementById("quickSortButton").style.backgroundColor = BUTTON_COLOR; 
}

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

init()//generate initial array when page is loaded 
