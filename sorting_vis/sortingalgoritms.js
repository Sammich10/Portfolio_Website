const container = document.querySelector(".data-container");

const MAX_VALUE = 100

var runAlgorithm = true

var ABORT_ALGORITHM = false

var SPEED_CONSTANT = 400

const BUTTON_COLOR = "#2d7bc4"

const BUTTON_COLOR_DISABLED = "#2d7bc480"

const BAR_COLOR = "deepskyblue"

function stop(){
    document.getElementById("abortButton").disabled = true
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR_DISABLED;
    if(!ABORT_ALGORITHM){
        ABORT_ALGORITHM = true;
    }
}
  
// function to generate bars
function generatebars(num = 35) {
    document.getElementById("abortButton").disabled = false
    document.getElementById("abortButton").style.backgroundColor = BUTTON_COLOR;
    ABORT_ALGORITHM = false

    previousbars = document.getElementsByClassName("bar")
    if(previousbars.length>0){//if there were bars from a previous array, remove them all
        while(previousbars.length > 0){
            previousbars[0].parentNode.removeChild(previousbars[0])
        }
    }
    //for loop to generate 20 bars
    for (let i = 0; i < num; i += 1) {
  
    //generate random values from 1 to max_value
    const value = Math.floor(Math.random() * MAX_VALUE) + 1; 
      
    const bar = document.createElement("div");
  
    // To add class "bar" to "div"
    bar.classList.add("bar");
  
    // Provide height to the bar
    bar.style.height = `${value * 3}px`;
  
    // Translate the bar towards positive X axis 
    bar.style.transform = `translateX(${i * 26}px)`;
      
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

  
// asynchronous function to perform "Selection Sort"
async function SelectionSort(delay = 300) {
    var e = document.getElementById("speed")//modify speed on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / (sc*1.3)

    let bars = document.querySelectorAll(".bar");
    // Assign 0 to min_idx
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {

    if(ABORT_ALGORITHM){//if the abort button is clicked, the algorithm will stop here
        enable()
        generate()
        return}

    while(!runAlgorithm){//if the pause button is clicked, stay in a loop to "pause"
        await sleep(SPEED_CONSTANT)
    }
  
    // Assign i to min_idx
    min_idx = i;
  
    // Provide darkblue color to the ith bar
    bars[i].style.backgroundColor = "darkblue";
    for (var j = i + 1; j < bars.length; j += 1) {

        // Provide red color to the jth bar
        bars[j].style.backgroundColor = "red";
        //if the pause button is clicked, stay in a loop to "pause"
        while(!runAlgorithm){
            await sleep(SPEED_CONSTANT)
        }
  
        
      await sleep(SPEED_CONSTANT)
  
      // To store the integer value of jth bar to var1 
      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
  
      // To store the integer value of (min_idx)th bar to var2 
      var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
        
      // Compare val1 & val2
      if (val1 < val2) {
        if (min_idx !== i) {
  
          // Provide skyblue color to the (min-idx)th bar
          bars[min_idx].style.backgroundColor = BAR_COLOR;
        }
        min_idx = j;
      } else {
  
        // Provide skyblue color to the jth bar
        bars[j].style.backgroundColor = BAR_COLOR;
      }
    }
  
    // To swap ith and (min_idx)th bar
    var temp1 = bars[min_idx].style.height;
    var temp2 = bars[min_idx].childNodes[0].innerText;
    bars[min_idx].style.height = bars[i].style.height;
    bars[i].style.height = temp1;
    bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = temp2;
      
    await sleep(SPEED_CONSTANT)
  
    // Provide skyblue color to the (min-idx)th bar
    bars[min_idx].style.backgroundColor = BAR_COLOR;
  
    // Provide lightgreen color to the ith bar
    bars[i].style.backgroundColor = BAR_COLOR;
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

        if(ABORT_ALGORITHM){//if the abort button is clicked, end execution here
            enable()
            generate()
            return}

        swapped = false //set swapped to false by default
        for(var i = 0; i < bars.length - 1; i++){
            while(!runAlgorithm){
                await sleep(SPEED_CONSTANT)
            }
            // get the value of the i and ith+1 bar 
            var val1 = parseInt(bars[i].childNodes[0].innerHTML); 
            var val2 = parseInt(bars[i+1].childNodes[0].innerHTML);
            //change the bars red to show comparison
            bars[i].style.backgroundColor = "red";  
            bars[i+1].style.backgroundColor = "red";

            await sleep(SPEED_CONSTANT)
            
            if(val1 > val2){//if the ith value is greater than the value after is, swap the values
                            //over time this will "bubble" the smaller values to the beginning of the list

                //change swapped to true because there was a swap
                swapped = true 
                //swaps the bars values and heights
                var temp1 = bars[i].style.height;
                var temp2 = bars[i].childNodes[0].innerText;
                bars[i].style.height = bars[i+1].style.height;
                bars[i+1].style.height = temp1;
                bars[i].childNodes[0].innerText = bars[i+1].childNodes[0].innerText;
                bars[i+1].childNodes[0].innerText = temp2;
            }
            //change bars back to their normal color
            bars[i].style.backgroundColor=BAR_COLOR;
            bars[i+1].style.backgroundColor=BAR_COLOR;
        }
    }
    for( var d = 0; d < bars.length; d++){//after there are no more swaps to be done change all the bars colors to green
        bars[d].style.backgroundColor = " rgb(49, 226, 13)"
    }
    enable()//re-enable the buttons
}

async function insertionSort(){
    var e = document.getElementById("speed")//modify the speed on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = (SPEED_CONSTANT+100) / (sc*2)

    let bars = document.querySelectorAll(".bar");
    for(var i = 0; i<bars.length; i++){
        //make the ith bar the "key"
        bars[i].style.backgroundColor = "darkBlue"
        key = parseInt(bars[i].childNodes[0].innerHTML)
        //j is the index in front of the key
        var j = i - 1 

        if(ABORT_ALGORITHM){//abort if button is clicked
            enable()
            generate()
            return}
        
        while(j>=0 && parseInt(bars[j].childNodes[0].innerHTML) > key){ //while there is still a value in front of the key index and that value is larger than the key,
                                                                        //swap the two values until you can "insert" the key in between a value smaller than it and a value larger than it
            //change the jth bar red to show comparison 
            bars[j].style.backgroundColor = "red"
            await sleep(SPEED_CONSTANT)
            while(!runAlgorithm){
                await sleep(SPEED_CONSTANT)
            }
            //swap the ith and the jth values values (i = j+1)
            var temp1 = bars[j].style.height;
            var temp2 = bars[j].childNodes[0].innerText;
            bars[j].style.height = bars[j+1].style.height;
            bars[j+1].style.height = temp1;
            bars[j].childNodes[0].innerText = bars[j+1].childNodes[0].innerText;
            bars[j+1].childNodes[0].innerText = temp2;
            bars[j].style.backgroundColor = "darkBlue"
            bars[j+1].style.backgroundColor = BAR_COLOR
            //decrement j
            j--
            await sleep(SPEED_CONSTANT)
        }
        bars[i].style.backgroundColor = BAR_COLOR
        bars[j+1].style.height = key * 30
        bars[j+1].style.backgroundColor = BAR_COLOR
        bars[j+1].childNodes[0].innterText = key
    }
    for( var d = 0; d < bars.length; d++){//change all the buttons green when sorted
        bars[d].style.backgroundColor = " rgb(49, 226, 13)"
    }
    enable()
}

async function mergeSort(){
    var e = document.getElementById("speed")//modify speed constant on function call
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / (sc*3)

    let bars = document.querySelectorAll(".bar")
    //store all the bar values into an array of integers to make it easier to work with
    var valuesArray = []
    for(var i = 0; i<bars.length; i++){
        valuesArray.push(parseInt(bars[i].childNodes[0].innerHTML))
    }
    //make the initial function call on the array
    doMergeSort(valuesArray, 0, valuesArray.length - 1)

    async function doMergeSort(valueArray,start,end){

        if(ABORT_ALGORITHM){//abort here if button is clicked
            enable()
            generate()
            return}

        while(!runAlgorithm){await sleep(SPEED_CONSTANT)}

        await sleep(SPEED_CONSTANT)

        if(start<end){

            var mid = parseInt((start + end) / 2)

            await doMergeSort(valueArray, start, mid)
            await doMergeSort(valuesArray, mid+1, end)
            await sleep(SPEED_CONSTANT*1.5)
            await merge(valuesArray, start, mid, end)
        }
    }
    async function merge(valueArray,start,mid,end){

        if(ABORT_ALGORITHM){
            enable()
            generate()
            return}

        var tempArray = []
        var i = start
        var j  = mid + 1
        var k = 0

        while(i <= mid && j <= end){
            //change bar color to red to show comparison
            bars[i].style.backgroundColor = "red"
            bars[j].style.backgroundColor = "red"

            await sleep(SPEED_CONSTANT)

            //change bar color to green to show its been added to the temporary sorted array
            bars[i].style.backgroundColor = "green"
            bars[j].style.backgroundColor = "green"
            
            if(valueArray[i] <= valueArray[j]){

                tempArray[k] = valueArray[i]
                k++
                i++
                }else{
                
                tempArray[k] = valueArray[j]
                k++
                j++
            }
        }
        while(i <= mid){
            tempArray[k] = valueArray[i]
            k++
            i++
        }
        while(j <= end){
            tempArray[k] = valueArray[j]
            k++
            j++
        }
        for(var i = start; i <= end; i++){
            
            //swap the value of the ith bar with sorted values in tempArray
            var newbarheight = parseInt(tempArray[i-start])
            bars[i].style.height = `${newbarheight * 3}px`;
            bars[i].childNodes[0].innerText = newbarheight
            bars[i].style.backgroundColor = BAR_COLOR

            //actually performing the algorithm
            valueArray[i] = tempArray[i - start]
        }
        //re-enables the buttons when the algorithm is finished
        if(tempArray.length == valueArray.length){
            enable()
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

        if(ABORT_ALGORITHM){
            enable()
            generate()
            return}

        while(!runAlgorithm){await sleep(SPEED_CONSTANT)}

        bars[high].style.backgroundColor = "green"

        await sleep(SPEED_CONSTANT)

        var pivot = array[high]
        var i = (low-1)
        for(var j = low; j<high; j++){
            bars[j].style.backgroundColor = "DarkBlue" //turn the current value being compared to pivot blue
            bars[i+1].style.backgroundColor = "red" //turn the current index to that the value being compared to pivot will be swapped to if it is less than pivot

            await sleep(SPEED_CONSTANT)
            while(!runAlgorithm){await sleep(SPEED_CONSTANT)}

            bars[j].style.backgroundColor = BAR_COLOR
            bars[i+1].style.backgroundColor = BAR_COLOR
            if(array[j] <= pivot){ // if the jth element in the array is smaller than the pivot, swap it with the ith element
                
                i++
                var temp1 = array[i]
                array[i] = array[j]
                array[j] = temp1
                
                var temp1 = bars[i].style.height;
                var temp2 = bars[i].childNodes[0].innerText;
                bars[i].style.height = bars[j].style.height;
                bars[j].style.height = temp1;
                bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
                bars[j].childNodes[0].innerText = temp2;
                
            }
        }
        //swap the values of the high 
        var temp1 = bars[high].style.height;
        var temp2 = bars[high].childNodes[0].innerText;
        bars[high].style.height = bars[i+1].style.height;
        bars[i+1].style.height = temp1;
        bars[high].childNodes[0].innerText = bars[i+1].childNodes[0].innerText;
        bars[i+1].childNodes[0].innerText = temp2;

        bars[high].style.backgroundColor = BAR_COLOR
        bars[i+1].style.backgroundColor = "lime"

        await sleep(SPEED_CONSTANT)
        
        var temp3 = array[i+1]
        array[i+1] = array[high]
        array[high] = temp3

        return i+1
    }

    async function sort(array,low,high){

        if(ABORT_ALGORITHM){
            enable()
            generate()
            return}

        if(low<high){
            var pi = await partition(array,low,high)

            await sort(array, low, pi-1)
            await sort(array,pi+1,high)
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

generatebars()//generate initial array when page is loaded
  
//generate a new array
 function generate()
{
  generatebars()
 }
  
//disables buttons after they are clicked
function disable()
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
