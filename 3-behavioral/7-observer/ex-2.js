class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  // 1) who fired the event?
  // 2) additional data (event args)
  fire(sender, args) {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

class PropertyChangedArgs {
  // todo: construct event that describes prop change
  // name of prop
  // new value of prop
}

// expected behavior: i want to keep track age of one person and want to get notified when it changes
// => need to make use of an event system
// todo: where to put the event system? the only one that knows about person's prop change is person himself
class Person {
  constructor(age) {
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!value || this._age === value) return;
    this._age = value;
    // todo: notify subscribers
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    // todo: i want to get notified when person's age changes, i'll store the id so that i can unsub
    // careful with `this`
  }

  age_changed(sender, args) {
    // todo: check if sender is me, and changed prop is `age`
    // newAge < 13 => too young
    // console.log(`Sorry, you are still to young`);
    // newAge >= 13 => register, unsub
  }
}

let person = new Person("John");
let checker = new RegistrationChecker(person);
for (let i = 10; i < 20; ++i) {
  console.log(`Changing age to ${i}`);
  person.age = i; //
}
