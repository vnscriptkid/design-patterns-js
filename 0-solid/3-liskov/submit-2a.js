// https://www.youtube.com/watch?v=dJQMqNOC4Pc
class FlyingBird {
  fly() {
    console.log("Do not call this");
  }
}

class Duck extends FlyingBird {
  fly() {
    console.log("Duck is flying");
  }
}

class Parrot extends FlyingBird {
  fly() {
    console.log("Parrot is flying");
  }
}

class Penguin extends SwimmingBird {
  swim() {
    console.log("Penguin is swimming");
  }
}

function makeBirdFly(flyingBird) {
  bird.fly();
}
