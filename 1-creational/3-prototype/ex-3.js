// Combine prototype and factory

class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return `Suite ${this.suite}, ` + `${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  // renamed
  constructor(name, address) {
    this.name = name;
    this.address = address; //!
  }

  toString() {
    return `${this.name} works at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` + `I work at ${this.address.toString()}` //!
    );
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    // anoint each object with a type index
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]); // ^^^^^^^^^^ important
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

// context: mass cloning employees of 2 variations (can custom other props)
// at main office: "123 East Dr", "London"
// at aux office: "200 London Road", "Oxford"

// EmployeeFactory needs a serializor, 2 prototypes
class EmployeeFactory {}

let john = EmployeeFactory.newMainOfficeEmployee("John", 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee("Jane", 222);

console.log(john.toString());
console.log(jane.toString());
