//	Uses P5.js functions / libraries
//	You don't have to do that. They're included here because it'll be easier to expand the aesthetics of the app
//	Future updates by me (JD) will be using P5.js for graphics

function message(){
    $("#loadingAnimation").remove();	//	Removes the loading animation div
    									//	Animation loads in beginning to give first post time to load
}


function setup(){
	// console.log("yea");
    setTimeout(message,2000);			//	How long do you want the animation to be>
    setTimeout(reload,60000);			//	How long until the app reloads itself, and the latest tweets again?
}

function reload () {
	location.reload();
}

function draw () {
	$("body").css("overflow", "hidden");		//	Hide scrollbar	
	$("body").css("overflow", "auto");			//	Hide scrollbar
}