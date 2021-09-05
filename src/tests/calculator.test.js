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


describe("handleNumber", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("should assign operandOne value of '5'", () => {
    calc.handleNumber(5);
    expect(calc.operandOne.data).toBe("5")
  });

  test("should assign operandTwo value of '7'", () => {
    calc.operator = "x";
    calc.handleNumber(7);
    expect(calc.operandTwo.data).toBe("7");
  });

  test("should assign operandOne value of '57'", () => {
    calc.operandOne.data += 5;
    calc.handleNumber(7);
    expect(calc.operandOne.data).toBe("57");
  });

  test("should not concat any more numbers to operandOne", () => {
    calc.operandOne.data += "9999999999999999";
    calc.handleNumber(1);
    expect(calc.operandOne.data).toBe("9999999999999999");
  });

  test("should call updateOperand", () => {
    calc.updateOperand = jest.fn();
    calc.handleNumber(5);
    expect(calc.updateOperand).toHaveBeenCalledWith({ data: "" }, "5");
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








// describe("Utility functions", () => {

// });


/*
const stub = jest.fn();
stub();
expect(stub).toBeCalled


*/