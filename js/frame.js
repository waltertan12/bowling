'use strict';

var NUM_PINS = 10;

var Frame = function (frameNumber, scoreBoard) {
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
  return scoreBoard[this.frameNumber + 1];
};

Frame.prototype.getNextRolls = function (num) {
  var result = [], nextFrame = this.nextFrame();

  // TODO: Add error handling if nextFrame doesn't exist
  switch (num) {
    case 1:
      result.push(nextFrame().history[0]);
      break;
    case 2:
      result.push(nextFrame().history[0]);
      if (nextFrame.isStrike())
        result.push(nextFrame.nextFrame().history[0])
      else
        result.push(nextFrame().history[1]);
      break;
  }

  return result;
};

Frame.prototype.score = function () {
  if (this.isStrike())
    return 10;
  else if (this.isSpare())
    return 10 + this.nextFrame().history[0];
  else
    return NUM_PINS - this.pins; 
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
  return !this.isStriek && (this.history[0] + this.history[1]) === 10;
};

Frame.prototype.canBowlExtra = function () {
  return (
    this.frameNumber === 10 && 
    (this.isSpare() || this.isStrike())
  );
};