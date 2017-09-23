var fs = require("fs"),
  d3 = require("d3"),
  jsdom = require("jsdom");

var body = new jsdom.JSDOM().window.document.body;

var svg = d3
  .select(body)
  .append("svg")
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .attr("width", 960)
  .attr("height", 500);

svg
  .append("circle")
  .attr("r", 10)
  .attr("fill", "steelblue");

console.log(body.innerHTML);
fs.writeFileSync("circle.svg", body.innerHTML);
