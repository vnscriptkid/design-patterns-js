// https://www.youtube.com/watch?v=dJQMqNOC4Pc
class Bird {
  fly() {
    console.log("Do not call this");
  }
}

class Duck extends Bird {
  fly() {
    console.log("Duck is flying");
  }
}

class Parrot extends Bird {
  fly() {
    console.log("Parrot is flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("I can not fly");
  }

  swim() {
    console.log("Penguin is swimming");
  }
}

function makeBirdFly(bird) {
  bird.fly();
}
