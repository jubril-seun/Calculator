let input = document.getElementById("input-result");
const btns = document.getElementById("calc-btns")

input.value = "";
let num1 = 0;
let num2 = 0;
let result = 0;
let operator = null;
let currInput = [];
let operationActive = true;


function addArr(val){
    
    for(let i = 0; i < val.length; i++){
        currInput.push(val[i]);
    }
    
    let newArr = currInput.join("");
    
    input.value = newArr;
}


function subtractArr(){
    currInput.pop();
    let newArr = currInput.join('');
    
    input.value = newArr;
}

function percent() {
    let val = Number(input.value) / 100;
    
    val = val.toString();
    currInput = [];
    addArr(val);
}

function clearAll(){
    input.value = "";
    num1 = 0;
    num2 = 0;
    result = 0;
    operator = null;
    currInput = [];
}

function evaluate (){
   
    if(operator === "addition"){
        result = num1 + num2;
    } else if(operator === "subtraction"){
        result = num1 - num2;
    } else if(operator === "multiplication"){
        result = num1 * num2;
    } else if(operator === "division"){
        result = num1 / num2;
    }


    if(Number.isInteger(result)){
        input.value = result;
        num1 = result; 
    } else {
        input.value = result.toFixed(2);
        num1 = result.toFixed(2);
    }
    
}

btns.addEventListener("click", (e) => {
      
    let value = e.target.dataset.id;
    
    // Inputing numbers to display
    if(e.target.classList.contains('number-btns')){   
        if((input.value === "0"  || input.value === "") && value === "0"){
            input.value = value;
        } else if((input.value === "0" || input.value === "") && value === ".") {   
            addArr("0");
            addArr(".")
        } else if(value === "." && currInput.includes(".")){
            return;
        } else {
            addArr(value);
        }
    }

    // Subtracting numbers from display
    if(value === 'del'){
        subtractArr()
    }

    if(value === "ac"){
        clearAll();
    }

    if(value === "percent"){
        percent();
    }

    if(e.target.classList.contains('operator-btn') && value !== "equals"){
        operationActive = true;
        operator = value;
        num1 = Number(input.value);
        currInput = [];
        } else if (value === "equals" && num1 !== 0){
            num2 = Number(input.value);
            evaluate();
            currInput = [];
            addArr(input.value);
            operationActive = false;
    }

    if(!operationActive && e.target.classList.contains('number-btns')){
        clearAll()
        if(value === "0"){
            input.value = value;
        } else if((input.value === "0" || input.value === "") && value === ".") {   
            addArr("0");
            addArr(".")
        } else {
            addArr(value);
        }

        operationActive = true;
    }


    console.log("operator: " + operator);
    console.log(currInput);
    console.log(input.value);
    console.log(operationActive);
    console.log("result: " + result);
    console.log("num1: " + num1);
    console.log("num2: " + num2);
})
