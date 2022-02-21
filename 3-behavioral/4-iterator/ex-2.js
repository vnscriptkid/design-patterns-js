class Stuff {
  constructor() {
    this.a = 11;
    this.b = 22;
  }

  // todo: make stuff obj iterable using default iterator
  // this is special function that knows how to iterate through an object

  get backwards() {
    // todo: use the same logic as default iterator to iterate backwards
    // add some magic to fix the issue
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
