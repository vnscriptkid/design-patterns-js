class Person {
  constructor() {
    // address info
    this.streetAddress = this.postcode = this.city = "";

    // employment info
    this.companyName = this.position = "";
    this.annualIncome = 0;
  }

  get lives() {
    return new LivesBuilder(person);
  }

  get works() {
    return new WorksBuilder(person);
  }

  toString() {
    return (
      `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
      `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
    );
  }
}

class PersonBuilder {
  constructor(person = new Person()) {
    this.person = person;
  }

  get lives() {
    return new LivesBuilder(this.person);
  }

  get works() {
    return new WorksBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class LivesBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }

  withPostcode(postcode) {
    this.person.postcode = postcode;
    return this;
  }
}

class WorksBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

// implement this api

let pb = new PersonBuilder();
let person = pb.lives
  .at("123 London Road")
  .in("London")
  .withPostcode("SW12BC")
  .works.at("Fabrikam")
  .asA("Engineer")
  .earning(123000)
  .build();
console.log(person.toString());
