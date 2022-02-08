// Sub-system 1
class Buffer extends Array {
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.alloc(width * height);
  }

  write(text, position = 0) {
    // write to the buffer
  }
}

// Sub-system 2
class Viewport {
  constructor(buffer = new Buffer()) {
    this.buffer = buffer;
    this.offset = 0;
  }

  // high-level
  append(text, pos) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index) {
    return this.buffer[this.offset + index];
  }
}

// Facade that hides implementation of subsystems, providing simple apis to end users
class Console {
  constructor() {
    // todo: initialize buffer, viewport (viewport needs a buffer)
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
  }

  // high-level
  write(text) {
    // write text to current viewport
    this.currentViewport.buffer.write(text);
  }

  // low-level
  getCharAt(index) {
    // get char from current view port at idx
    this.currentViewport.getCharAt(index);
  }
}

let c = new Console();
c.write("hello");
let ch = c.getCharAt(0);
