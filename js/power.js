var Alchemist, Berserk, Bivouacking, Commando, Diplomat, DragonMaster, Flying, Forest, Fortified, Heroic, Hill, Merchant, Mounted, Pillaging, Power, Seafaring, Spirit, Stout, Swamp, Underworld, Wealthy, i, num, setStartingStrength, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  _this = this;

Power = (function() {

  function Power(data) {
    var key, value, _ref;
    this.data = data;
    this.name = false;
    this.coins = 0;
    this.territory = [];
    this.perRound = false;
    this.perGame = false;
    _ref = this.data;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    this.data = null;
  }

  Power.prototype.set = function(data) {
    var key, value, _ref;
    _ref = this.data;
    for (key in _ref) {
      value = _ref[key];
      this[key] = value;
    }
    return this.data = null;
  };

  Power.prototype.attackStrength = function(territory, points) {};

  return Power;

})();

Alchemist = (function(_super) {

  __extends(Alchemist, _super);

  function Alchemist() {
    return Alchemist.__super__.constructor.apply(this, arguments);
  }

  Alchemist.prototype.set = function() {};

  return Alchemist;

})(Power);

Berserk = (function(_super) {

  __extends(Berserk, _super);

  function Berserk() {
    return Berserk.__super__.constructor.apply(this, arguments);
  }

  Berserk.prototype.set = function() {};

  return Berserk;

})(Power);

Bivouacking = (function(_super) {

  __extends(Bivouacking, _super);

  function Bivouacking() {
    return Bivouacking.__super__.constructor.apply(this, arguments);
  }

  Bivouacking.prototype.set = function() {};

  return Bivouacking;

})(Power);

Commando = (function(_super) {

  __extends(Commando, _super);

  function Commando() {
    return Commando.__super__.constructor.apply(this, arguments);
  }

  Commando.prototype.set = function() {};

  return Commando;

})(Power);

Diplomat = (function(_super) {

  __extends(Diplomat, _super);

  function Diplomat() {
    return Diplomat.__super__.constructor.apply(this, arguments);
  }

  Diplomat.prototype.set = function() {};

  return Diplomat;

})(Power);

DragonMaster = (function(_super) {

  __extends(DragonMaster, _super);

  function DragonMaster() {
    return DragonMaster.__super__.constructor.apply(this, arguments);
  }

  DragonMaster.prototype.set = function() {};

  return DragonMaster;

})(Power);

Flying = (function(_super) {

  __extends(Flying, _super);

  function Flying() {
    return Flying.__super__.constructor.apply(this, arguments);
  }

  Flying.prototype.set = function() {};

  return Flying;

})(Power);

Forest = (function(_super) {

  __extends(Forest, _super);

  function Forest() {
    return Forest.__super__.constructor.apply(this, arguments);
  }

  Forest.prototype.set = function() {};

  return Forest;

})(Power);

Fortified = (function(_super) {

  __extends(Fortified, _super);

  function Fortified() {
    return Fortified.__super__.constructor.apply(this, arguments);
  }

  Fortified.prototype.set = function() {};

  return Fortified;

})(Power);

Heroic = (function(_super) {

  __extends(Heroic, _super);

  function Heroic() {
    return Heroic.__super__.constructor.apply(this, arguments);
  }

  Heroic.prototype.set = function() {};

  return Heroic;

})(Power);

Hill = (function(_super) {

  __extends(Hill, _super);

  function Hill() {
    return Hill.__super__.constructor.apply(this, arguments);
  }

  Hill.prototype.set = function() {};

  return Hill;

})(Power);

Merchant = (function(_super) {

  __extends(Merchant, _super);

  function Merchant() {
    return Merchant.__super__.constructor.apply(this, arguments);
  }

  Merchant.prototype.set = function() {};

  return Merchant;

})(Power);

Mounted = (function(_super) {

  __extends(Mounted, _super);

  function Mounted() {
    return Mounted.__super__.constructor.apply(this, arguments);
  }

  Mounted.prototype.set = function() {};

  return Mounted;

})(Power);

Pillaging = (function(_super) {

  __extends(Pillaging, _super);

  function Pillaging() {
    return Pillaging.__super__.constructor.apply(this, arguments);
  }

  Pillaging.prototype.set = function() {};

  return Pillaging;

})(Power);

