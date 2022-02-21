class Singleton {
  constructor() {
    // TODO: monkey patch constructor
  }

  foo() {
    console.log("Doing something...");
  }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log("Are they identical? " + (s1 === s2));
s1.foo();
