var Canvas = require("canvas"),
  d3 = require("d3"),
  topojson = require("topojson"),
  fs = require("fs"),
  world = require("../data/world-110m.json");

var width = 960,
  height = 540;

var canvas = new Canvas(width, height),
  context = canvas.getContext("2d");

var countries = topojson.feature(world, world.objects.countries),
  mesh = topojson.mesh(world, world.objects.countries);

var projection = d3
  .geoOrthographic()
  .scale(240)
  .translate([width / 2, height / 2])
  .clipAngle(90)
  .precision(0.1);

var path = d3
  .geoPath()
  .projection(projection)
  .context(context);

// Draw 60 frames
d3.range(60).forEach(function(frame) {
  // Spin the globe a bit more each time
  projection.rotate([frame * 6]);

  context.clearRect(width, height);

  // Water
  context.fillStyle = "#23b4d8";
  context.beginPath();
  path({ type: "Sphere" });
  context.fill();

  // Countries
  countries.features.forEach(function(country, i) {
    context.fillStyle = d3.interpolateRainbow(Math.sin(i + frame / 10));
    context.beginPath();
    path(country);
    context.fill();
  });

  // Borders
  context.beginPath();
  path(mesh);
  context.stroke();

  // Write 01.png, 02.png, 03.png, etc.
  fs.writeFileSync(leftpad(frame + 1, 2) + ".png", canvas.toBuffer());
});

function leftpad(i, n) {
  let str = i + "";
  while (str.length < n) {
    str = "0" + str;
  }
  return str;
}
