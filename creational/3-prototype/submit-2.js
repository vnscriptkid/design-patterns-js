class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address: ${this.streetAddress}, ` + `${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address; //!
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` + `I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor() {
    this.types = [];
  }

  // TODO
  markRecursive(object) {
    const nativeClasses = ["String", "Number", "Object"];

    if (!nativeClasses.includes(object.constructor.name)) {
      object["typeIndex"] = this.types.length;
      this.types.push(object.constructor);

      for (let key in object) {
        if (object[key] !== null) this.markRecursive(object[key]);
      }
    }
  }

  // TODO
  reconstructRecursive(object) {
    let obj = object;

    if (typeof obj === "object") {
      if ("typeIndex" in obj) {
        obj = new this.types[obj.typeIndex]();
      }

      for (let key in obj) {
        obj[key] = this.reconstructRecursive(object[key]);
      }
    }

    return obj;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let john = new Person("John", new Address("123 London Road", "London", "UK"));

//   let jane = JSON.parse(JSON.stringify(john));

//   jane.name = "Jane";
//   jane.address.streetAddress = "321 Angel St";

//   john.greet();
// this won't work
// jane.greet();

// try a dedicated serializer
let s = new Serializer(); // pain point
jane = s.clone(john);

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString());
console.log(jane.toString());
