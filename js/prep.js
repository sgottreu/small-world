
$(function() {
  /*
      
           Global Variables
  */

  var aiTurn, attackTerritory, calculateVictoryPoints, changePlayer, checkAI, claimTerritory, debugTerritories, declareWinner, gatherTokens, getAccoutrements, getAttackStrength, i, item, pickRacePower, prepForTurn, setPlayerTable, setTerritoryForPlayer, showRacePowerStack, territoryAttack, updatePlayerTokens, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2,
    _this = this;
  window.gameRounds = 10;
  window.currentRound = 1;
  window.currentPlayer = 1;
  window.canPickRace = true;
  window.currentTerritory = false;
  /*    
  
       General Functions
  */

  aiTurn = function() {
    var attack, j, pick, r, race;
    if (window.currentRound > window.gameRounds) {
      console.log('Game over');
      return false;
    } else {
      j = window.currentPlayer - 1;
      if (window.window.players[j].canPickRace) {
        if (window.debug) {
          race = 0;
        } else {
          race = Math.floor((Math.random() * 6) + 1);
        }
        while (window.racePowerStack[race] === null) {
          race = Math.floor((Math.random() * 6) + 1);
        }
        pickRacePower(race);
      }
      r = window.players[j].civilizations.length - 1;
      attack = window.players[j].canAttack;
      while (window.players[j].canAttack === true) {
        pick = Math.floor((Math.random() * (window.territories.length - 1)) + 1);
        attack = territoryAttack(j, r, pick);
        if (attack === false) {
          break;
        }
      }
    }
  };
  updatePlayerTokens = function(j, r, needed) {
    var other;
    other = window.currentTerritory;
    window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed;
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens);
    window.players[j].civilizations[r].startRound = false;
    if (other.playerId !== false) {
      if (!window.players[other.playerId].civilizations[other.playerCivilization].race.inDecline) {
        console.log(window.players[other.playerId].name + ' currently has ' + window.players[other.playerId].civilizations[other.playerCivilization].totalTokens + ' tokens');
        if (window.players[other.playerId].civilizations[other.playerCivilization].race.name === 'Elves') {
          console.log('Returning ' + other.playerTokens + ' tokens to ' + window.players[other.playerId].name);
          window.players[other.playerId].civilizations[other.playerCivilization].totalTokens += other.playerTokens;
        } else {
          console.log('Returning ' + other.playerTokens + ' tokens to ' + window.players[other.playerId].name + ' - 1');
          window.players[other.playerId].civilizations[other.playerCivilization].totalTokens += other.playerTokens - 1;
        }
        return console.log(window.players[other.playerId].name + ' now has ' + window.players[other.playerId].civilizations[other.playerCivilization].totalTokens + ' tokens');
      }
    }
  };
  claimTerritory = function(j, index) {
    var canvas, coords, ctx;
    coords = $('#territory-' + window.territories[index].id).attr("coords").split(",");
    window.colorTerritory(window.players[j].color, coords);
    canvas = window.document.getElementById("map");
    ctx = canvas.getContext('2d');
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 1.0;
    ctx.fillText(window.territories[index].playerTokens, coords[0], coords[1]);
    debugTerritories(index, false);
  };
  setTerritoryForPlayer = function(j, r, index, tokens) {
    window.territories[index].playerTokens = tokens;
    window.territories[index].playerId = j;
    window.territories[index].playerCivilization = r;
    window.territories[index].nonEmpty[j] = true;
    if (window.players[j].civilizations[r].race.name === 'Trolls') {
      window.territories[index].lair = true;
    }
    return window.players[j].territory.push(window.territories[index]);
  };
  attackTerritory = function(j, r, index) {
    var dieRoll, needed, next;
    window.currentTerritory = window.clone(window.territories[index]);
    if (window.players[j].civilizations[r].totalTokens === 0) {
      next = changePlayer(j, r);
      checkAI(next);
      return false;
    }
    if (window.territories[index].playerId === j && window.territories[index].playerCivilization === r) {
      console.log('----You cannot attack territory of the same race');
      return true;
    }
    console.log(window.players[j].name + ' Current Tokens: ', window.players[j].civilizations[r].totalTokens);
    needed = getAttackStrength(window.territories[index], j, r);
    console.log('Number of Tokens needed to attack', needed);
    console.log(window.players[j].name + ' is attacking territory: ' + window.territories[index].id);
    console.log('  Type is: ' + window.territories[index].type);
    if (needed <= window.players[j].civilizations[r].totalTokens) {
      setTerritoryForPlayer(j, r, index, needed);
      claimTerritory(j, index);
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
          claimTerritory(j, index);
          updatePlayerTokens(j, r, window.players[j].civilizations[r].totalTokens);
          next = changePlayer(j, r);
          checkAI(next);
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
  getAttackStrength = function(territory, j, r) {
    var points;
    points = territory.tokensNeeded();
    points += window.players[j].civilizations[r].race.attackStrength(territory, j);
    points += window.players[j].civilizations[r].power.attackStrength(territory, j);
    return points;
  };
  checkAI = function(j) {
    if (window.players[j].playerType === 'ai') {
      aiTurn();
      return true;
    }
    return false;
  };
  declareWinner = function() {
    var i, item, winnerName, winnerTotal, _i, _len, _ref;
    console.log('The game is over');
    winnerTotal = 0;
    winnerName = '';
    _ref = window.players;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      item = _ref[i];
      if (item.victoryPoints > 0) {
        winnerTotal = item.victoryPoints;
        winnerName = item.name;
      }
    }
    return console.log(winnerName + ' won with ' + winnerTotal + ' Victory Points');
  };
  changePlayer = function(j, r) {
    window.players[j].canAttack = false;
    window.players[j].civilizations[r].startRound = false;
    calculateVictoryPoints(j, r);
    console.log(window.players[j].name + ' has completed their turn.');
    window.currentPlayer++;
    if (window.currentPlayer > window.players.length) {
      console.log('*********');
      console.log('********* Concluding Round ' + window.currentRound);
      console.log('*********');
      window.currentRound++;
      if (window.currentRound > window.gameRounds) {
        declareWinner();
      } else {
        console.log('*********');
        console.log('********* Starting Round ' + window.currentRound);
        console.log('*********');
        window.currentPlayer = 1;
        j = window.currentPlayer - 1;
        console.log('Current player is ' + window.players[j].name + '.');
        prepForTurn(j, r);
      }
    } else {
      j = window.currentPlayer - 1;
      console.log('Current player is ' + window.players[j].name + '.');
      prepForTurn(j, r);
    }
    return j;
  };
  calculateVictoryPoints = function(j, r) {
    var i, item, nonEmpty, _i, _len, _ref;
    nonEmpty = 0;
    console.log('*********');
    console.log('********* Calculating Score');
    console.log('*********');
    _ref = window.territories;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      item = _ref[i];
      if (item.playerId === j) {
        window.players[j].victoryPoints++;
        console.log('+1 for holding Territory ' + item.id);
        window.players[j].victoryPoints += window.players[j].civilizations[r].power.checkVictoryPoints(item, j);
        window.players[j].victoryPoints += window.players[j].civilizations[r].race.checkVictoryPoints(item, j);
      }
    }
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('td:eq(1)').html(window.players[j].victoryPoints);
    console.log('*********');
    console.log('********* Begin Next Player');
    return console.log('*********');
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
          window.territories[i].playerTokens = 1;
          window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens + tokens;
          console.log('Pulling ' + tokens + ' tokens from territory ' + item.id);
          debugTerritories(i, false);
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
    var html;
    html = '<tr data-id="' + i + '"><td>' + item.name + '</td><td>' + item.victoryPoints + '</td><td data-td="civs">' + '<div class="civs" data-civid="header"><div class="race-power">Race-Power</div><div class="tokens">Tokens</div>' + '<div class="decline">Decline</div></div></td></tr>';
    $("#playerTable").find('tbody:last').append(html);
  };
  pickRacePower = function(row) {
    var html, i, id, item, j, r, _i, _len, _ref;
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
      if (window.racePowerStack[i] === null) {
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
    r = window.players[j].civilizations.length - 1;
    html = '<div class="civs" data-civid="' + r + '"><div class="race-power" data-td="race_power">&nbsp;</div>' + '<div class="tokens" data-td="tokens">&nbsp;</div><div class="decline" data-td="decline">' + '<button data-declineid="' + r + '" class="decline">Decline</button></div></div>';
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="civs"]').append(html);
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-civid="' + r + '"]').find('[data-td="race_power"]').html(window.racePowerStack[id].race.name + ' - ' + window.racePowerStack[id].power.name);
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-civid="' + r + '"]').find('[data-td="tokens"]').html(window.racePowerStack[id].totalTokens);
    console.log(window.players[j].name + ' has chosen as their race: ' + window.racePowerStack[id].race.name);
    console.log(window.players[j].name + ' has chosen as their power: ' + window.racePowerStack[id].power.name);
    $("#card-stack tbody tr:eq(5)").next().show();
    $(row).remove();
    window.racePowerStack[id] = null;
    return window.window.players[j].canPickRace = false;
  };
  territoryAttack = function(j, r, index) {
    if (window.territories[index].holeInTheGround) {
      console.log('You can\'t attack a Hole in the Ground.');
      return window.players[j].canAttack;
    }
    if (window.players[j].civilizations[r].startRound) {
      if (window.territories[index].edgeBorder && !window.territories[index].isWater) {
        window.players[j].canAttack = attackTerritory(j, r, index);
        if (window.players[j].civilizations[r].race.name === 'Halflings' && window.players[j].civilizations[r].race.holeInTheGrounds > 0) {
          window.territories[index].holeInTheGround = true;
          window.players[j].civilizations[r].race.holeInTheGrounds = window.players[j].civilizations[r].race.holeInTheGrounds - 1;
        }
        return window.players[j].canAttack;
      } else {
        if (window.territories[index].edgeBorder && window.territories[index].isWater && window.players[j].civilizations[r].power.name === 'Seafaring') {
          window.players[j].canAttack = attackTerritory(j, r, index);
        } else if (window.players[j].civilizations[r].power.name === 'Flying') {
          window.players[j].canAttack = attackTerritory(j, r, index);
        } else if (window.players[j].civilizations[r].race.name === 'Halflings' && window.players[j].civilizations[r].race.holeInTheGrounds === 2) {
          window.players[j].canAttack = attackTerritory(j, r, index);
          window.territories[index].holeInTheGround = true;
          window.players[j].civilizations[r].race.holeInTheGrounds = window.players[j].civilizations[r].race.holeInTheGrounds - 1;
        } else {
          console.log('----You must chose a territory on the edge.');
        }
        return window.players[j].canAttack;
      }
    } else {
      if (window.territories[index].isAdjacent(window.players[j].territory) && !window.territories[index].isWater) {
        window.players[j].canAttack = attackTerritory(j, r, index);
        if (window.players[j].civilizations[r].race.name === 'Halflings' && window.players[j].civilizations[r].race.holeInTheGrounds > 0) {
          window.territories[index].holeInTheGround = true;
          window.players[j].civilizations[r].race.holeInTheGrounds = window.players[j].civilizations[r].race.holeInTheGrounds - 1;
        }
      } else if (window.territories[index].edgeBorder && window.territories[index].isWater && window.players[j].civilizations[r].power.name === 'Seafaring') {
        window.players[j].canAttack = attackTerritory(j, r, index);
      } else if (window.players[j].civilizations[r].power.name === 'Flying') {
        window.players[j].canAttack = attackTerritory(j, r, index);
      } else {
        console.log('----That territory is not adjacent.');
      }
      return window.players[j].canAttack;
    }
  };
  debugTerritories = function(index, start) {
    var accoutrements, html, i, item, _i, _len, _ref;
    accoutrements = getAccoutrements(index);
    html = '<td>' + window.territories[index].id + '</td>';
    html += '<td>' + window.territories[index].playerId + '</td>';
    html += '<td>' + window.territories[index].totalTokens + '</td>';
    html += '<td>' + window.territories[index].playerTokens + '</td>';
    html += '<td>' + window.territories[index].type + '</td>';
    html += '<td>' + accoutrements + '</td>';
    if (start === true) {
      _ref = window.players;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (window.territories[index].lostTribe) {
          window.territories[index].nonEmpty[i] = true;
        } else {
          window.territories[index].nonEmpty[i] = false;
        }
      }
      $('#territoryTable').find('tbody:last').append('<tr data-id="' + index + '">' + html + '</tr>');
    } else {
      $("#territoryTable tbody").find('[data-id="' + index + '"]').html(html);
    }
  };
  getAccoutrements = function(index) {
    var html;
    html = '';
    if (window.territories[index].lair) {
      html += 'Lair<br>';
    }
    if (window.territories[index].fort) {
      html += 'Fort<br>';
    }
    if (window.territories[index].biovauk) {
      html += 'biovauk x ' + window.territories[index].numBiovauk + '<br>';
    }
    if (window.territories[index].herioc) {
      html += 'herioc<br>';
    }
    if (window.territories[index].dragon) {
      html += 'dragon<br>';
    }
    if (window.territories[index].holeInTheGround) {
      html += 'holeInTheGround<br>';
    }
    return html;
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
  _ref2 = window.territories;
  for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
    item = _ref2[i];
    debugTerritories(i, true);
  }
  /*
           
           jQuery UI functions
  */

  $(".territory").bind('hover', function() {
    var id, index;
    id = this.id.split("-");
    return index = parseInt(id[1] - 1);
  });
  $(".territory").bind('dblclick', function() {
    var id, index, j, r;
    id = this.id.split("-");
    index = parseInt(id[1] - 1);
    j = window.currentPlayer - 1;
    r = window.players[j].civilizations.length - 1;
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
