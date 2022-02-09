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
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    // todo: validate newValue, should be a new value to continue
    // log assigning value, how to include property name here?

    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10);
  }

  // todo: make getter and setter for agility
}

let c = new Creature();
c.agility = 12;
c.agility = 13;
