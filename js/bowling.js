var FRAMES   = 10;

var Bowling = function () {
  this.scoreBoard = [];
  this.frameNumber = 0;
};

Bowling.prototype.bowl = function (type, numToRemove) {
  var frame;

  // Check if there is current frame
  if (typeof this.scoreBoard[this.frameNumber] === 'undefined') {
    frame = new Frame(this.frameNumber, this.scoreBoard);
    this.scoreBoard.push(frame);
  }
  else
    frame = this.scoreBoard[this.frameNumber];

  // Bowl
  if (this.frameNumber < 9)
    this.normal(frame, type, numToRemove);
  else
    this.lastFrame(frame, type, numToRemove);
};

Bowling.prototype.normal = function (frame, type, numToRemove) {
  if (frame.rolls < 2 && frame.pinsRemaning > 0) {
    frame.bowl(type, numToRemove);
  } else 
    this.frameNumber++;
    
};

Bowling.prototype.lastFrame = function (frame, type) {

};