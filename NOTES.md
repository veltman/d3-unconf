// Initializing
var gif = new GIF({
  workers: 2,
  quality: 1,
  repeat: 0
});

// Adding a frame
var img = new Image(),
    serialized = new XMLSerializer().serializeToString(document.querySelector("svg")),
    svg = new Blob([serialized], {type: "image/svg+xml"}),
    url = URL.createObjectURL(svg);
img.onload = function() {
  gif.addFrame(img, {
    delay: 50,
    copy: true
  });
}

img.src = url;

// Rendering
gif.on("finished", function(blob) {
  d3
    .select("body")
    .append("img")
    .attr("src", URL.createObjectURL(blob));
});
gif.render();
