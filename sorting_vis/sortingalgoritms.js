const container = document.querySelector(".data-container");
const MAX_VALUE = 100
var runAlgorithm = true
var ABORT_ALGORITHM = false
var SPEED_CONSTANT = 400
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

function generatebars(num) { // function to generate bars
    document.getElementById("abortButton").disabled = false
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR; //reset the abort button
    ABORT_ALGORITHM = false //set the abort flag to false
    previousbars = document.getElementsByClassName("bar")
    if(previousbars.length>0){ //if there were bars from a previous array, remove them all
        while(previousbars.length > 0){
            previousbars[0].parentNode.removeChild(previousbars[0])
        }
    }
    SPEED_CONSTANT = 400
    document.getElementById("data-container").style.width = `${(num * 27)}px`;
    for (let i = 0; i < num; i += 1) { //generate 'num' amount of bars with random values from 1 to 'max_value'
        const value = Math.floor(Math.random() * MAX_VALUE) + 1;   
        const bar = document.createElement("div");
        bar.classList.add("bar"); // To add class "bar" to "div"
        bar.style.height = `${value * (1/3)}vh`;  // Provide height to the bar
        bar.style.transform = `translateX(${i * BAR_WIDTH}px)`; // Translate the bar towards positive X axis 
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        bar.appendChild(barLabel);
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
        enable();
        generate();
        return;
    }
}

async function pauseCheck(){
    while(!runAlgorithm){
        await sleep(SPEED_CONSTANT);
    }
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 0)
    )
}

function swapBars(bars, bar_idx_1, bar_idx_2){
    var temp1 = bars[bar_idx_1].style.height;
    var temp2 = bars[bar_idx_1].childNodes[0].innerText;
    bars[bar_idx_1].style.height = bars[bar_idx_2].style.height;
    bars[bar_idx_2].style.height = temp1;
    bars[bar_idx_1].childNodes[0].innerText = bars[bar_idx_2].childNodes[0].innerText;
    bars[bar_idx_2].childNodes[0].innerText = temp2;
}
 
async function SelectionSort(delay = 300) { //function to perform "Selection Sort"
    var e = document.getElementById("speed")//modify speed on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / (sc*2.5)

    let bars = document.querySelectorAll(".bar");
    // Assign 0 to min_idx
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {
    abortCheck();
    await pauseCheck();
    
    min_idx = i; // Assign i to min_idx

    bars[i].style.backgroundColor = BAR_COLOR_2; // Provide darkblue color to the ith bar
    for (var j = i + 1; j < bars.length; j += 1) {
        bars[j].style.backgroundColor = BAR_COLOR_3; // Provide red color to the jth bar
        await pauseCheck();
        abortCheck();
        await sleep(SPEED_CONSTANT) //slow execution so users can see the process occuring 
        
        var val1 = parseInt(bars[j].childNodes[0].innerHTML); // To store the integer value of jth bar to var1  
        var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML); // To store the integer value of (min_idx)th bar to var2 
        
        if (val1 < val2) { // Compare val1 & val2
            if (min_idx !== i) {
                bars[min_idx].style.backgroundColor = BAR_COLOR;  // Provide skyblue color to the (min-idx)th bar
            }
            min_idx = j;
        } else {
        bars[j].style.backgroundColor = BAR_COLOR; // Provide skyblue color to the jth bar
        }
    }
    swapBars(bars, min_idx, i); //swap ith and (min_idx)th bar
    await sleep(SPEED_CONSTANT)
    bars[min_idx].style.backgroundColor = BAR_COLOR; // Provide skyblue color to the (min-idx)th bar
    bars[i].style.backgroundColor = BAR_COLOR_4; // Provide lightgreen color to the ith bar
  }
  enable()
}

async function bubbleSort(){
    var e = document.getElementById("speed")//modify speed on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / (sc * 3)
    let bars = document.querySelectorAll(".bar");
    var swapped = true //keep track of weather a swap took place 
    while(swapped){
        swapped = false //set swapped to false by default
        for(var i = 0; i < bars.length - 1; i++){
            await pauseCheck();
            abortCheck()
            var val1 = parseInt(bars[i].childNodes[0].innerHTML); // get the value of the i and ith+1 bar 
            var val2 = parseInt(bars[i+1].childNodes[0].innerHTML);
            bars[i].style.backgroundColor = BAR_COLOR_3;  //change the bars red to show comparison
            bars[i+1].style.backgroundColor = BAR_COLOR_3;

            await sleep(SPEED_CONSTANT)
            
            if(val1 > val2){//if the ith value is greater than the value after is, swap the values
                swapped = true //change swapped to true because there was a swap
                swapBars(bars, i, i+1); //swaps the bars values and heights
            }
            bars[i].style.backgroundColor=BAR_COLOR; //change bars back to their normal color
            bars[i+1].style.backgroundColor=BAR_COLOR;
        }
    }
    for( var d = 0; d < bars.length; d++){//after there are no more swaps to be done change all the bars colors to green
        bars[d].style.backgroundColor = BAR_COLOR_4
    }
    enable()//re-enable the buttons after execution
}

