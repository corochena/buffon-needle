var nTries = prompt("Calculates pi. How many tries? (1 to 600)");
var sticks = 200;
var l = 30;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = c.getAttribute("width");
var H = c.getAttribute("height");
var iteration = 0;
var totalCrossed = 0;

var timer = setInterval(run, 100);

//console.log("Sticks crossing lines: " + count + " of " + sticks);
//console.log("pi aprox: " + "2*" + sticks + "/" + count + " = " + 2*(sticks/count).toFixed(3));

function run() {
  iteration++;
  drawVerticals(l, W, H, ctx);
  totalCrossed += drawSticks(sticks, l, W, H, ctx);
  console.log(totalCrossed);
  var pi = 2 * iteration * sticks / totalCrossed;
  document.getElementById("consola").innerHTML = "Iteration: " + iteration;
  document.getElementById("consola").innerHTML +=
    ", Total: " + iteration * sticks;
  document.getElementById("consola").innerHTML += ", Hits: " + totalCrossed;
  document.getElementById("consola").innerHTML += ", pi: " + pi.toFixed(4);
  document.getElementById("consola").innerHTML +=
    ", error: " + Math.abs((pi / Math.PI - 1) * 100).toFixed(2) + "%";
  console.log("pi: " + 2 * iteration * sticks / totalCrossed);

  console.log(iteration);
  if (iteration == nTries) clearInterval(timer);
}

function drawVerticals(l, W, H, canvas) {
  // draw vertical lines with l separation in between starting at x = 0
  canvas.fillStyle = "beige";
  canvas.fillRect(0, 0, W, H);
  //var x = (lines = 0); no se porque tenia esto???, pero funcionaba!
  var x = 0, lines = 0;
  while (x < W) {
    canvas.beginPath();
    canvas.moveTo(x, 0);
    canvas.lineTo(x, H);
    //canvas.lineWidth = 1;
    canvas.strokeStyle = "black";
    canvas.stroke();
    canvas.fillStyle = "black";
    canvas.fillText(lines + 1, x, H);
    x += l;
    lines++;
  }
}

function drawSticks(nTries, l, W, H, canvas) {
  // draw nTries sticks of length l returns how many crossed the verticals
  var count = 0;
  for (var i = 0; i < nTries; i++) {
    var ang = Math.random() * Math.PI;
    var xIni = Math.random() * (W - 2 * l) + l;
    var yIni = Math.random() * (H - 2 * l) + l;
    var xFin = xIni + l * Math.cos(ang);
    var yFin = yIni + l * Math.sin(ang);
    canvas.strokeStyle = "gray";
    if (check(xIni, xFin, l)) {
      canvas.strokeStyle = "red";
      count++;
    }
    canvas.beginPath();
    canvas.moveTo(xIni, yIni);
    canvas.lineTo(xFin, yFin);
    canvas.lineWidth = 1;
    canvas.stroke();
    if (i % 10 == 0) {
      canvas.font = "10px Arial";
      canvas.fillText(i, xIni, yIni);
    }
  }
  return count;
}

function check(x1, x2, l) {
  var minx = Math.min(x1, x2);
  var maxx = Math.max(x1, x2);
  var n = Math.floor(minx / l);
  //return minx == n * l || (minx <= (n + 1) * l && maxx >= (n + 1) * l);
  return minx <= (n + 1) * l && maxx >= (n + 1) * l;
}

/*
function check(x1, x2, l, W){
  var x = 0;
  while (x <= W) {
    if (Math.min(x1,x2) < x && x < Math.max(x1,x2)) return true;
    x += l;
  }
  return false;
}
*/