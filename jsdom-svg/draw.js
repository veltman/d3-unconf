var fs = require("fs"),
  d3 = require("d3"),
  jsdom = require("jsdom");

var body = new jsdom.JSDOM().window.document.body;

var svg = d3
  .select(body)
  .append("svg")
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .attr("width", 800)
  .attr("height", 600);

var iowa = require("../data/iowa.geo.json");

// Iowa State Plane North
var projection = d3
  .geoConicConformal()
  .parallels([42 + 4 / 60, 43 + 16 / 60])
  .rotate([93 + 30 / 60, -41 - 30 / 60])
  .fitSize([800, 600], iowa);

var path = d3.geoPath().projection(projection);

var background = svg
  .append("path")
  .attr("fill", "#eee")
  .attr("stroke", "#ccc")
  .attr("d", path(iowa));

var county = svg.append("path").attr("fill", "#f0f");

iowa.features.forEach(function(feature) {
  county.attr("d", path(feature));
  fs.writeFileSync(feature.properties.name + ".svg", body.innerHTML);
});
