function message(){
    $("#loadingAnimation").remove();
}


function setup(){
	// console.log("yea");
    setTimeout(message,2000);
    setTimeout(reload,60000);
}

function reload () {
	location.reload();
}

function draw () {
	$("body").css("overflow", "hidden");
	$("body").css("overflow", "auto");
}