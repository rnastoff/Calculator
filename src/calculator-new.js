import { trimFloat, integerLengthValid, toNumber, isNumber, isInteger, inputLengthValid } from "./utils";

export class Calculator {

  constructor() {
    this.operandOne = { data: "" };
    this.operandTwo = { data: "" };
    this.operator = "";
    this.result = "";

    document.querySelectorAll('.calc__keys').forEach(keys => {
      keys.addEventListener('click', e => {
        this.handleKeyPress(e.target.textContent);
      })
    });
  } 

  //----------------------KEY METHODS----------------------//

  handleKeyPress(key) {
    if (isNumber(key)) this.handleNumber(key);
    if (/[-+x\/]/.test(key)) this.handleOperator(key); //if ("/x-+".includes(key)) this.handleOperator(key);
    if (key === ".") this.handleDecimal();
    if (key === "=") this.handleEquals();
    if (key === "CE") this.handleClear();
  }

  handleNumber(num) {
    if (this.result) this.handleClear();

    let operand = this.selectOperand();
    if (inputLengthValid(operand.data)) {
      let value = operand.data + num;
      this.updateOperand(operand, value);
    }
  }

  handleOperator(operator) {
    if (!this.operandTwo.data) {
      this.updateOperator(operator);
    }
    else if (this.operandTwo.data) {                  
      this.chainResult(operator);
    }
  }

  handleDecimal() {
    if (this.result) this.handleClear();
    let operand = this.selectOperand();
    if (!operand.data.includes(".")) {
      let value = "";                                                     
      value = operand.data ? (operand.data + ".") : "0.";     
      this.updateOperand(operand, value);
    }
  }

  handleEquals() {
    if (this.operandOne.data && this.operandTwo.data) {
      let value = this.evaluate();
      value = this.checkResultLength(value);
      this.updateResult(value);
    }
  }

  handleClear() {
    this.operandOne.data = "";
    this.operandTwo.data = "";
    this.operator = "";
    this.result = "";
    this.updateScreen("0");
  }

  //----------------------HELPER METHODS----------------------//

  selectOperand() {
    return !this.operator ? this.operandOne : this.operandTwo;
  }

  chainResult(operator) {
    this.handleEquals();
    let value = this.result;
    this.handleClear();
    this.updateOperand(this.operandOne, value); //changed
    this.updateOperator(operator);
  }

  evaluate() {
    let value = 0;
    if (this.operator == "+") value = toNumber(this.operandOne.data) + toNumber(this.operandTwo.data);
    if (this.operator == "-") value = toNumber(this.operandOne.data) - toNumber(this.operandTwo.data);
    if (this.operator == "/") value = toNumber(this.operandOne.data) / toNumber(this.operandTwo.data);
    if (this.operator == "x") value = toNumber(this.operandOne.data) * toNumber(this.operandTwo.data);
    return value;
  }

  checkResultLength(value) {                
    if (isInteger(value)) {
      return !integerLengthValid(value) ? "Error" : value;                //Integer too big?
    }
    else {
      return value.toString().includes('e') ? "Error" : trimFloat(value); //Trim floating point?
    }
  }

  debug() {
    console.log("operandOne: " + this.operandOne.data);
    console.log("operator: " + this.operator.data);
    console.log("operandTwo: " + this.operandTwo.data);
    console.log("result: " + this.result.data);
  }

  //----------------------UPDATE FUNCTIONS----------------------//

  updateOperand(operand, num) {
    operand.data = num;
    this.updateScreen(operand.data);
  }

  updateOperator(operator) {
    this.operator = operator;
  }

  updateResult(num) {
    this.result = num;
    this.updateScreen(this.result);
  }

  updateScreen(value) {
    this.screen = document.querySelector('.calc__screen');
    this.screen.textContent = value;
  }
}


/*

-WRITE TESTS
-Replace handleKeyPress +-/x with regex
-Move Google fonts link
-Write README.md FILE
-Use images inside readme

CALCULATOR

OVERVIEW
-Simple calculator app. 
-HTML, CSS, and Vanilla Javascript 
-Webpack for bundling
-Jest for testing

OTHER NOTES
-By using objects for operandOne and operandTwo, I can 
pass around a reference, and avoid writing the same code
twice with different variables.
-You can chain - Ex. 5 x 5 x 5 x 5
-Only update functions change state.


Number is a 64-bit floating point number
Highest - 9,007,199,254,740,991


*/