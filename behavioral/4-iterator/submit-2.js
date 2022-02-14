class Stuff {
  constructor() {
    this.a = 11;
    this.b = 22;
  }

  // todo: make stuff obj iterable using default iterator
  // this is special function that knows how to iterate through an object
  [Symbol.iterator]() {
    let i = 0;
    const self = this;
    return {
      next: function () {
        return {
          done: i > 1,
          value: i++ === 0 ? self.a : self.b,
        };
      },
    };
  }

  get backwards() {
    // todo: use the same logic as default iterator to iterate backwards
    // add some magic to fix the issue
    let i = 0;
    const self = this;
    return {
      next: function () {
        return {
          done: i > 1,
          value: i++ === 0 ? self.b : self.a,
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

let values = [100, 200, 300];
for (let i in values) {
  console.log(`Element at pos ${i} is ${values[i]}`);
}

for (let v of values) {
  console.log(`Value is ${v}`);
}

let stuff = new Stuff();
for (let item of stuff) console.log(`${item}`);

for (let item of stuff.backwards) console.log(`${item}`);

//   for (let item of stuff.backwards) console.log(`${item}`);
