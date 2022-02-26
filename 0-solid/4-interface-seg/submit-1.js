// make class below an interface
class Machine {
  constructor() {
    if (this.constructor === Machine)
      throw new Error("this class is abstract.");
  }

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

class CanPrint {
  constructor() {
    if (this.constructor === CanPrint) throw new Error("this is interface.");
  }

  print(doc) {}
}

class CanFax {
  constructor() {
    if (this.constructor === CanFax) throw new Error("this is interface.");
  }

  fax() {}
}

class CanScan {
  constructor() {
    if (this.constructor === CanScan) throw new Error("this is interface.");
  }

  scan() {}
}

// what's the problem with Machine interface
// what if i have an OldPrinter that can only print

class OldPrinter extends CanPrint {
  print(doc) {
    console.log(`${this.constructor.name} can print.`);
  }
}

const oldPrinter = new OldPrinter();
oldPrinter.print();
