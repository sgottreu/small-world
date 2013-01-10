
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
  canvas = window.document.getElementById("map");
  ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(poly[0], poly[1]);
  for (num = _i = 2, _ref = poly.length - 1; _i <= _ref; num = _i += 2) {
    ctx.lineTo(poly[num], poly[num + 1]);
  }
  ctx.closePath();
  ctx.fill();
  return true;
};

window.clone = function(obj) {
  var attr, copy, i, _i, _ref;
  if (null === obj || "object" !== typeof obj) {
    return obj;
  }
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (i = _i = 0, _ref = obj.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = window.clone(obj[attr]);
      }
    }
    return copy;
  }
  throw new Error("Unable to copy obj! Its type isn't supported.");
};
