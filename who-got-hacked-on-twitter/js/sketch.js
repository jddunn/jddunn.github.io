
function message(){
       $("#loadingAnimation").remove();

}


function setup(){
	console.log("yea");
	setTimeout(reload,60000);
    setTimeout(message,2000);
}

function reload () {
	location.reload();
}

function draw () {
	$("body").css("overflow", "hidden");

		$("body").css("overflow", "auto");
}