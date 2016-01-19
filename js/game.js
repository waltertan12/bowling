(function (root) {
  const isReallyNan = function (x) {
    return x !== x;
  };

  const Game = root.Game =  function (div) {
    this.div = div;
    this.bowling = new Bowling();
  };

  Game.prototype.bowl = function (type, numToRemove) {
    this.bowling.bowl(type, numToRemove);
    this.actuate();
  };

  Game.prototype.reset = function () {
    this.bowling.reset();
    this._reset();
  };

  Game.prototype._reset = function () {
    for (var i = 0; i < 10; i++) {
      children = this.div.children[i].children;
      if (i < 9) {
        children[0].textContent = ''
        children[1].textContent = ''
        children[2].textContent = ''
      } else {
        children[0].textContent = ''
        children[1].textContent = ''
        children[2].textContent = ''
        children[3].textContent = '';
      }
    }
  };

  Game.prototype.actuate = function () {
    var child, frame, totalScore = 0;
    for (var i = 0; i < 10; i++) {
      frame = this.bowling.scoreBoard[i];
      if (typeof frame === 'undefined') break;
      
      children = this.div.children[i].children;
      if (i < 9) {
        children[0].textContent = frame.history[0];
        children[1].textContent = frame.history[1];
        totalScore += frame.score();
        if (typeof totalScore === 'number' && !isReallyNan(totalScore)) 
          children[2].textContent = totalScore;
      } else {
        children[0].textContent = frame.history[0];
        children[1].textContent = frame.history[1];
        children[2].textContent = frame.history[2];
        totalScore += frame.score();
        if (typeof totalScore === 'number' && !isReallyNan(totalScore)) 
          children[3].textContent = totalScore;
      }
    }
  };
})(this);