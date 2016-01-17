var FRAMES   = 10;

var Bowling = function () {
  this.scoreBoard = [];
  this.frameNumber = 0;
};

Bowling.prototype.bowl = function (type, numToRemove) {
  var frame = this.scoreBoard[this.frameNumber];

  // Check if there is current frame
  if (typeof frame === 'undefined') {
    frame = new Frame(this.frameNumber, this.scoreBoard);
    this.scoreBoard.push(frame);
  } else if ((frame.rolls > 1 || frame.pins === 0) && 
              this.frameNumber < 9) {
    this.frameNumber++;
    frame = new Frame(this.frameNumber, this.scoreBoard);
    this.scoreBoard.push(frame);
  }

  // Bowl
  if (this.frameNumber < 9)
    this.normal(frame, type, numToRemove);
  else
    this.lastFrame(frame, type, numToRemove);
};

Bowling.prototype.normal = function (frame, type, numToRemove) {
  if (frame.rolls < 2 && frame.pins > 0) {
    frame.bowl(type, numToRemove);
  } else 
    this.frameNumber++;
    
};

Bowling.prototype.lastFrame = function (frame, type) {
  if (frame.rolls > 2)
    console.log('wtf');
  else
    console.log('bowl!');
};