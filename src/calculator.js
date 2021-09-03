import { trimFloat, integerLengthValid, toNumber, isNumber, isInteger, inputLengthValid } from "./utils";

export class Calculator {

  constructor() {
    this.operandOne = "";
    this.operandTwo = "";
    this.operator = "";
    this.result = "";
    
    document.querySelectorAll('.calc__keys').forEach(keys => {
      keys.addEventListener('click', e => {
        this.handleKeyPress(e.target.textContent);
      })
    });
  } 

  handleKeyPress(key) {
    if (isNumber(key)) this.handleNumber(key);
    if ("/x-+".includes(key)) this.handleOperator(key);
    if (key === ".") this.handleDecimal();
    if (key === "=") this.handleEquals();
    if (key === "CE") this.handleClear();
  }

  handleNumber(num) {  
    if (this.result) this.handleClear();
      
    if (!this.operator && inputLengthValid(this.operandOne)) {       //operandOne
      this.operandOne += num;
      this.updateScreen(this.operandOne);
    }
    else if (this.operator && inputLengthValid(this.operandTwo)) {   //operandTwo
      this.operandTwo += num;
      this.updateScreen(this.operandTwo);
    }
  }

  handleOperator(operator) { 
    if (!this.operandTwo) {
      this.operator = operator;
    }
    else if (this.operandTwo) {              //Chaining     
      this.handleEquals();                   
      this.operandOne = this.result;
      this.operator = operator;
      this.operandTwo = "";
      this.result = "";
      this.updateScreen(this.operandOne);
    }
  }

  handleClear() {
    this.operandOne = "";
    this.operandTwo = "";
    this.operator = "";
    this.result = "";
    this.screen = "";
    this.updateScreen("0");
  }

  handleDecimal() {
    if (this.result) this.handleClear();

    if (!this.operator && !this.operandOne.includes(".")) {                 //operandOne
      this.operandOne ? this.operandOne += "." : this.operandOne = "0.";
      this.updateScreen(this.operandOne);
    }
    else if (this.operator && !this.operandTwo.includes(".")) {             //operandTwo
      this.operandTwo ? this.operandTwo += "." : this.operandTwo = "0.";
      this.updateScreen(this.operandTwo);
    }
    
  }

  handleEquals() {
    if (this.operandOne && this.operandTwo) {
      if (this.operator == "+") this.result = toNumber(this.operandOne) + toNumber(this.operandTwo);
      if (this.operator == "-") this.result = toNumber(this.operandOne) - toNumber(this.operandTwo);
      if (this.operator == "/") this.result = toNumber(this.operandOne) / toNumber(this.operandTwo);
      if (this.operator == "x") this.result = toNumber(this.operandOne) * toNumber(this.operandTwo);
    
      this.checkResultLength();
      this.updateScreen(this.result);   
    }
  }

  checkResultLength() {
    if (isInteger(this.result)) {                                    //If integer      
      if (!integerLengthValid(this.result)) this.result = "Error";   //Error if integer is too big
    }
    else {                                                  
      if (this.result.toString().includes('e')) {           //Error if integer result is in exponential notation
        this.result = "Error";
      } 
      else {
        this.result = trimFloat(this.result);
      }       
    }
  }

  updateScreen(num) {
    this.screen = document.querySelector('.calc__screen');
    this.screen.textContent = num;
  }

  debug() {
    console.log("operandOne: " + this.operandOne);
    console.log("operator: " + this.operator);
    console.log("operandTwo: " + this.operandTwo);
    console.log("result: " + this.result);
  }

}


/*
-Move Google fonts link
-WRITE TESTS


README.md FILE

OVERVIEW
-Fairly simple calculator app. HTML, CSS, and Vanilla Javascript. Webpack for bundling. Jest for testing.

CALCULATOR FEATURES
-Chaining
-Length limits for integers and floating point


-Different refactoring
 -Keep functions
 -But the Eventlistener goes into index.js with the Calculator Instance.
  -Call handleKeyPress from EventListener.








Number is a 64-bit floating point number
Highest - 9,007,199,254,740,991


*/