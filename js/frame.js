(function (root) {
  'use strict';

  const NUM_PINS = 10;

  const Frame = root.Frame = function (frameNumber, scoreBoard) {
    this.rolls = 0;
    this.pins = NUM_PINS;
    this.history = [];
    this.frameNumber = frameNumber;
    this.scoreBoard = scoreBoard;
    this.finished = false;
  };

  Frame.prototype.bowl = function (type, numToRemove) {
    var pinsRemaining = this.pins,
        toRemove;

    switch (type) {
      case 'AWESOME': // Remove all pins
        toRemove = pinsRemaining;
        break;
      case 'NUM': // Remove specified amount of pins
        if (numToRemove > pinsRemaining)
          toRemove = pinsRemaining;
        else
          toRemove = numToRemove;
        break;
      default: // Remove random number
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
    if (typeof nextFrame === 'undefined' || 
        typeof nextFrame.history[0] === 'undefined') return 'NOPE';
    pins += nextFrame.history[0];

    // TODO: Refactor error
    if (num === 2) {
      var nextNextFrame = nextFrame.nextFrame();

      if (nextFrame.isStrike() && this.frameNumber !== 8) {
        if (typeof nextNextFrame === 'undefined' || 
            typeof nextNextFrame.history[0] === 'undefined') return 'NOPE';
        pins += nextNextFrame.history[0]
      } else {
        if (typeof nextFrame.history[1] === 'undefined') return 'NOPE';
        pins += nextFrame.history[1];
      }
    }

    return pins;
  };

  Frame.prototype.score = function () {
    if (this.frameNumber !== 9) return this._scoreNormal();
    else return this._scoreFinal();
  };

  Frame.prototype._scoreNormal = function () {
    var additional;
    if (this.isStrike()) {
      additional = this.getPinsFromNextRolls(2);
      // Return undefined if scoring is not yet complete
      if (additional === 'NOPE') return;
      else return 10 + additional;
    } else if (this.isSpare()) {
      return 10 + this.getPinsFromNextRolls(1);
    } else if (this.finished) {
      return NUM_PINS - this.pins;
    }
  };

  Frame.prototype._scoreFinal = function () {
    if (typeof this.history[0] !== 'undefined' &&
        typeof this.history[1] !== 'undefined' &&
        typeof this.history[2] !== 'undefined' &&
        (this.isStrike() || this.isSpare())) {
      this.finished = true;
      return this.history[0] + this.history[1] + this.history[2];
    } else if (typeof this.history[0] !== 'undefined' && 
               typeof this.history[1] !== 'undefined') {
      this.finished = true;
      return this.history[0] + this.history[1];
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