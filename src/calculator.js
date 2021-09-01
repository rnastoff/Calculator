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
    if (this.isNumber(key)) this.handleNumber(key);
    if ("/x-+".includes(key)) this.handleOperator(key);
    if (key === ".") this.handleDecimal();
    if (key === "=") this.handleEquals();
    if (key === "CE") this.handleClear();
  }

  handleNumber(num) {  
    if (this.result) this.handleClear();
      
    if (!this.operator && this.inputLengthValid(this.operandOne)) {       //Into operandOne
      this.operandOne += num;
      this.updateScreen(this.operandOne);
    }
    else if (this.operator && this.inputLengthValid(this.operandTwo)) {   //Into operandTwo
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
    
    //still have to write this
    if (this.result) this.handleClear();

    //if (this.operandOne)
  }

  handleEquals() {
    this.debug();
    if (this.operandOne && this.operandTwo) {
      if (this.operator == "+") this.result = this.toNumber(this.operandOne) + this.toNumber(this.operandTwo);
      if (this.operator == "-") this.result = this.toNumber(this.operandOne) - this.toNumber(this.operandTwo);
      if (this.operator == "/") this.result = this.toNumber(this.operandOne) / this.toNumber(this.operandTwo);
      if (this.operator == "x") this.result = this.toNumber(this.operandOne) * this.toNumber(this.operandTwo);
    
      this.checkLength();
      this.updateScreen(this.result);   
    }
  }



  //UTILITY METHODS
  checkLength() {
    if (this.isInteger(this.result)) {                    
      if (!this.integerLengthValid(this.result)) this.result = "Error";   //Error if integer is too big
    }
    else {                                            
      if (this.result.toString().includes('e')) {           //Error if result is in exponential notation
        this.result = "Error";
      } 
      else {
        this.result = this.trimFloat(this.result);
      }       
    }
  }

  trimFloat(num) {                      
    num = num.toString();
    return num.length > 14 ? num.slice(0,14) : num;
  }

  integerLengthValid(num) {            //For result only
    num = num.toString();
    return num.length <= 14;
  }

  toNumber (num) {     
    return this.isInteger(num) ? parseInt(num) : parseFloat(num);                       
  }

  isNumber(num) {
    return !isNaN(num);
  }

  isInteger(num) {
    return Number(parseInt(num)) == num;
  }

  inputLengthValid(num) {
    return num.length <= 13;
  }

  updateScreen(num) {
    this.screen = document.querySelector('.calc__screen');
    this.screen.textContent = num;
  }

  debug() {
    console.log("operandOne: " + this.operandOne);
    console.log("operandTwo: " + this.operandTwo);
    console.log("result: " + this.result);
  }

}


/*
-handleDecimal()
-Need to deal with divide by zero

Number is a 64-bit floating point number
Highest - 9,007,199,254,740,991


*/