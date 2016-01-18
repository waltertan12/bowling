(function (root) {
  'use strict';

  const NUM_PINS = 10;

  const Frame = root.Frame = function (frameNumber, scoreBoard) {
    this.rolls = 0;
    this.pins = NUM_PINS;
    this.history = [];
    this.frameNumber = frameNumber;
    this.scoreBoard = scoreBoard;
  };

  Frame.prototype.bowl = function (type, numToRemove) {
    var pinsRemaining = this.pins,
        toRemove;

    switch (type) {
      case 'AWESOME': // Remove all pins
        toRemove = pinsRemaining;
        break;
      case 'NUM': // Remove specified amount of pins
        toRemove = numToRemove;
        break;
      default: // Remove random number
        console.log('default!');
        toRemove = Math.floor(Math.random() * (this.pins + 1));
        break;
    }

    this.remove(toRemove);
    this.history[this.rolls] = toRemove;
    this.rolls++;
  };

  Frame.prototype.nextFrame = function () {
    return this.scoreBoard[this.frameNumber + 1];
  };

  Frame.prototype.getPinsFromNextRolls = function (num) {
    var pins = 0, nextFrame = this.nextFrame();
    if (!nextFrame || !nextFrame.history[0]) return 'NOPE';

    // TODO: Refactor error
    switch (num) {
      case 1:
        pins += nextFrame.history[0];
        break;
      case 2:
        pins += nextFrame.history[0];
        if (nextFrame.isStrike()) {
          if (!nextFrame.nextFrame() || 
              !nextFrame.nextFrame().history[0]) 
            return 'NOPE';
          else
            pins += nextFrame.nextFrame().history[0]
        } else {
          if (typeof nextFrame.history[1] === 'undefined')
            return 'NOPE';
          else
            pins += nextFrame.history[1];
        }
        break;
    }

    return pins;
  };

  Frame.prototype.score = function () {
    var additional;
    if (this.isStrike()) {
      additional = this.getPinsFromNextRolls(2);
      if (additional === 'NOPE')
        return;
      else
        return 10 + additional;
    } else if (this.isSpare()) {
      return 10 + this.getPinsFromNextRolls(1);
    } else {
      return NUM_PINS - this.pins; 
    }
  };

  Frame.prototype.remove = function (num) {
    this.pins -= num;
  };

  Frame.prototype.add = function (num) {
    this.pins += num;
  };

  Frame.prototype.resetPins = function () {
    this.pins = NUM_PINS;
  };

  Frame.prototype.isStrike = function (num) {
    return this.history[0] === 10;
  };

  Frame.prototype.isSpare = function (num) {
    return !this.isStrike() && (this.history[0] + this.history[1]) === 10;
  };

  Frame.prototype.canBowlExtra = function () {
    return (
      this.frameNumber === 9 && 
      (this.isSpare() || this.isStrike()) &&
      this.rolls === 2
    );
  };
})(this);