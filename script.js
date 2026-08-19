let input = document.getElementById("input-result");
const btns = document.getElementById("calc-btns")


input.value = null;
let operator = null;
let num1 = null;
let num2 = null;
let result = null;
let active = false;


// Backspace function
function backspace(){

    let val = input.value;
    val = val.slice(0, -1);

    input.value = val;
    if(active){
       num1 = Number(val);
       result = Number(val);
    }
}

// All clear function
function clearAll(){
    input.value = null;
    operator = null;
    num1 = null;
    num2 = null;
    result = null;
    active = false; 
}

// Percent function
function percent() {
    let val = Number((input.value) / 100).toFixed(2);
    
    val = val.toString();
    input.value = val;

    if(active){
        result = Number(val);
        num1 = Number(val);
    }
}

// Evaluate function
function evaluate (){
   
    if(operator === "division" && num2 < 1){
        input.value = "ouch!";
        num1 = null;
        result = null;
        num2 = null;
        return;
    }

    if(operator === "addition"){
        result = num1 + num2;
    } else if(operator === "subtraction"){
        result = num1 - num2;
    } else if(operator === "multiplication"){
        result = num1 * num2;
    } else if(operator === "division"){
        result = num1 / num2;
    }


    if(result !== null){
        if(Number.isInteger(result)){
            input.value = result;
            num1 = Number(result); 
        } else {
            input.value = result.toFixed(2);
            num1 = Number(result.toFixed(2));
        }
    }
    
}

btns.addEventListener("click", (e) => {
      
    let elm = e.target.dataset.id;

    if(input.value === "ouch!"){
        clearAll();
    }
    
    // Clear display after calculation
    if(e.target.classList.contains('number-btns') && active){
        input.value = "";
        active = false;
    }
    
    // Inputing numbers to display
    if(e.target.classList.contains('number-btns')){   
        if(input.value === "0" && elm === "0"){
            input.value = elm;
        } else if((input.value === "0" || input.value === "") && elm === ".") {   
            input.value = "0";
            input.value += elm;
        } else if(elm === "." && input.value.includes(".")){
            return;
        } else if (input.value === "0" && elm !== 0){
            input.value = "";
            input.value += elm;
        } else {
              input.value += elm; 
            }   
        }

    // Add number to variables
    if(e.target.classList.contains('operator-btn')){
        if(num1 === null){
            operator = elm;
            num1 = Number(input.value);
            input.value = null;
        } else if(num2 === null || result !== null){
            num2 = Number(input.value);
        }
    }

    // Fire evaluate function
     if(e.target.classList.contains('operator-btn')){
        if(num1 !== null && num2 !== null){
            evaluate();
            operator = elm;
            active = true;
        }
     }

    // Subtracting numbers from display
    if(elm === 'del'){
        backspace()
    }

    // Clearing all values
    if(elm === "ac"){
        clearAll();
    }

    // Converting to percent
    if(elm === "percent"){
        percent();
    }


/*  console.log("operator: " + operator);
    console.log("number 1: " + num1);
    console.log("number 2: " + num2);
    console.log("result: " + result)
    console.log(active); */
})