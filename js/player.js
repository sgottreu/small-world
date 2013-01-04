var Player;

Player = (function() {

  function Player(data) {
    var key, value, _ref;
    this.data = data;
    this.name = false;
    this.victoryPoints = 5;
    this.territory = new Array();
    this.civilizations = new Array();
    this.totalTerritories = 0;
    this.playerType = '';
    this.hasPlayed = new Array();
    this.canAttack = false;
    this.canPickRace = true;
    _ref = this.data;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    this.data = null;
  }

  Player.prototype.set = function(data) {
    var key, value, _ref;
    _ref = this.data;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    return this.data = null;
  };

  return Player;

})();

window.players = [
  new Player({
    name: 'Me',
    playerType: 'person'
  }), new Player({
    name: 'HAL 2000',
    playerType: 'ai'
  })
];
