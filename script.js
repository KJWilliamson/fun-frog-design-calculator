// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// start with screen where numbers & total will show. starts at 0
let runningTotal = 0;
// keep source of the truth out of the DOM & in javascript. everything lives in javascript and your interface is a reflection of your source of truth
//keeping track of what's on the screen with the buffer
let buffer = '0';
//what's on screen will always be a string. 
//stateful interface. keeping track of previous actions
let previousOperator;
//grabbing screen so we can write to screen
const screen = document.querySelector(".screen");
// start solving the problems
//what happens when a user clicks one of the buttons?
function buttonClick(value) {
    //in console shows whatever button you'e clicking. 7, 8, 9. etc.
    //parseInt turns whatever you gave it into a number.
    if (isNaN(value)) {
        //this is not a number
        handleSymbol(value);
    } else {
        //this is a number
        handleNumber(value);
    }//will always re-render what's in the buffer
    screen.innerText = buffer;
    console.log(value)
}


function handleSymbol(symbol) {
    console.log('handleSymbol', symbol)
    //symbol buttons
    //clear button
    // if(symbol === 'C') {
    //     buffer = "0";
    //     runningTotal = 0;
    // }
    //switch statement instead
    switch (symbol) {
        //if the value is this then do this.             switching based on what the value is
        case 'C':
            buffer = "0";
            runningTotal = 0;
            //break says i'm done with my switch statement. at the end of every case you need a break
            break;
        // + button
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    console.log('handleMath', symbol);
    if (buffer === '0') {
        //do nothing
        // return means don't execute the rest of the function. get out of it
        return;
    }
    //parseInt takes in the string & gives back a number
    // const intBuffer = parseInt(buffer); & 
    // const intBuffer = +buffer; they're the same
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        // 25 + 30 + that holds that total so far
        flushOperation(intBuffer)
    }

    previousOperator = symbol;
    buffer = '0';
}

//could also use a switch statement here
function flushOperation(intBuffer) {
    
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
    console.log('running total', runningTotal)
    
}


//this is all you have to do to get numbers working correctly
function handleNumber(numberString) {
    //number buttons
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    //shows buffer and whatever number button clicked on
    console.log("buffer", buffer)
    //shows concatenation of numbers on screen
    // screen.innerText = buffer;
}

//this function gets called once & sets everything up
function init() {
    // grabs all the calculator buttons. adds an event listener & says whenever a click event happens run this function. whenever the browser calls your eventListener it gives it everythig it knows about the event.
    document.querySelector(".calc-buttons")
        // the click is the event type
        .addEventListener('click', function(event) {
            console.log(event);
            // when you click on any button the console shows
            // PointerEvent {isTrusted: true}
            buttonClick(event.target.innerText);
        })
}
// this calls the function
init();


