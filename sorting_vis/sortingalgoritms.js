const container = document.querySelector(".data-container");

const MAX_VALUE = 100

var runAlgorithm = true

var ABORT_ALGORITHM = false

var SPEED_CONSTANT = 100

function stop(){
    document.getElementById("Button4").disabled = true
    document.getElementById("Button4").style.backgroundColor = "#2d7bc480";
    if(!ABORT_ALGORITHM){
        ABORT_ALGORITHM = true;
    }
}
  
// function to generate bars
function generatebars(num = 35) {
    document.getElementById("Button4").disabled = false
    document.getElementById("Button4").style.backgroundColor = "#2d7bc4";
    ABORT_ALGORITHM = false
    previousbars = document.getElementsByClassName("bar")
    if(previousbars.length>0){
        while(previousbars.length > 0){
            previousbars[0].parentNode.removeChild(previousbars[0])
        }
    }

    SPEED_CONSTANT = 150
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
        document.getElementById("Button3").innerHTML = "Start Algorithm"
    }else{
        runAlgorithm = true;
        document.getElementById("Button3").innerHTML = "Pause Algorithm"
    }
}

  
// asynchronous function to perform "Selection Sort"
async function SelectionSort(delay = 300) {
    var e = document.getElementById("speed")
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / sc
    let bars = document.querySelectorAll(".bar");
    // Assign 0 to min_idx
    var min_idx = 0;
    for (var i = 0; i < bars.length; i += 1) {

    if(ABORT_ALGORITHM){
        enable()
        generate()
        return}

    while(!runAlgorithm){
        await new Promise((resolve)=>
        setTimeout(()=>{
            resolve();
        }, SPEED_CONSTANT)
    );
    }
  
    // Assign i to min_idx
    min_idx = i;
  
    // Provide darkblue color to the ith bar
    bars[i].style.backgroundColor = "darkblue";
    for (var j = i + 1; j < bars.length; j += 1) {

        while(!runAlgorithm){
            await new Promise((resolve)=>
            setTimeout(()=>{
                resolve();
            }, SPEED_CONSTANT)
        );
        }
  
      // Provide red color to the jth bar
      bars[j].style.backgroundColor = "red";
        
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, SPEED_CONSTANT)
      );
  
      // To store the integer value of jth bar to var1 
      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
  
      // To store the integer value of (min_idx)th bar to var2 
      var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
        
      // Compare val1 & val2
      if (val1 < val2) {
        if (min_idx !== i) {
  
          // Provide skyblue color to the (min-idx)th bar
          bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
        }
        min_idx = j;
      } else {
  
        // Provide skyblue color to the jth bar
        bars[j].style.backgroundColor = "  rgb(24, 190, 255)";
      }
    }
  
    // To swap ith and (min_idx)th bar
    var temp1 = bars[min_idx].style.height;
    var temp2 = bars[min_idx].childNodes[0].innerText;
    bars[min_idx].style.height = bars[i].style.height;
    bars[i].style.height = temp1;
    bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = temp2;
      
    // To pause the execution of code for 300 milliseconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, SPEED_CONSTANT)
    );
  
    // Provide skyblue color to the (min-idx)th bar
    bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
  
    // Provide lightgreen color to the ith bar
    bars[i].style.backgroundColor = " rgb(49, 226, 13)";
  }
  enable()
}