async function insertionSort(){
    var e = document.getElementById("speed")//modify the speed on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = (SPEED_CONSTANT+100) / (sc*2)

    let bars = document.querySelectorAll(".bar");
    for(var i = 0; i<bars.length; i++){
        bars[i].style.backgroundColor = BAR_COLOR_2 //make the ith bar the "key"
        key = parseInt(bars[i].childNodes[0].innerHTML)
        var j = i - 1  //j is the index in front of the key
        abortCheck();
        await pauseCheck();
        
        while(j>=0 && parseInt(bars[j].childNodes[0].innerHTML) > key){ //while there is still a value in front of the key index and that value is larger than the key,
            abortCheck()                                                //swap the two values until you can "insert" the key in between a value smaller than it and a value larger than it
            await sleep(SPEED_CONSTANT)
            await pauseCheck();
            bars[j].style.backgroundColor = BAR_COLOR_3 //change the jth bar red to show comparison 
            swapBars(bars, j, j+1); //swap the ith and the jth values values (i = j+1)
            bars[j].style.backgroundColor = BAR_COLOR_2
            bars[j+1].style.backgroundColor = BAR_COLOR
            j-- //decrement j
            await sleep(SPEED_CONSTANT)
        }
        bars[i].style.backgroundColor = BAR_COLOR
        bars[j+1].style.height = key * 30
        bars[j+1].style.backgroundColor = BAR_COLOR
        bars[j+1].childNodes[0].innterText = key
    }
    for( var d = 0; d < bars.length; d++){ //change all the buttons green when sorted
        bars[d].style.backgroundColor = BAR_COLOR_4
    }
    enable()
}

async function mergeSort(){
    var e = document.getElementById("speed")//modify speed constant on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / (sc*2)
    let bars = document.querySelectorAll(".bar") //store all the bar values into an array of integers to make it easier to work with
    var valuesArray = [] //create an auxiliary array to aid with visualization 
    for(var i = 0; i<bars.length; i++){
        valuesArray.push(parseInt(bars[i].childNodes[0].innerHTML))
    }
    //make the initial function call on the array
    doMergeSort(valuesArray, 0, valuesArray.length - 1)
    async function doMergeSort(valueArray,start,end){
        abortCheck();
        await pauseCheck();
        if(start<end){
            var mid = parseInt((start + end) / 2)
            await doMergeSort(valueArray, start, mid) //recursively call doMergeSort function
            await doMergeSort(valuesArray, mid+1, end)
            //await sleep(SPEED_CONSTANT*1.5)
            await merge(valuesArray, start, mid, end)
        }
    }
    async function merge(valueArray,start,mid,end){
        abortCheck();
        await pauseCheck();
        var tempArray = [];
        var i = start;
        var j  = mid + 1;
        var k = 0;
        for(var h = i; h <= end; h++){bars[h].style.backgroundColor = BAR_COLOR_2}
        await sleep(SPEED_CONSTANT*3);
        while(i <= mid && j <= end){
            abortCheck();
            await pauseCheck();
            bars[i].style.backgroundColor = BAR_COLOR_3; //change bar color to red to show comparison
            bars[j].style.backgroundColor = BAR_COLOR_3;
            await sleep(SPEED_CONSTANT*3);          
            if(valueArray[i] <= valueArray[j]){
                bars[i].style.backgroundColor = BAR_COLOR_4; //change bar color to green to show its been added to the temporary sorted array
                bars[j].style.backgroundColor = BAR_COLOR_2;
                tempArray[k] = valueArray[i];
                k++;
                i++;
                }else{
                bars[i].style.backgroundColor = BAR_COLOR_2;
                bars[j].style.backgroundColor = BAR_COLOR_4; //change bar color to green to show its been added to the temporary sorted array
                tempArray[k] = valueArray[j];
                k++;
                j++;
            }
            await sleep(SPEED_CONSTANT);
        }
        await sleep(SPEED_CONSTANT);
        while(i <= mid){
            tempArray[k] = valueArray[i];
            bars[i].style.backgroundColor = BAR_COLOR_4;
            k++;
            i++;
            await sleep(SPEED_CONSTANT*2);
        }
        while(j <= end){
            tempArray[k] = valueArray[j];
            bars[j].style.backgroundColor = BAR_COLOR_4;
            k++;
            j++;
            await sleep(SPEED_CONSTANT*2);
        }
        for(var i = start; i <= end; i++){ //swap the values in tempArray with bars on screen to display sorted array section
            var newbarheight = parseInt(tempArray[i-start]);
            bars[i].style.height = `${newbarheight * 1/3}vh`;
            bars[i].childNodes[0].innerText = newbarheight;
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

 function generate() //generate a new array
{
    var b = document.getElementById("bars")//modify speed on function call
    var bn = parseInt(b.value)
    generatebars(bn)
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
}

generate()//generate initial array when page is loaded 
