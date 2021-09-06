const fs = require("fs");
console.log(process.cwd());
window.document.body.innerHTML = fs.readFileSync("./src/index.html");

const { Calculator } = require('../calculator-new');

describe("handleKeyPress", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });
  
  test("should call handleNumber with argument '5'", () => {
    calc.handleNumber = jest.fn(); 
    calc.handleKeyPress(5);   
    expect(calc.handleNumber).toHaveBeenCalledWith(5);
  });

  test("should call handleOperator with argument '+'", () => {
    calc.handleOperator = jest.fn(); 
    calc.handleKeyPress("+");   
    expect(calc.handleOperator).toHaveBeenCalledWith("+");
  });

  test("should call handleDecimal", () => {
    calc.handleDecimal = jest.fn(); 
    calc.handleKeyPress(".");   
    expect(calc.handleDecimal).toHaveBeenCalled();
  });

  test("should call handleEquals", () => {
    calc.handleEquals = jest.fn(); 
    calc.handleKeyPress("=");   
    expect(calc.handleEquals).toHaveBeenCalled();
  });

  test("should call handleClear", () => {
    calc.handleClear = jest.fn(); 
    calc.handleKeyPress("CE");   
    expect(calc.handleClear).toHaveBeenCalled();
  });

});

//DON'T NEED TO TEST EVERY LITTLE BEHAVIOR IN THE METHOD
//ONLY NEED TO TEST THE RESULTS OF THE METHOD

describe("handleNumber", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("should call updateOperand with argument '5'", () => {
    calc.updateOperand = jest.fn();
    calc.handleNumber(5);
    expect(calc.updateOperand).toHaveBeenCalledWith({ data: "" }, "5");
  });

  test("should not call updateOperand if input is too long", () => {
    calc.updateOperand = jest.fn();
    calc.operandOne.data = "999999999999999";
    calc.handleNumber(5);
    expect(calc.updateOperand).not.toHaveBeenCalled();
  });

});

describe("handleOperator", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });
  
  test("should call updateOperator with argument '+'", () => {
    calc.updateOperator = jest.fn();
    calc.handleOperator("+");
    expect(calc.updateOperator).toHaveBeenCalledWith("+");
  });

  test("should call chainResult with argument '+'", () => {
    calc.operandTwo.data = "5";
    calc.chainResult = jest.fn();
    calc.handleOperator("+");
    expect(calc.chainResult).toHaveBeenCalledWith("+");
  });

});

describe("handleDecimal", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("should call updateOperand with argument '0.'", () => {
    calc.updateOperand = jest.fn();
    calc.handleDecimal();
    expect(calc.updateOperand).toHaveBeenCalledWith({data: ""}, "0.");
  });

  test("should call updateOperand with argument '.'", () => {
    calc.updateOperand = jest.fn();
    calc.operandOne.data = "5";
    calc.handleDecimal();
    expect(calc.updateOperand).toHaveBeenCalledWith({data: "5"}, "5.");
  });
});

describe("handleEquals", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("should add two numbers and return 12", () => {
    calc.updateResult = jest.fn();
    calc.operandOne.data = 5;
    calc.operandTwo.data = 7;
    calc.operator = "+";
    calc.handleEquals();
    expect(calc.updateResult).toHaveBeenCalledWith(12);
  });

});

describe("handleClear", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("should call updateScreen with arguement '0'", () => {
    calc.updateScreen = jest.fn();
    calc.handleClear();
    expect(calc.updateScreen).toHaveBeenCalledWith('0');
  });
});


describe("Helper Methods", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  


});




/*
  test("handleNumber() should...", () => {
    //For each operand
  });

  test("handleNumber() should...", () => {
    //For each operand
  });

  test("handleOperator() should...", () => {
    //For operator
  });

  test("handleOperator() should...", () => {
    //For operator chaining
  });

  test("handleDecimal() should...", () => {
    //For each operand
  });

  test("handleDecimal() should...", () => {
    //For "." and "0."
  });

  test("handleEquals() should...", () => {
    //Hmmm...
  });

  test("handleClear() should...", () => {
    //For "." and "0."
  });
*/
