var oscillators = [];
var oscillatorCollide;

var canvas;
var userSpeed = 0;

var turnOnAutoBool = false;       //  Does the user want the text to be auto-encrypted randomly?


function setup()  {
  canvas = createCanvas(displayWidth/10.5, displayHeight/6.5);       //  Move to far right of screen
  canvas.parent('circleCanvas');        //  Push to div
  //canvas.position(displayWidth /1.2, displayHeight/1.6);
  // Initialize all objects
  userSpeed = userSpeed + 3;      //  Start out with this number for now
  // oscillatorCollide = new OscillatorCollide();
  for (var i = 0; i < userSpeed; i++) {
    oscillators.push(new Oscillator());
  }
}


function draw() {
  background(254, 253, 251);
  // oscillatorCollide.display();
  // Run all objects
  for (var i = 0; i < userSpeed; i++) {
    oscillators.push(new Oscillator());
    oscillators[i].oscillate();
    oscillators[i].display();
  }
  // oscillatorCollide.ocillate();
  // velocity.y = velocity.y * -1;
}


function turnOnAuto() {
  if (cipherEntered == true) {
    turnOnAutoBool = true;
    cipherOn();
  }
}


function turnOffAuto() {
  alert("If you get stuck on an encryption after auto-encrypting is turned off, you need to hit the 'd' or 'e' buttons multiple times in different combinations until your text reutrns to normal!")
  if (cipherEntered == true) {
    turnOnAutoBool = false;
    cipherOff();
  }
}


function turnAutoFaster() {
    if (userSpeed < 5) {      //Cut it off at six, otherwise it becomes counterproductive
      userSpeed = userSpeed + 1;
    // print(userSpeed);
      return userSpeed;
    } else {
      return false;
    }
}


function turnAutoSlower() {
  if (userSpeed >  2) {
    userSpeed = userSpeed - 1;
    return userSpeed;
    // print(userSpeed);
  } else {
    return false;
  }
}

