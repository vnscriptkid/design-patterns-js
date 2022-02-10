class Image {
  constructor(url) {
    // problem: loading image when a new image instance is initialized
    this.url = url;
    console.log(`Loading image from ${this.url}`);
  }

  draw() {
    console.log(`Drawing image ${this.url}`);
  }
}

// your boss comes in and ask you to optimize this
// without modifying existing code.
class LazyImage {
  // todo: delay loading at the time of drawing
  constructor(url) {
    this.url = url;
  }

  draw() {
    this.image = new Image(this.url);
    this.image.draw();
  }
}

function drawImage(img) {
  console.log("About to draw the image");
  img.draw();
  console.log("Done drawing the image");
}

let img = new LazyImage("http://pokemon.com/pikachu.png");
drawImage(img);
