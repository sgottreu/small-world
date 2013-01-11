var Amazons, Dwarves, Elves, Ghouls, Giants, Halflings, Humans, Orcs, Race, Ratmen, Skeletons, Sorcerers, Tritons, Trolls, Wizards,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Race = (function() {

  function Race(data) {
    var key, value, _ref;
    this.data = data;
    this.name = false;
    this.totalAvailTokens = 0;
    this.startingTokens = 0;
    this.inDecline = false;
    this.power = false;
    this.currentTokens = 0;
    this.firstPlay = true;
    _ref = this.data;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    this.data = null;
  }

  Race.prototype.attackStrength = function(points) {
    return points;
  };

  Race.prototype.checkVictoryPoints = function(points) {
    console.log('Returning Race Victory points');
    return points;
  };

  return Race;

})();

Amazons = (function(_super) {

  __extends(Amazons, _super);

  function Amazons() {
    return Amazons.__super__.constructor.apply(this, arguments);
  }

  Amazons.prototype.attackStrength = function(territory, j) {
    return Amazons.__super__.attackStrength.call(this, 0);
  };

  Amazons.prototype.checkVictoryPoints = function(territory, j) {
    return Amazons.__super__.checkVictoryPoints.call(this, 0);
  };

  return Amazons;

})(Race);

Dwarves = (function(_super) {

  __extends(Dwarves, _super);

  function Dwarves() {
    return Dwarves.__super__.constructor.apply(this, arguments);
  }

  Dwarves.prototype.attackStrength = function(territory, j) {
    return Dwarves.__super__.attackStrength.call(this, 0);
  };

  Dwarves.prototype.checkVictoryPoints = function(territory, j) {
    if (territory.isMine) {
      return Dwarves.__super__.checkVictoryPoints.call(this, 1);
    } else {
      return Dwarves.__super__.checkVictoryPoints.call(this, 0);
    }
  };

  return Dwarves;

})(Race);

Elves = (function(_super) {

  __extends(Elves, _super);

  function Elves() {
    return Elves.__super__.constructor.apply(this, arguments);
  }

  Elves.prototype.attackStrength = function(territory, j) {
    return Elves.__super__.attackStrength.call(this, 0);
  };

  Elves.prototype.checkVictoryPoints = function(territory, j) {
    return Elves.__super__.checkVictoryPoints.call(this, 0);
  };

  return Elves;

})(Race);

Ghouls = (function(_super) {

  __extends(Ghouls, _super);

  function Ghouls() {
    return Ghouls.__super__.constructor.apply(this, arguments);
  }

  Ghouls.prototype.attackStrength = function(territory, j) {
    return Ghouls.__super__.attackStrength.call(this, 0);
  };

  Ghouls.prototype.checkVictoryPoints = function(territory, j) {
    return Ghouls.__super__.checkVictoryPoints.call(this, 0);
  };

  return Ghouls;

})(Race);

Ratmen = (function(_super) {

  __extends(Ratmen, _super);

  function Ratmen() {
    return Ratmen.__super__.constructor.apply(this, arguments);
  }

  Ratmen.prototype.attackStrength = function(territory, j) {
    return Ratmen.__super__.attackStrength.call(this, 0);
  };

  Ratmen.prototype.checkVictoryPoints = function(territory, j) {
    return Ratmen.__super__.checkVictoryPoints.call(this, 0);
  };

  return Ratmen;

})(Race);

Skeletons = (function(_super) {

  __extends(Skeletons, _super);

  function Skeletons() {
    return Skeletons.__super__.constructor.apply(this, arguments);
  }

  Skeletons.prototype.attackStrength = function(territory, j) {
    return Skeletons.__super__.attackStrength.call(this, 0);
  };

  Skeletons.prototype.checkVictoryPoints = function(territory, j) {
    return Skeletons.__super__.checkVictoryPoints.call(this, 0);
  };

  return Skeletons;

})(Race);

Sorcerers = (function(_super) {

  __extends(Sorcerers, _super);

  function Sorcerers() {
    return Sorcerers.__super__.constructor.apply(this, arguments);
  }

  Sorcerers.prototype.attackStrength = function(territory, j) {
    return Sorcerers.__super__.attackStrength.call(this, 0);
  };

  Sorcerers.prototype.checkVictoryPoints = function(territory, j) {
    return Sorcerers.__super__.checkVictoryPoints.call(this, 0);
  };

  return Sorcerers;

})(Race);

Tritons = (function(_super) {

  __extends(Tritons, _super);

  function Tritons() {
    return Tritons.__super__.constructor.apply(this, arguments);
  }

  Tritons.prototype.attackStrength = function(territory, j) {
    return Tritons.__super__.attackStrength.call(this, 0);
  };

  Tritons.prototype.checkVictoryPoints = function(territory, j) {
    return Tritons.__super__.checkVictoryPoints.call(this, 0);
  };

  return Tritons;

})(Race);

