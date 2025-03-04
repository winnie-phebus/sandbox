var svg = document.getElementById("round_heart");
var center = document.getElementById("heart_center");
var beatButton = document.getElementById("beatButton");
var interval = null;
var centerx = 100;
var centery = 100;

function changeColor(isBlack) {
  if (svg.style.fill == "red" || isBlack) {
    svg.style.fill = "black";
    center.style.fill = "red";
    center.style.stroke = "red";
  } else {
    svg.style.fill = "red";
    center.style.fill = "black";
    center.style.stroke = "black";
  }
}

function showValues(
  center,
  radius,
  minX,
  minY,
  curvey,
  maxX,
  maxY,
  multiplier
) {
  var valueDump = document.getElementById("value-dump");
  valueDump.innerHTML =
    "Center: " +
    center +
    "<br>Radius: " +
    radius +
    "<br>Min X: " +
    minX +
    "<br>Min Y: " +
    minY +
    "<br>Curve Y: " +
    curvey +
    "<br>Max X: " +
    maxX +
    "<br>Max Y: " +
    maxY +
    "<br>Multiplier: " +
    multiplier;
}

function resetBeatButton() {
  beatButton.value = "Start Beat";
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
function drawHeart(radius, multiplier, centerx, centery) {
  var leftCurve = document.getElementById("left-curve");
  var rightCurve = document.getElementById("right-curve");
  var heartCenter = document.getElementById("heart_center");
  var heartpath = document.getElementById("heart_path");

  // left curve attr update
  leftCurve.setAttribute("cx", centerx - radius * multiplier);
  leftCurve.setAttribute("cy", centery);
  leftCurve.setAttribute("r", radius * multiplier);

  // right curve attr update
  rightCurve.setAttribute("cx", centerx + radius * multiplier);
  rightCurve.setAttribute("cy", centery);
  rightCurve.setAttribute("r", radius * multiplier);

  var minpointx = centerx - 2 * radius * multiplier;
  var minpointy = centery;
  var maxpointx = centerx + 2 * radius * multiplier;
  var maxpointy = centery;
  var curvey = centery + (centery - radius) * multiplier;

  var path =
    "M" +
    minpointx +
    "," +
    minpointy +
    " C" +
    minpointx +
    "," +
    curvey +
    " " +
    maxpointx +
    "," +
    curvey +
    " " +
    maxpointx +
    "," +
    maxpointy +
    " Z";

  heartpath.setAttribute("d", path);
  showValues(
    centerx,
    radius,
    minpointx,
    minpointy,
    curvey,
    maxpointx,
    maxpointy,
    multiplier
  );

  // heart center attr update
  heartCenter.setAttribute("cx", centerx);
  heartCenter.setAttribute("cy", centery);
}

function bounce() {
  var radius = 25;
  var multiplier = 1;
  var direction = 1;
  var bounceSpeed = 0.1;
  var bounceLimit = 0.5;

  if (!interval) {
    interval = setInterval(function () {
      if (multiplier >= bounceLimit) {
        direction = -1;
      } else if (multiplier <= 0.1) {
        direction = 1;
      }

      multiplier += bounceSpeed * direction;
      drawHeart(radius, multiplier, center);
    }, 100);
  }
}

function beat(startBeat) {
  if (beatButton.value == "Start Beat" && !interval) {
    beatButton.value = "Stop Beat";

    var radius = 25;
    var multiplier = 0.1;
    var center = 100;
    var direction = 1;
    var bounceSpeed = 0.1;
    var bounceLimit = 0.5;

    if (!interval) {
      interval = setInterval(function () {
        if (multiplier >= bounceLimit) {
          direction = -1;
        } else if (multiplier <= 0.1) {
          direction = 1;
        }

        multiplier += bounceSpeed * direction;
        drawHeart(radius, multiplier, center, center);
      }, 100);
    }
  } else {
    resetBeatButton();
  }
}

function reset() {
  resetBeatButton();
  changeColor(true);
  drawHeart(25, 1, 100, 100);
}
