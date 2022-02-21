// make class below an interface
class Machine {
  constructor() {}

  print(doc) {
    throw new Error("Not to be implemented");
  }
  fax(doc) {
    throw new Error("Not to be implemented");
  }
  scan(doc) {
    throw new Error("Not to be implemented");
  }
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    console.log(`${this.constructor.name} can print.`);
  }

  fax(doc) {
    console.log(`${this.constructor.name} can fax.`);
  }

  scan(doc) {
    console.log(`${this.constructor.name} can scan.`);
  }
}

// what's the problem with Machine interface
// what if i have an OldPrinter that can only print

class OldPrinter extends Machine {
  print(doc) {
    console.log(`${this.constructor.name} can print.`);
  }
}

const oldPrinter = new OldPrinter();
oldPrinter.print();
oldPrinter.fax();
