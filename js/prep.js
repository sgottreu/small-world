
$(function() {
  var gameRound, i, item, pickRacePower, setPlayerTable, showRacePowerStack, _i, _j, _len, _len1, _ref, _ref1,
    _this = this;
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
    /*
            for key, value of territories[index].adjacent
                
                data = $('#territory-'+value).data('maphilight') || {}
                data.fillColor = "ff0000"
                $('#territory-'+value).data('maphilight', data)
                
                $('#territory-'+value).mouseover()
    */

  });
  $(".territory").bind('dblclick', function() {
    var id, index;
    id = this.id.split("-");
    index = parseInt(id[1] - 1);
    /*
            for key, value of territories[index].adjacent
                data = $('#territory-'+value).data('maphilight') || {}
                data.fillColor = "cccccc"
                $('#territory-'+value).data('maphilight', data)
    */

    if (window.currentRound === 1) {
      return true;
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
    $("#playerTable").find('tbody:last').append('<tr data-id="' + i + '"><td>' + item.name + '</td><td>' + item.victoryPoints + '</td><td data-td="race_power"></td><td></td></tr>');
  };
  gameRound = 10;
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
    j = currentPlayer - 1;
    console.log($("#card-stack tbody").find('[data-id="' + id + '"]').index());
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
