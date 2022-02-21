const crypto = require("crypto");

class Event {
  // todo: rebuild event system
  constructor() {
    this.handlers = new Map();
  }

  subscribe(handler) {
    const id = crypto.randomBytes(10).toString("hex");

    this.handlers.set(id, handler);

    return id;
  }

  unsubscribe(id) {
    this.handlers.delete(id);
  }

  fire(sender, args) {
    this.handlers.forEach((v, k) => {
      v(sender, args);
    });
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.property_changed = new Event();
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!value || this._age === value) return; // nothing to do here

    this.property_changed.fire(this, new PropertyChangedArgs("age", value));

    const oldCanVote = this.canVote;

    this._age = value;

    if (oldCanVote !== this.canVote) {
      this.property_changed.fire(
        this,
        new PropertyChangedArgs("canVote", this.canVote)
      );
    }
    // todo: notify about `age` and `canVote` change
  }

  // todo: define getter for canVote (depends on age)
  // if age >= 16 then he can vote
  get canVote() {
    return this.age >= 16;
  }
}

class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.property_changed.subscribe(this.voting_changed.bind(this));
    // todo: this guy is interested in person's canVote status
  }

  voting_changed(sender, args) {
    if (sender === this.person && args.name === "canVote") {
      console.log("Voting status changed to " + args.newValue);
    }
  }
}

let person = new Person("John");
let checker = new VotingChecker(person);
for (let i = 10; i < 20; ++i) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}
