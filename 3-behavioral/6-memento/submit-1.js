// snapshot in time of bankAccount
class Memento {
  // todo: keep track of balance number
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    // cons: can't have snapshot for initial state here in constructor
    // return new Memento(this.balance);
  }

  deposit(amount) {
    this.balance += amount;
    // record this change into a memento, returns back that memento
    return new Memento(this.balance);
  }

  restore(m) {
    // todo: revert balance to the point of memento
    this.balance = m.balance;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

let ba = new BankAccount(100);
let m1 = ba.deposit(50);
let m2 = ba.deposit(25);
console.log(ba.toString());

// restore to m1
ba.restore(m1);
console.log(ba.toString());

// restore to m2
ba.restore(m2);
console.log(ba.toString());
