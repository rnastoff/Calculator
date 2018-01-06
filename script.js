
$(document).ready(function(){
  
	let num1 = "";
	let num2 = "";
	let operator = "";
	let result = "";
	let limit = 12;
	
		
	//VARIABLE MANAGEMENT
	function numberManage(num) {	
			
		//num1
		if (operator == "") {		
			let check = num1.indexOf(".");			 		
			if (check !== -1 && num == ".") { //if num1 has a decimal, and num is a decimal
				return;
			}
			else {			
				num1 = num1.concat(num);			
				if (num1.length > limit) {
					$(".screen").text("LIMIT");
				}
				else {
					$(".screen").text(num1);
				}
			}
		}
		
		//num2
		if (operator !== "") {
			let check = num2.indexOf(".");	
			if (check !== -1 && num == ".") { //if num1 has a decimal, and num is a decimal
				return;
			}
			else {
				num2 = num2.concat(num);
				if (num2.length > limit) {
					$(".screen").text("LIMIT");
				}
				else {
					$(".screen").text(num2);
				}
			}			
		}
		
	} //numberManage end
	
	
	
	
	
	//DEAL WITH FINAL RESULT/DECIMALS
	function handleResult(num) {
		num = num.toString();
		let check = num.indexOf(".");
		
		//NO DECIMAL POINTS
		if (check == -1) {
			if (num.length > limit) {
				$(".screen").text("LIMIT");
			}
			else {
				$(".screen").text(num);
			}
		}	
		else { //DECIMAL POINT
			if (num.substring(0, check).length > limit) { //if left of decimal exceeds limit
				$(".screen").text("LIMIT");
			}
			else if (num.length > limit) { //if right of decimal exceeds limit, chop
				num = num.substring(0, limit);
				$(".screen").text(num);
			}
			else {
				$(".screen").text(num);
			}		
		}		
	}
	
	
	
	
	
	//EVALUATE THE MATH EXPRESSION
	function mathOperation(param1, param2, op) {
		result = eval(param1 + op + param2);
		handleResult(result);
		return result;
	}
	
	
	
	//DEAL WITH CHAINING
	function operatorManage(op) {
		//chaining
		if (num2 !== "") {
			num1 = mathOperation(num1, num2, operator);
			operator = op;
			num2 = "";
		}
		else {
			operator = op;
		}
	}
	
	
	

	
	
	
	//CE CLEAR
	$("#ce").click(function() {    
    num1 = "";
    num2 = "";
    operator = "";
    $(".screen").text("0");
  });
	
	
	//ON BUTTON
	$("#on").click(function() {    
    num1 = "";
    num2 = "";
    operator = "";
    $(".screen").text("0");
  });
	
	
	//NUMBERS CLICK
  $(".num").click(function(e){
		numberManage(e.target.textContent);
	});
	
	$("#zero").click(function(){
		if (num1 !== "") numberManage("0");
	});
	
	
	//OP CLICK
	$(".op").click(function(e) {
    if (e.target.textContent == "x") {
			operatorManage("*");
		}
		else {
			operatorManage(e.target.textContent);
		}
  });
  
	
	//EQUALS
	$("#equals").click(function() {
		if (num1 !== "" && num2 !== "" && operator !== "") {
			mathOperation(num1, num2, operator);
		}
		
	});
	
	
});