// Without proxy
class CreatureNoProxy {
  constructor() {
    this._agility = 10;
    this._attack = 10;
    this._defense = 10;
  }
}

// Proxy the value behind an object
// why? do additional things when assigning values (logging, validation)
class Property {
  constructor(value, name = "") {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    // todo: validate newValue, should be a new value to continue
    if (newValue === this._value) return;
    // log assigning value, how to include property name here?
    console.log(
      `Updating value of ${this.name} from ${this._value} to ${newValue}.`
    );

    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, "agility");
  }

  // todo: make getter and setter for agility
  get agility() {
    return this._agility.value;
  }

  set agility(value) {
    this._agility.value = value;
  }
}

let c = new Creature();
c.agility = 12;
c.agility = 13;
