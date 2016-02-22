var secondRotation; 
var minuteRotation;
var hourRotation;
 
 
function setup () {
   
  createCanvas(400,400);
 
}
 
 
function draw () {
 
  background(0);
   
  secondRotation = map(second(), 0, 60, 0, 360);
  minuteRotation = map(minute(), 0, 60, 0, 360);
  hourRotation = map(hour(), 0, 24, 0, 720);
  //Defines the rotation paths for the invisible hands of the clock. Mapped in degrees; could also use Pi
  push();
  noFill();
  strokeWeight(15); 
  stroke(255, 189, 36);
  ellipse(width/2, height/2, 120, 120); //Draws seconds arc
  stroke(255,36,138);
  ellipse(width/2, height/2, 240, 240); //Draws minutes arc
  stroke(36,255,62);
  ellipse(width/2, height/2, 360, 360); //Draws hours arc
  pop();
   
  //pushMatrix();   
  push();
    translate(width/2, height/2); //Translates the line to the center point of the clock
    rotate(radians(secondRotation)); //Rotates the line along the called upon rotation path
    strokeWeight(20);
    stroke(0);                    //Makes the line the same color as the background
    line(0, 0, 0, -200);          //Draws the invisible line to go slightly past the second hand arch of the clock, creating the effect of a "handless clock"
  //popMatrix();
  pop();
   
   push();
//  pushMatrix();
    translate(width/2, height/2);
    rotate(radians(minuteRotation));
    line(0, 0, 0, -140);          //Draws the invisible line to go slightly past the minute hand arch
//  popMatrix();
   pop();
   
   push();
//  pushMatrix();
    translate(width/2, height/2);
    rotate(radians(hourRotation));
    line(0, 0, 0, -70);          //Draws the invisible line to go slightly past the hour hand arch
//  popMatrix();
  pop();
 
}
