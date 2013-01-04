
window.fisherYates = function(arr) {
  var i, j, tempi, tempj;
  i = arr.length;
  if (i === 0) {
    return false;
  }
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    tempi = arr[i];
    tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
};

window.rollDie = function() {
  var Die;
  Die = Math.floor((Math.random() * 6) + 1);
  if (Die === 1) {
    return 0;
  } else if (Die === 2) {
    return 1;
  } else if (Die === 3) {
    return 0;
  } else if (Die === 4) {
    return 2;
  } else if (Die === 5) {
    return 0;
  } else if (Die === 6) {
    return 3;
  }
};

window.colorTerritory = function(color, poly) {
  var canvas, ctx, num, _i, _ref;
  console.log(window.document.getElementById("map"));
  canvas = window.document.getElementById("map");
  ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.30;
  ctx.beginPath();
  ctx.moveTo(poly[0], poly[1]);
  for (num = _i = 2, _ref = poly.length - 1; _i <= _ref; num = _i += 2) {
    ctx.lineTo(poly[num], poly[num + 1]);
  }
  ctx.closePath();
  ctx.fill();
  return true;
};
