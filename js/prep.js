
$(function() {
  /*
      
           Global Variables
  */

  var aiTurn, attackTerritory, changePlayer, i, item, pickRacePower, setPlayerTable, setTerritoryForPlayer, showRacePowerStack, territoryAttack, updatePlayerTokens, _i, _j, _len, _len1, _ref, _ref1,
    _this = this;
  window.gameRound = 10;
  window.currentRound = 1;
  window.currentPlayer = 1;
  window.canPickRace = true;
  /*
      
           General Functions
  */

  aiTurn = function() {
    var j, pick, r, race, _results;
    j = window.currentPlayer - 1;
    if (window.window.players[j].canPickRace) {
      race = Math.floor((Math.random() * 6) + 1);
      pickRacePower(race);
    }
    r = window.players[j].civilizations.length - 1;
    _results = [];
    while (window.players[j].canAttack === true) {
      pick = Math.floor((Math.random() * (window.territories.length - 1)) + 1);
      console.log(pick);
      _results.push(territoryAttack(j, r, pick));
    }
    return _results;
  };
  updatePlayerTokens = function(j, r, needed) {
    window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed;
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens);
    if (window.players[j].civilizations[r].totalTokens === 0) {
      changePlayer();
    }
  };
  setTerritoryForPlayer = function(j, r, index, tokens) {
    window.territories[index].playerTokens = tokens;
    window.territories[index].playerId = j;
    window.territories[index].playerTerritory = window.players[j].territory.length;
    window.players[j].territory.push(window.territories[index]);
    return console.log(window.players[j].territory[window.territories[index].playerTerritory]);
  };
  attackTerritory = function(j, r, index) {
    var dieRoll, needed;
    if (window.players[j].civilizations[r].totalTokens === 0) {
      changePlayer();
      return false;
    }
    console.log(window.players[j].name + ' is attacking territory: ' + window.territories[index].id);
    console.log('  Type is: ' + window.territories[index].type);
    console.log(window.players[j].name + ' Current Tokens: ', window.players[j].civilizations[r].totalTokens);
    needed = window.territories[index].tokensNeeded();
    console.log('Number of Tokens needed to attack', needed);
    if (needed <= window.players[j].civilizations[r].totalTokens) {
      setTerritoryForPlayer(j, r, index, needed);
      updatePlayerTokens(j, r, needed);
      console.log(window.players[j].name + ' now has Tokens: ', window.players[j].civilizations[r].totalTokens);
      return true;
    } else {
      if (window.players[j].civilizations[r].totalTokens === 0) {
        changePlayer();
        return false;
      } else {
        console.log(window.players[j].name + ' is rolling the die');
        dieRoll = window.rollDie();
        console.log(window.players[j].name + ' rolled a ' + dieRoll);
        if (needed <= window.players[j].civilizations[r].totalTokens + dieRoll) {
          setTerritoryForPlayer(j, r, index, window.players[j].civilizations[r].totalTokens);
          console.log('Roll was successful.');
          updatePlayerTokens(j, r, window.players[j].civilizations[r].totalTokens);
          return true;
        } else {
          console.log(window.players[j].name + ' failed the roll.');
          changePlayer();
          return false;
        }
      }
    }
    return window.players[j].civilizations[r].startRound = false;
  };
  changePlayer = function() {
    window.players[window.currentPlayer - 1].canAttack = false;
    window.currentPlayer++;
    if (window.currentPlayer > window.players.length) {
      window.currentRound++;
      console.log('Starting Round ' + window.currentRound);
      window.currentPlayer = 1;
      window.players[window.currentPlayer - 1].canAttack = true;
      return console.log('Current player is ' + window.players[window.currentPlayer - 1].name + '.');
    } else {
      window.players[window.currentPlayer - 1].canAttack = true;
      console.log('Current player is ' + window.players[window.currentPlayer - 1].name + '.');
      if (window.players[window.currentPlayer - 1].playerType === 'ai') {
        return aiTurn();
      }
    }
  };
  showRacePowerStack = function(stack, num) {
    var race;
    if (stack.race) {
      race = stack.race.name;
    } else {
      race = '';
    }
    $('#card-stack').find('tbody:last').append('<tr data-id="' + num + '"><td></td><td>' + race + ' - ' + stack.power.name + '</td><td>' + stack.totalTokens + '</td></tr>');
    if (num >= 6) {
      $("#card-stack tbody").find('[data-id="' + num + '"]').hide();
    }
  };
  setPlayerTable = function(item, i) {
    $("#playerTable").find('tbody:last').append('<tr data-id="' + i + '"><td>' + item.name + '</td><td>' + item.victoryPoints + '</td><td data-td="race_power"></td><td data-td="tokens"></td></tr>');
  };
  pickRacePower = function(row) {
    var i, id, item, j, _i, _len, _ref;
    id = $(row).data("id");
    j = window.currentPlayer - 1;
    if ($("#card-stack tbody").find('[data-id="' + id + '"]').index() > window.players[j].victoryPoints) {
      alert('You don\'t have enough Victory Points to choose that race.');
    }
    _ref = window.racePowerStack;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      item = _ref[i];
      if (!(i < id)) {
        continue;
      }
      if ($("#card-stack tbody").find('[data-id="' + i + '"]').index() >= 0 && id !== i) {
        window.racePowerStack[i].points++;
        window.players[j].victoryPoints--;
      }
      $("#card-stack tbody").find('[data-id="' + i + '"]').find('td:first').html(window.racePowerStack[i].points);
      $("#playerTable tbody").find('[data-id="' + j + '"]').find('td:eq(1)').html(window.players[j].victoryPoints);
    }
    window.players[j].victoryPoints += window.racePowerStack[id].points;
    window.racePowerStack[id].points = 0;
    window.players[j].civilizations.push(window.racePowerStack[id]);
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="race_power"]').html(window.racePowerStack[id].race.name + ' - ' + window.racePowerStack[id].power.name);
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('td:last').html(window.racePowerStack[id].totalTokens);
    console.log(window.players[j].name + ' has chosen as their race: ' + window.racePowerStack[id].race.name);
    console.log(window.players[j].name + ' has chosen as their power: ' + window.racePowerStack[id].power.name);
    $("#card-stack tbody tr:eq(5)").next().show();
    $(row).remove();
    window.racePowerStack[id]["delete"];
    return window.window.players[j].canPickRace = false;
  };
  territoryAttack = function(j, r, index) {
    if (window.players[j].civilizations[r].startRound) {
      if (window.territories[index].edgeBorder) {
        return window.players[j].canAttack = attackTerritory(j, r, index);
      } else {
        console.log('You must chose a territory on the edge.');
        return false;
      }
    } else {
      if (window.territories[index].isAdjacent(window.players[j].territory)) {
        return window.players[j].canAttack = attackTerritory(j, r, index);
      } else {
        console.log('That territory is not adjacent.');
        return false;
      }
    }
  };
  /*
      
           Loops to Build things
  */

  _ref = window.players;
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    item = _ref[i];
    setPlayerTable(window.players[i], i);
  }
  _ref1 = window.racePowerStack;
  for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
    item = _ref1[i];
    showRacePowerStack(item, i);
  }
  /*
           
           jQuery UI functions
  */

  $('.map').maphilight(function() {
    return {
      fade: false
    };
  });
  $(".territory").bind('hover', function() {
    var id, index;
    id = this.id.split("-");
    return index = parseInt(id[1] - 1);
  });
  $(".territory").bind('click', function() {
    var data, id, index;
    id = this.id.split("-");
    index = parseInt(id[1] - 1);
    data = $('#' + this.id).data('maphilight') || {};
    data.fillColor = "cccccc";
    return $('#' + this.id).data('maphilight', data);
  });
  $(".territory").bind('dblclick', function() {
    var id, index, j, r;
    id = this.id.split("-");
    index = parseInt(id[1] - 1);
    j = window.currentPlayer - 1;
    r = window.players[j].civilizations.length - 1;
    return territoryAttack(j, r, index);
  });
  return $("#card-stack tbody tr").bind('click', function() {
    if (window.window.players[window.currentPlayer - 1].canPickRace) {
      return pickRacePower(this);
    } else {
      return alert('You have already picked a race this round.');
    }
  });
});
