class Car {
  drive() {
    console.log("Car being driven");
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

let car = new Car();
car.drive();

// problem: ppl under 18 years old should not be allowed to drive.
// todo: add a proxy layer over driver and car

class CarProxy {
  constructor(driver) {
    this.driver = driver;
    this._car = new Car();
  }

  // todo: preserve the interface of car
  drive() {
    if (this.driver.age < 18) throw new Error("You are too young to drive.");

    this._car.drive();
  }
}

let car2 = new CarProxy(new Driver(18)); // try 22
car2.drive();
