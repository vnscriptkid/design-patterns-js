class Switch {
  constructor() {
    this.state = new OffState();
  }

  on() {
    // todo: turn on
    this.state.on(this);
  }

  off() {
    this.state.off(this);
    // todo: turn off
  }
}

class State {
  constructor() {
    // todo: make this abstract
    if (this.constructor === State) throw new Error("abstract class.");
  }

  on(sw) {
    console.log("Light is already on.");
  }

  off(sw) {
    console.log("Light is already off.");
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log("Light turned on.");
  }

  off(sw) {
    console.log("Turning light off...");
    // todo: state now is off
    sw.state = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log("Light turned off.");
  }

  on(sw) {
    console.log("Turning light on...");
    // todo: state now is on
    sw.state = new OnState();
  }
}

let sw = new Switch();
sw.on();
sw.off();
sw.off();
