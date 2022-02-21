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
    if (
      object &&
      object.constructor &&
      !object.constructor.name.match(/String|Number|Object|Boolean/)
    ) {
      // object initiated by user-defined class
      object["typeIndex"] = this.types.length;
      this.types.push(object.constructor);
    }

    if (object !== null && typeof object === "object") {
      for (let prop in object) {
        if (object[prop] !== null) {
          this.markRecursive(object[prop]);
        }
      }
    }
  }

  // TODO
  reconstructRecursive(object) {
    if (
      object !== null &&
      object !== undefined &&
      typeof object === "object" &&
      "typeIndex" in object
    ) {
      const typeIdx = object["typeIndex"];
      let obj = new this.types[typeIdx]();

      delete object["typeIndex"];

      for (let prop in object) {
        if (prop !== null) {
          obj[prop] = this.reconstructRecursive(object[prop]);
        }
      }

      return obj;
    }

    return object;
  }

  clone(object) {
    `
    Person {
      name: "John",
      address: Address {
        city: "Hanoi",
        country: "Vietnam"
      }
    }
    
    {
      name: "John",
      address: {
        city: "Hanoi",
        country: "Vietnam",
        typeIndex: 1
      },
      typeIndex: 0
    }
  `;
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
