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

  handleKeyPress(key) {
    if (isNumber(key)) this.handleNumber(key);
    if ("/x-+".includes(key)) this.handleOperator(key);
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
    else if (this.operandTwo.data) {                  //chaining
      this.handleEquals();
      let value = this.result;
      this.handleClear();
      this.updateOperand(this.selectOperand(), value);
      this.updateOperator(operator);
    }
  }

  handleDecimal() {
    if (this.result) this.handleClear();
    let operand = this.selectOperand();
    if (!operand.data.includes(".")) {
      let value = "";                                                     
      operand.data ? value = operand.data += "." : value = ".";           //this could use a small rewrite
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

  evaluate() {
    let value = 0;
    if (this.operator == "+") value = toNumber(this.operandOne.data) + toNumber(this.operandTwo.data);
    if (this.operator == "-") value = toNumber(this.operandOne.data) - toNumber(this.operandTwo.data);
    if (this.operator == "/") value = toNumber(this.operandOne.data) / toNumber(this.operandTwo.data);
    if (this.operator == "x") value = toNumber(this.operandOne.data) * toNumber(this.operandTwo.data);
    return value;
  }




  checkResultLength(value) {                //NEEDS A SMALL REWRITE
    if (isInteger(value)) {
      // !integerLengthValid(value) ? return "Error" : return value;
      if (!integerLengthValid(value)) {
        return "Error"
      }
      else {
        return value;
      }
    }
    else {
      if (value.toString().includes('e')) {
        return "Error";
      }
      else {
        return trimFloat(value);
      }
    }

  }





  selectOperand() {
    return !this.operator ? this.operandOne : this.operandTwo;
  }

  debug() {
    console.log("operandOne: " + this.operandOne.data);
    console.log("operator: " + this.operator.data);
    console.log("operandTwo: " + this.operandTwo.data);
    console.log("result: " + this.result.data);
  }

  //----------------------UPDATE METHODS------------------------------//

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
-checkResultLength needs to be refactored
-Move chaining to its own method
-handleDecimal needs a small rewrite
-WRITE TESTS
-Move Google fonts link
-Write README.md FILE
-Use images inside readme

CALCULATOR

OVERVIEW
-Fairly simple calculator app. 
-HTML, CSS, and Vanilla Javascript 
-Webpack for bundling
-Jest for testing

OTHER NOTES
-I'm using objects for operandOne and operandTwo, because it's easier to
pass around a reference, instead of writing the same code twice
only with different variables.
-You can chain - Ex. 5 x 5 x 5 x 5
-All methods are pure except the update functions



CALCULATOR FEATURES
-Chaining
-Length limits for integers and floating point



Number is a 64-bit floating point number
Highest - 9,007,199,254,740,991


*/