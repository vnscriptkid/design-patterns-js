const crypto = require("crypto");

// events system keep track of a callbacks list that are given by subscribers
class Event {
  constructor() {
    // init map between callback and its id (random)
    this.handlers = new Map();
  }

  subscribe(handler) {
    // todo: random id, put cb into map with id, return id
    const id = crypto.randomBytes(10).toString("hex");
    this.handlers.set(id, handler);
    return id;
  }

  unsubscribe(id) {
    // remove handler associated with id out of map
    this.handlers.delete(id);
  }

  // 1) who fired the event?
  // 2) additional data (event args)
  fire(sender, args) {
    // notify all subscribers with sender and args info
    this.handlers.forEach((v, k) => {
      v(sender, args);
    });
  }
}

class FallsIllArgs {
  // todo: construct event contains address
  constructor(address) {
    this.address = address;
  }
}

class Person {
  constructor(address) {
    // todo: person has address and fallsIll event system
    this.address = address;
    this.fallsIll = new Event();
  }

  catchCold() {
    // todo: fire event
    this.fallsIll.fire(this, new FallsIllArgs(this.address));
  }
}

let person = new Person("123 London Road");
let sub = person.fallsIll.subscribe((s, a) => {
  console.log(`A doctor has been called ` + `to ${a.address}`);
});
person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);
person.catchCold();
