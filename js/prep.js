
$(function() {
  /*
      
           Global Variables
  */

  var aiTurn, attackTerritory, changePlayer, checkAI, gatherTokens, i, item, pickRacePower, prepForTurn, setPlayerTable, setTerritoryForPlayer, showRacePowerStack, territoryAttack, updatePlayerTokens, _i, _j, _len, _len1, _ref, _ref1,
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
      console.log(window.racePowerStack[race]);
      while (window.racePowerStack[race] === null) {
        race = Math.floor((Math.random() * 6) + 1);
      }
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
    var next;
    window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed;
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens);
    if (window.players[j].civilizations[r].totalTokens === 0) {
      next = changePlayer(j, r);
      checkAI(next);
    }
    window.players[j].civilizations[r].startRound = false;
  };
  setTerritoryForPlayer = function(j, r, index, tokens) {
    window.territories[index].playerTokens = tokens;
    window.territories[index].playerId = j;
    window.territories[index].playerTerritory = window.players[j].territory.length;
    return window.players[j].territory.push(window.territories[index]);
  };
  attackTerritory = function(j, r, index) {
    var dieRoll, needed, next;
    if (window.players[j].civilizations[r].totalTokens === 0) {
      next = changePlayer(j, r);
      checkAI(next);
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
        next = changePlayer(j, r);
        checkAI(next);
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
          next = changePlayer(j, r);
          checkAI(next);
          return false;
        }
      }
    }
  };
  checkAI = function(j) {
    if (window.players[j].playerType === 'ai') {
      aiTurn();
      return true;
    }
    return false;
  };
  changePlayer = function(j, r) {
    window.players[j].canAttack = false;
    console.log(window.players[j].name + ' has completed their turn.');
    window.currentPlayer++;
    if (window.currentPlayer > window.players.length) {
      console.log('Concluding Round ' + window.currentRound);
      window.currentRound++;
      console.log('Starting Round ' + window.currentRound);
      window.currentPlayer = 1;
      j = window.currentPlayer - 1;
      console.log('Current player is ' + window.players[j].name + '.');
      prepForTurn(j, r);
    } else {
      j = window.currentPlayer - 1;
      console.log('Current player is ' + window.players[j].name + '.');
      prepForTurn(j, r);
    }
    return j;
  };
  prepForTurn = function(j, r) {
    gatherTokens(j, r);
    return window.players[j].canAttack = true;
  };
  gatherTokens = function(j, r) {
    var i, item, tokens, _i, _len, _ref;
    if (!window.window.players[j].canPickRace) {
      _ref = window.territories;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (item.playerId === j) {
          tokens = parseInt(item.playerTokens) - 1;
          window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens + tokens;
          console.log('Pulling ' + tokens + ' tokens from territory ' + item.id);
        }
      }
      return console.log(window.players[j].name + ' has ' + window.players[j].civilizations[r].totalTokens + ' tokens');
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
    j = window.currentPlayer - 1;
    if (window.players[j].playerType === 'ai') {
      row = $("#card-stack tbody").find('[data-id="' + row + '"]');
    }
    id = $(row).data("id");
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
    window.racePowerStack[id] = null;
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

  /*
      $('.map').maphilight => {neverOn: true}
      $(".territory").bind 'hover', ->
          id = this.id.split("-")
          index = parseInt(id[1] - 1)
          
      $(".territory").bind 'click', ->
          id = this.id.split("-")
          index = parseInt(id[1] - 1)
          
          data = $('#'+this.id).data('maphilight') || {}
          data.fillColor = "cccccc"
          data.alwaysOn = true
          $('#'+this.id).data('maphilight', data)
  */

  $(".territory").bind('dblclick', function() {
    var coords, id, index, j, r;
    id = this.id.split("-");
    index = parseInt(id[1] - 1);
    j = window.currentPlayer - 1;
    r = window.players[j].civilizations.length - 1;
    coords = $(this).attr("coords").split(",");
    window.colorTerritory(window.players[j].color, coords);
    return territoryAttack(j, r, index);
  });
  $("#card-stack tbody tr").bind('click', function() {
    if (window.window.players[window.currentPlayer - 1].canPickRace) {
      pickRacePower(this);
    } else {
      alert('You have already picked a race this round.');
    }
  });
});
