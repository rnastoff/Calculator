export function trimFloat(num) {                     
  num = num.toString();
  return num.length > 14 ? num.slice(0,14) : num;
}

export function integerLengthValid(num) {            
  num = num.toString();
  return num.length <= 14;
}

export function toNumber (num) {     
  return isInteger(num) ? parseInt(num) : parseFloat(num);                       
}

export function isNumber(num) {
  return !isNaN(num);
}

export function isInteger(num) {
  return Number(parseInt(num)) == num;
}

export function inputLengthValid(num) {
  return num.length <= 13;
}