Giants = (function(_super) {

  __extends(Giants, _super);

  function Giants() {
    return Giants.__super__.constructor.apply(this, arguments);
  }

  Giants.prototype.attackStrength = function(territory, j) {
    var i, item, _i, _len, _ref;
    _ref = territory.adjacent;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      item = _ref[i];
      if (territory.mountainBorder && window.territories[item - 1].mountain && window.territories[item - 1].playerId === j) {
        return Giants.__super__.attackStrength.call(this, -1);
      }
    }
    return Giants.__super__.attackStrength.call(this, 0);
  };

  Giants.prototype.checkVictoryPoints = function(territory, j) {
    return Giants.__super__.checkVictoryPoints.call(this, 0);
  };

  return Giants;

})(Race);

Halflings = (function(_super) {

  __extends(Halflings, _super);

  function Halflings(data) {
    this.data = data;
    Halflings.__super__.constructor.call(this, this.data);
  }

  Halflings.prototype.checkVictoryPoints = function(territory, j) {};

  return Halflings;

})(Race);

({
  attackStrength: function(territory, j) {
    return attackStrength.__super__.constructor.call(this, 0);
  },
  checkVictoryPoints: function(territory, j) {
    return checkVictoryPoints.__super__.constructor.call(this, 0);
  }
});

Humans = (function(_super) {

  __extends(Humans, _super);

  function Humans() {
    return Humans.__super__.constructor.apply(this, arguments);
  }

  Humans.prototype.attackStrength = function(territory, j) {
    return Humans.__super__.attackStrength.call(this, 0);
  };

  Humans.prototype.checkVictoryPoints = function(territory, j) {
    if (territory.type === 'farm') {
      console.log('+1 for Territory ' + territory.id + ' which is farm');
      return Humans.__super__.checkVictoryPoints.call(this, 1);
    } else {
      return Humans.__super__.checkVictoryPoints.call(this, 0);
    }
  };

  return Humans;

})(Race);

Orcs = (function(_super) {

  __extends(Orcs, _super);

  function Orcs() {
    return Orcs.__super__.constructor.apply(this, arguments);
  }

  Orcs.prototype.attackStrength = function(territory, j) {
    return Orcs.__super__.attackStrength.call(this, 0);
  };

  Orcs.prototype.checkVictoryPoints = function(territory, j) {
    console.log('Calculating Orc Victory points');
    if (territory.nonEmpty[j] === true) {
      console.log('+1 for non-Empty Territory ' + territory.id);
      return Orcs.__super__.checkVictoryPoints.call(this, 1);
    } else {
      return Orcs.__super__.checkVictoryPoints.call(this, 0);
    }
  };

  return Orcs;

})(Race);

Trolls = (function(_super) {

  __extends(Trolls, _super);

  function Trolls() {
    return Trolls.__super__.constructor.apply(this, arguments);
  }

  Trolls.prototype.attackStrength = function(territory, j) {
    return Trolls.__super__.attackStrength.call(this, 0);
  };

  Trolls.prototype.checkVictoryPoints = function(territory, j) {
    return Trolls.__super__.checkVictoryPoints.call(this, 0);
  };

  return Trolls;

})(Race);

Wizards = (function(_super) {

  __extends(Wizards, _super);

  function Wizards() {
    this.checkVictoryPoints = __bind(this.checkVictoryPoints, this);
    return Wizards.__super__.constructor.apply(this, arguments);
  }

  Wizards.prototype.attackStrength = function(territory, j) {
    return Wizards.__super__.attackStrength.call(this, 0);
  };

  Wizards.prototype.checkVictoryPoints = function(territory, j) {
    if (territory.isMagic) {
      return Wizards.__super__.checkVictoryPoints.call(this, 1);
    } else {
      return Wizards.__super__.checkVictoryPoints.call(this, 0);
    }
  };

  return Wizards;

})(Race);

window.races = [
  new Amazons({
    name: 'Amazons',
    totalAvailTokens: 15,
    startingTokens: 6
  }), new Dwarves({
    name: 'Dwarves',
    totalAvailTokens: 8,
    startingTokens: 3
  }), new Elves({
    name: 'Elves',
    totalAvailTokens: 11,
    startingTokens: 6
  }), new Ghouls({
    name: 'Ghouls',
    totalAvailTokens: 10,
    startingTokens: 5
  }), new Ratmen({
    name: 'Ratmen',
    totalAvailTokens: 13,
    startingTokens: 8
  }), new Skeletons({
    name: 'Skeletons',
    totalAvailTokens: 20,
    startingTokens: 6
  }), new Sorcerers({
    name: 'Sorcerers',
    totalAvailTokens: 18,
    startingTokens: 5
  }), new Tritons({
    name: 'Tritons',
    totalAvailTokens: 11,
    startingTokens: 6
  }), new Giants({
    name: 'Giants',
    totalAvailTokens: 11,
    startingTokens: 6
  }), new Halflings({
    name: 'Halflings',
    totalAvailTokens: 11,
    startingTokens: 6,
    holeInTheGrounds: 2
  }), new Humans({
    name: 'Humans',
    totalAvailTokens: 10,
    startingTokens: 5
  }), new Orcs({
    name: 'Orcs',
    totalAvailTokens: 10,
    startingTokens: 5
  }), new Trolls({
    name: 'Trolls',
    totalAvailTokens: 10,
    startingTokens: 5
  }), new Wizards({
    name: 'Wizards',
    totalAvailTokens: 10,
    startingTokens: 5
  })
];

window.raceStack = window.fisherYates(window.races);