Seafaring = (function(_super) {

  __extends(Seafaring, _super);

  function Seafaring() {
    return Seafaring.__super__.constructor.apply(this, arguments);
  }

  Seafaring.prototype.set = function() {};

  return Seafaring;

})(Power);

Spirit = (function(_super) {

  __extends(Spirit, _super);

  function Spirit() {
    return Spirit.__super__.constructor.apply(this, arguments);
  }

  Spirit.prototype.set = function() {};

  return Spirit;

})(Power);

Stout = (function(_super) {

  __extends(Stout, _super);

  function Stout() {
    return Stout.__super__.constructor.apply(this, arguments);
  }

  Stout.prototype.set = function() {};

  return Stout;

})(Power);

Swamp = (function(_super) {

  __extends(Swamp, _super);

  function Swamp() {
    return Swamp.__super__.constructor.apply(this, arguments);
  }

  Swamp.prototype.set = function() {};

  return Swamp;

})(Power);

Underworld = (function(_super) {

  __extends(Underworld, _super);

  function Underworld() {
    return Underworld.__super__.constructor.apply(this, arguments);
  }

  Underworld.prototype.set = function() {};

  Underworld.prototype.attackStrength = function(territory, points) {
    var adjusted;
    if (territory.isUnderworld) {
      adjusted = points - 1;
    } else {
      adjusted = points;
    }
    return adjusted;
  };

  return Underworld;

})(Power);

Wealthy = (function(_super) {

  __extends(Wealthy, _super);

  function Wealthy() {
    return Wealthy.__super__.constructor.apply(this, arguments);
  }

  Wealthy.prototype.set = function() {};

  return Wealthy;

})(Power);

window.powers = [
  new Alchemist({
    name: 'Alchemist',
    coins: 2,
    perRound: true,
    startingTokens: 4
  }), new Berserk({
    name: 'Berserk',
    startingTokens: 4
  }), new Bivouacking({
    name: 'Bivouacking',
    startingTokens: 5
  }), new Commando({
    name: 'Commando',
    startingTokens: 4
  }), new Diplomat({
    name: 'Diplomat',
    startingTokens: 5
  }), new DragonMaster({
    name: 'Dragon Master',
    startingTokens: 5
  }), new Flying({
    name: 'Flying',
    startingTokens: 5
  }), new Forest({
    name: 'Forest',
    startingTokens: 4
  }), new Fortified({
    name: 'Fortified',
    startingTokens: 3
  }), new Heroic({
    name: 'Heroic',
    startingTokens: 5
  }), new Hill({
    name: 'Hill',
    coins: 1,
    territories: ['hill'],
    startingTokens: 4
  }), new Merchant({
    name: 'Merchant',
    startingTokens: 2
  }), new Mounted({
    name: 'Mounted',
    coins: 1,
    territories: ['hill', 'farm'],
    startingTokens: 5
  }), new Pillaging({
    name: 'Pillaging',
    startingTokens: 5
  }), new Seafaring({
    name: 'Seafaring',
    coins: 1,
    territories: ['water'],
    startingTokens: 5
  }), new Spirit({
    name: 'Spirit',
    startingTokens: 5
  }), new Stout({
    name: 'Stout',
    startingTokens: 4
  }), new Swamp({
    name: 'Swamp',
    coins: 1,
    territories: ['swamp'],
    startingTokens: 4
  }), new Underworld({
    name: 'Underworld',
    startingTokens: 5
  }), new Wealthy({
    name: 'Wealthy',
    startingTokens: 4
  })
];

window.powerStack = window.fisherYates(window.powers);

window.racePowerStack = [];

setStartingStrength = function(row) {
  window.racePowerStack[i].totalTokens = window.racePowerStack[i].race.startingTokens + window.racePowerStack[i].power.startingTokens;
  return window.racePowerStack[i].startRound = true;
};

_ref = window.powerStack;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  num = _ref[_i];
  window.racePowerStack.push({
    power: num
  });
}

_ref1 = window.raceStack;
for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
  num = _ref1[i];
  window.racePowerStack[i].race = num;
}

_ref2 = window.raceStack;
for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
  num = _ref2[i];
  window.racePowerStack[i].points = 0;
}

_ref3 = window.raceStack;
for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
  num = _ref3[i];
  setStartingStrength(i);
}
