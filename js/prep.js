
$(function() {
  var attackTerritory, changePlayer, i, item, pickRacePower, setPlayerTable, showRacePowerStack, updatePlayerTokens, _i, _j, _len, _len1, _ref, _ref1,
    _this = this;
  updatePlayerTokens = function(j, r, needed) {
    window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed;
    $("#playerTable tbody").find('[data-id="' + j + '"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens);
  };
  attackTerritory = function(j, r, index) {
    var needed;
    if (window.players[j].civilizations[r].totalTokens === 0) {
      changePlayer();
      return false;
    }
    needed = window.territories[index].tokensNeeded();
    console.log('Number of Tokens needed', needed);
    if (needed <= window.players[j].civilizations[r].totalTokens) {
      window.players[j].territory.push(window.territories[index]);
      updatePlayerTokens(j, r, needed);
      window.players[j].civilizations[r].startRound = false;
      if (window.players[j].civilizations[r].totalTokens === 0) {
        return changePlayer;
      }
    } else {
      if (window.players[j].civilizations[r].totalTokens === 0) {
        return changePlayer();
      } else {
        return alert('You do not have enough tokens to attack');
      }
    }
  };
  changePlayer = function() {
    window.currentPlayer++;
    if (window.currentPlayer > window.players.length) {
      window.currentRound++;
      return window.currentPlayer = 1;
    } else {
      return console.log('Current player is ' + window.players[window.currentPlayer - 1].name + '.');
    }
  };
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
    if (window.players[j].civilizations[r].startRound) {
      if (window.territories[index].edgeBorder) {
        attackTerritory(j, r, index);
      } else {
        alert('You must chose a territory on the edge.');
      }
      return true;
    } else {
      if (window.territories[index].isAdjacent(window.players[j].territory)) {
        return attackTerritory(j, r, index);
      } else {
        return alert('That territory is not adjacent.');
      }
    }
  });
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
  _ref = window.racePowerStack;
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    item = _ref[i];
    showRacePowerStack(item, i);
  }
  setPlayerTable = function(item, i) {
    $("#playerTable").find('tbody:last').append('<tr data-id="' + i + '"><td>' + item.name + '</td><td>' + item.victoryPoints + '</td><td data-td="race_power"></td><td data-td="tokens"></td></tr>');
  };
  window.gameRound = 10;
  window.currentRound = 1;
  window.currentPlayer = 1;
  window.canPickRace = true;
  _ref1 = window.players;
  for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
    item = _ref1[i];
    setPlayerTable(window.players[i], i);
  }
  pickRacePower = function(row) {
    var id, j, _k, _len2, _ref2;
    id = $(row).data("id");
    j = window.currentPlayer - 1;
    if ($("#card-stack tbody").find('[data-id="' + id + '"]').index() > window.players[j].victoryPoints) {
      alert('You don\'t have enough Victory Points to choose that race.');
    }
    _ref2 = window.racePowerStack;
    for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
      item = _ref2[i];
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
    $("#card-stack tbody tr:eq(5)").next().show();
    $(row).remove();
    window.racePowerStack[id]["delete"];
    return window.canPickRace = false;
  };
  return $("#card-stack tbody tr").bind('click', function() {
    if (window.canPickRace) {
      return pickRacePower(this);
    } else {
      return alert('You have already picked a race this round.');
    }
  });
});
