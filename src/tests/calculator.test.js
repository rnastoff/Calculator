const fs = require("fs");
console.log(process.cwd());
window.document.body.innerHTML = fs.readFileSync("./src/index.html");

const { Calculator } = require('../calculator-new');


describe("Calculator Key Methods", () => {
  
  test("handleKeyPress should call handleNumber with argument 5", () => {
    const calc = new Calculator();
    calc.handleNumber = jest.fn(); 
    calc.handleKeyPress(5);   
    expect(calc.handleNumber).toHaveBeenCalledWith(5);
  });

});





// describe("Utility functions", () => {

// });


/*
const stub = jest.fn();
stub();
expect(stub).toBeCalled


*/