async function bubbleSort(){
    var e = document.getElementById("speed")
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / sc
    let bars = document.querySelectorAll(".bar");
    var swapped = true
    while(swapped){
        if(ABORT_ALGORITHM){
            enable()
            generate()
            return}
        swapped = false
        for(var i = 0; i < bars.length - 1; i++){
            while(!runAlgorithm){
                await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                }, SPEED_CONSTANT)
            );
            }
            var val1 = parseInt(bars[i].childNodes[0].innerHTML);
            var val2 = parseInt(bars[i+1].childNodes[0].innerHTML);
            bars[i].style.backgroundColor = "red";
            bars[i+1].style.backgroundColor = "red";
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, SPEED_CONSTANT)
            );
            if(val1 > val2){
                swapped = true
                var temp1 = bars[i].style.height;
                var temp2 = bars[i].childNodes[0].innerText;
                bars[i].style.height = bars[i+1].style.height;
                bars[i+1].style.height = temp1;
                bars[i].childNodes[0].innerText = bars[i+1].childNodes[0].innerText;
                bars[i+1].childNodes[0].innerText = temp2;
            }
            bars[i].style.backgroundColor="#00b7ff";
            bars[i+1].style.backgroundColor="#00b7ff";
        }
    }
    for( var d = 0; d < bars.length; d++){
        bars[d].style.backgroundColor = " rgb(49, 226, 13)"
    }
    enable()
}

async function insertionSort(){
    var e = document.getElementById("speed")
    var sc = parseInt(e.value)
    SPEED_CONSTANT = SPEED_CONSTANT / sc
    let bars = document.querySelectorAll(".bar");
    for(var i = 0; i<bars.length; i++){
        bars[i].style.backgroundColor = "darkBlue"
        key = parseInt(bars[i].childNodes[0].innerHTML)
        var j = i - 1
        if(ABORT_ALGORITHM){
            enable()
            generate()
            return}
        while(j>=0 && parseInt(bars[j].childNodes[0].innerHTML) > key){
            bars[j].style.backgroundColor = "red"
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, SPEED_CONSTANT)
            );
            var temp1 = bars[j].style.height;
            var temp2 = bars[j].childNodes[0].innerText;
            bars[j].style.height = bars[j+1].style.height;
            bars[j+1].style.height = temp1;
            bars[j].childNodes[0].innerText = bars[j+1].childNodes[0].innerText;
            bars[j+1].childNodes[0].innerText = temp2;
            bars[j].style.backgroundColor = "darkBlue"
            bars[j+1].style.backgroundColor = "#00b7ff"
            j--
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, SPEED_CONSTANT)
            );
            while(!runAlgorithm){
                await new Promise((resolve)=>
                setTimeout(()=>{
                    resolve();
                }, SPEED_CONSTANT)
            );
            }
        }
        bars[i].style.backgroundColor = "#00b7ff"
        bars[j+1].style.height = key * 30
        bars[j+1].style.backgroundColor = "#00b7ff"
        bars[j+1].childNodes[0].innterText = key
    }
    for( var d = 0; d < bars.length; d++){
        bars[d].style.backgroundColor = " rgb(49, 226, 13)"
    }
    enable()
}


generatebars();


  
//generate a new array
 function generate()
{
  generatebars()
 }
  
//disables buttons after they are clicked
function disable()
{
  document.getElementById("Button1").disabled = true;
  document.getElementById("Button1").style.backgroundColor = "#2d7bc480";
  
  document.getElementById("Button2").disabled = true;
  document.getElementById("Button2").style.backgroundColor = "#2d7bc480"; 
  
  document.getElementById("bubbleSortButton").disabled = true;
  document.getElementById("bubbleSortButton").style.backgroundColor = "#2d7bc480"; 
  
  document.getElementById("insertionSortButton").disabled = true;
  document.getElementById("insertionSortButton").style.backgroundColor = "#2d7bc480"; 
}

function enable(){

  document.getElementById("Button1").disabled = false;
  document.getElementById("Button1").style.backgroundColor = "#2d7bc4";
  
  document.getElementById("Button2").disabled = false;
  document.getElementById("Button2").style.backgroundColor = "#2d7bc4";

  document.getElementById("Button4").disabled = false;
  document.getElementById("Button4").style.backgroundColor = "#2d7bc4";

  document.getElementById("bubbleSortButton").disabled = false;
  document.getElementById("bubbleSortButton").style.backgroundColor = "#2d7bc4";

  document.getElementById("insertionSortButton").disabled = false;
  document.getElementById("insertionSortButton").style.backgroundColor = "#2d7bc4"; 
}
