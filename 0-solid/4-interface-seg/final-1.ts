// class IMachine {
//   constructor() {}

//   print(doc) {
//     throw new Error("Not to be implemented");
//   }
//   fax(doc) {
//     throw new Error("Not to be implemented");
//   }
//   scan(doc) {
//     throw new Error("Not to be implemented");
//   }
// }

interface ICanPrint {
  print(doc);
}

interface ICanFax {
  fax(doc);
}

interface ICanScan {
  scan(doc);
}

class MultiFunctionalPrinter implements ICanPrint, ICanScan, ICanFax {
  print(doc: any) {
    console.log(`multiPrinter can print.`);
  }
  scan(doc: any) {
    console.log(`multiPrinter can scan.`);
  }
  fax(doc: any) {
    console.log(`multiPrinter can fax.`);
  }

  somethingElse(doc) {}
}

const p = new MultiFunctionalPrinter();

p.print({});
p.scan({});
p.fax({});

class OldKindPrinter implements ICanPrint {
  print(doc: any) {
    console.log(`oldPrinter can print.`);
  }
}

const o = new OldKindPrinter();
o.print({});
