(function (root) {
  const Game = function (div) {
    this.div = div;
    this.bowling = new Bowling();
  };

  Game.prototype.bowl = function () {
    this.bowling.bowl();
    this.div.innerHTML = JSON.stringify(this.bowling.print());
  };
})(this);