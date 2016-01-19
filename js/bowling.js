(function (root) {
  'use strict';
  const FRAMES   = 10;

  const Bowling = root.Bowling = function () {
    this.scoreBoard = [];
    this.frameNumber = 0;
  };

  Bowling.prototype.bowl = function (type, numToRemove) {
    var frame = this._frame();

    // Bowl
    if (this.frameNumber < 9)
      this.normal(frame, type, numToRemove);
    else
      this.lastFrame(frame, type, numToRemove);
  };

  Bowling.prototype._frame = function () {
    var frame = this.scoreBoard[this.frameNumber];

    // Check if there is current frame
    if (typeof frame === 'undefined') {
      frame = new Frame(this.frameNumber, this.scoreBoard);
      this.scoreBoard.push(frame);

    // Create new frame if previous frame is finished
    } else if ((frame.rolls > 1 || frame.pins === 0) && 
               this.frameNumber < 9) {
      frame.finished = true;
      this.frameNumber++;
      frame = new Frame(this.frameNumber, this.scoreBoard);
      this.scoreBoard.push(frame);
    }

    return frame;
  };

  Bowling.prototype.normal = function (frame, type, numToRemove) {
    frame.bowl(type, numToRemove);
  };

  Bowling.prototype.lastFrame = function (frame, type, numToRemove) {
    if (frame.rolls < 2) {
      if (frame.pins === 0) frame.resetPins(); // Add 10 pins
      frame.bowl(type, numToRemove);
    } else if (frame.canBowlExtra()) {
      frame.resetPins();
      frame.bowl(type, numToRemove);
    } else
      console.error('Game over');
  };

  Bowling.prototype.reset = function () {
    this.scoreBoard = [];
    this.frameNumber = 0;
  };
})(this);