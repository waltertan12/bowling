(function (root) {
  const FRAMES   = 10;

  const Bowling = function () {
    this.scoreBoard = [];
    this.frameNumber = 0;
  };

  Bowling.prototype.print = function () {
    var result = this.scoreBoard.map(function (frame) {
      return frame.history;
    });
    var totalScore = 0, score;
    var otherResult = this.scoreBoard.map(function (frame) {
      score = frame.score();
      if (typeof score === 'number') {
        totalScore += score;
        return totalScore;
      } else {
        return '';
      }
    });
    return {pins: result, score: otherResult};
  };

  Bowling.prototype.bowl = function (type, numToRemove) {
    var frame = this.scoreBoard[this.frameNumber];

    // Check if there is current frame
    if (typeof frame === 'undefined') {
      frame = new Frame(this.frameNumber, this.scoreBoard);
      this.scoreBoard.push(frame);
    // Create new frame if previous frame is finished
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
    frame.bowl(type, numToRemove);
  };

  Bowling.prototype.lastFrame = function (frame, type, numToRemove) {
    if (frame.rolls < 2) {
      if (frame.pins === 0) frame.resetPins(); // Add 10 pins
      frame.bowl(type, numToRemove);
    } else if (frame.canBowlExtra()) {
      frame.resetPins();
      frame.bowl(type, numToRemove);
    }
    else
      console.error('hmm...');
  };
})(this);