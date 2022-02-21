class Event {
  // todo: rebuild event system
}

class Person {
  constructor(age) {
    this._age = age;
    this.property_changed = new Event();
  }

  get age() {
    return _age;
  }

  set age(value) {
    if (!value || this._age === value) return; // nothing to do here

    // todo: notify about `age` and `canVote` change
  }

  // todo: define getter for canVote (depends on age)
  // if age >= 16 then he can vote
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
