const fs = require("fs");
console.log(process.cwd());
window.document.body.innerHTML = fs.readFileSync("./src/index.html");

const { Calculator } = require('../calculator-new');
import { trimFloat, integerLengthValid, toNumber, isNumber, isInteger, inputLengthValid } from "../utils";


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

  test("should add 5 and 7 and return 12", () => {
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

  test("should call updateScreen with argument '0'", () => {
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

  test("should return operandOne", () => {
    let op = calc.selectOperand();
    expect(op).toEqual(calc.operandOne);
  });

  test("should return operandTwo", () => {
    calc.operator = "+";
    let op = calc.selectOperand();
    expect(op).toEqual(calc.operandTwo);
  });

  test("should call updateOperand", () => {
    calc.updateOperand = jest.fn();
    calc.operandOne.data = "5";
    calc.operator = "+";
    calc.operandTwo.data = "7";
    calc.chainResult("+");
    expect(calc.updateOperand).toHaveBeenCalledWith({data: ""}, 12);
  });

  test("should call updateOperator", () => {
    calc.updateOperator = jest.fn();
    calc.chainResult("+");
    expect(calc.updateOperator).toHaveBeenCalledWith("+");
  });

  test("should return addition result 12", () => {
    calc.operandOne.data = 5;
    calc.operator = "+";
    calc.operandTwo.data = 7;
    let result = calc.evaluate()
    expect(result).toBe(12);
  });

  test("should return 'Error' for integer too big", () => {
    let result = calc.checkResultLength(999999999999999);
    expect(result).toBe("Error");
  });

  test("should return Error for Exponential Notation", () => {
    let result = calc.checkResultLength(9.9999e+22);
    expect(result).toBe("Error");
  });

  test("should return trimmed float", () => {
    let result = calc.checkResultLength(5.1234567890123);
    expect(result).toBe("5.123456789012");
  });
});


describe("Update Methods", () => {
  let calc;
  beforeEach(() => {
    calc = new Calculator();
  });

  test("updateOperand should call updateScreen", () => {
    calc.updateScreen = jest.fn();
    calc.updateOperand({data: ""}, "5");
    expect(calc.updateScreen).toHaveBeenCalledWith("5");
  });

  test("should update operator", () => {
    calc.updateOperator("+");
    expect(calc.operator).toBe("+");
  });

  test("updateResult should call updateScreen", () => {
    calc.updateScreen = jest.fn();
    calc.updateResult("5");
    expect(calc.updateScreen).toHaveBeenCalledWith("5");
  });

  test("should update screen", () => {
    calc.updateScreen("5");
    let result = document.querySelector(".calc__screen").textContent;
    expect(result).toBe("5");
  });
});


describe("Utility functions", () => {

  test("trimFloat should trim floating point number", () => {
    let result = trimFloat(5.1234567890123);
    expect(result).toBe("5.123456789012");
  });

  test("trimFloat should not trim floating point number", () => {
    let result = trimFloat(5.123456789012);
    expect(result).toBe("5.123456789012");
  });

  test("integerLengthValid should return true", () => {
    let result = integerLengthValid(5);
    expect(result).toBe(true);
  });

  test("integerLengthValid should return false", () => {
    let result = integerLengthValid(555555555555555);
    expect(result).toBe(false);
  });

  test("toNumber should return integer", () => {
    let result = toNumber("5");
    expect(result).toBe(5);
  });

  test("should return a floating point number", () => {
    let result = toNumber("5.5");
    expect(result).toBe(5.5);
  });

  test("isNumber should return true", () => {
    let result = isNumber(5);
    expect(result).toBe(true);
  });

  test("isNumber should return false", () => {
    let result = isNumber("a");
    expect(result).toBe(false);
  });

  test("isInteger should return true", () => {
    let result = isInteger("5");
    expect(result).toBe(true);
  });

  test("isInteger should return false", () => {
    let result = isInteger("5.5");
    expect(result).toBe(false);
  });

  test("inputLengthValid should return true", () => {
    let result = inputLengthValid("5212345678901")
    expect(result).toBe(true);
  });

  test("inputLengthValid should return false", () => {
    let result = inputLengthValid("52123456789012")
    expect(result).toBe(false);
  });

});
