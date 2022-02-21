const fs = require("fs");
const path = require("path");

class MyDatabase {
  constructor() {
    // todo: monkey patch constructor to make it singleton

    console.log(`Initializing database`);

    // key: capital, value: population
    this.capitals = {};

    // let lines = fs
    //   .readFileSync(path.join(__dirname, "capitals.txt"))
    //   .toString()
    //   .split("\r\n");

    // todo: read `capitals.txt`, store in capitals
    // capital1
    // population1
    // capital2
    // population2
    // ...
  }

  getPopulation(city) {
    // possible error handling here
    return this.capitals[city];
  }
}

// ↑↑↑ low-level module

// ↓↓↓ high-level module

class SingletonRecordFinder {
  // what's problem with this?
  totalPopulation(cities) {
    return cities
      .map((city) => new MyDatabase().getPopulation(city))
      .reduce((x, y) => x + y);
  }
}

// class DummyDatabase {
//   constructor() {
//     this.capitals = {
//       alpha: 1,
//       beta: 2,
//       gamma: 3,
//     };
//   }

//   getPopulation(city) {
//     // possible error handling here
//     return this.capitals[city];
//   }
// }

describe("singleton database", function () {
  it("is a singleton", function () {
    const db1 = new MyDatabase();
    const db2 = new MyDatabase();
    expect(db1).toBe(db2);
  });

  it("calculates total population", function () {
    let rf = new SingletonRecordFinder();
    let cities = ["Seoul", "Mexico City"];
    let tp = rf.totalPopulation(cities);
    expect(tp).toEqual(17400000 + 17500000);
  });

  //   it("calculates total population better", function () {
  //     let db = new DummyDatabase();
  //     let rf = new ConfigurableRecordFinder(db);
  //     expect(rf.totalPopulation(["alpha", "gamma"])).toEqual(4);
  //   });
});
