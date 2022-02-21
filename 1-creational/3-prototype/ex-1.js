// why, when prototype?
// variations? pros and cons?

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
}

let john = new Person("John", new Address("123 London Road", "London", "UK"));

// expected api
let jane = john.deepCopy();

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St"; // oops

console.log(john.toString()); // oops, john is called 'jane'
console.log(jane.toString());
