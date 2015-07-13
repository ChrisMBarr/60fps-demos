var $ = function(selector){
	//A quick jQuery-like selector element for modern browsers!
	var elements = document.querySelectorAll(selector);
	if(elements.length === 1){
		//if there's only one, just retrn that item form the array
		return elements[0];
	}
	//otherwise return the array of selected eleemnts
	return elements;
};


function clearOutputs() {
	//Clear out previous HTML and begin our new HTML
	$("#output-slow").innerHTML = "";
	$("#output-medium").innerHTML = "";
	$("#output-fast").innerHTML = "";
	$("#perf-slow").innerHTML = "";
	$("#perf-medium").innerHTML = "";
	$("#perf-fast").innerHTML = "";
}

//Click a button to clear the outputs
$("#btn-clear-outputs").addEventListener("click", clearOutputs, false);


//Hex color inversion functions
function decimalToHex(decimal) {
	var hex = decimal.toString(16);
	if (hex.length == 1){
		hex = '0' + hex;
	}
	return hex;
}

function hexToDecimal(hex) {
	return parseInt(hex,16);
}
	
function getOppositeColor(color) {
	//remove the #
	color = color.substring(1);
	
	var c = decimalToHex(255 - hexToDecimal(color.substr(0,2))) 
	+ decimalToHex(255 - hexToDecimal(color.substr(2,2))) 
	+ decimalToHex(255 -  hexToDecimal(color.substr(4,2)));
	
	return "#"+c;
}


function makeColorListItem(colorObj, i){
	var item = "<li><strong>#" + (i+1) + "</strong>";
		item += "<span class='color-display' style='background-color:" + colorObj.hex + ";'></span>";
		item += colorObj.color;
		item += "<span class='color-display' style='background-color:" + getOppositeColor(colorObj.hex) + ";'></span>";
		item += "</li>";
		
		return item;
}





//========================================================================






//SLOW
$("#btn-colors-slow").addEventListener("click", function() {
	$("#output-slow").innerHTML ="";
	var p1 = performance.now();
	
	//--------------
	$("#output-slow").innerHTML = "";
	_.each(colorsList, function(colorObj, i){
		$("#output-slow").innerHTML += makeColorListItem(colorObj, i);
	});
	//--------------
		
	$("#perf-slow").innerHTML = (performance.now() - p1).toFixed(2) + "ms";
}, false);






//========================================================================






//MEDIUM
$("#btn-colors-medium").addEventListener("click", function() {
	$("#output-medium").innerHTML ="";
	var p1 = performance.now();
	
	//--------------
	var htmlString = "";
	_.each(colorsList, function(colorObj, i){
		htmlString += makeColorListItem(colorObj, i);
	});
	$("#output-medium").innerHTML = htmlString;
	//--------------
		
	$("#perf-medium").innerHTML = (performance.now() - p1).toFixed(2) + "ms";
}, false);






//========================================================================






//FAST!
$("#btn-colors-fast").addEventListener("click", function() {
	$("#output-fast").innerHTML ="";
	var p1 = performance.now();
	
	//--------------
	var htmlString = "";
	for(var i=0, len = colorsList.length; i < len; i++){
		htmlString += makeColorListItem(colorsList[i], i);
	}
	$("#output-fast").innerHTML = htmlString;
	//--------------
	
	$("#perf-fast").innerHTML = (performance.now() - p1).toFixed(2) + "ms";
}, false);