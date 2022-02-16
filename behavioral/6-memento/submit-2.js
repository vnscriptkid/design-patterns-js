class BankAccountSnapshot {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    // todo: bankAccount keeps track of list of snapshots and idx of current snapshot
    this.changes = [new BankAccountSnapshot(this.balance)];
    this.currentIdx = 0;
  }

  deposit(amount) {
    this.balance += amount;
    // todo: create snapshot, push to list of snapshot, update current snapshot idx, return snapshot
    const snapshot = new BankAccountSnapshot(this.balance);
    this.changes.push(snapshot);
    this.currentIdx = this.changes.length - 1;
    return snapshot;
  }

  restore(m) {
    if (m) {
      // todo: update balance, add this snapshot to list of snapshots, update current idx
    }
  }

  undo() {
    // can't undo if current idx is 0
    // update current idx, get the snapshot, update balance, return snapshot
    if (this.currentIdx > 0) {
      const snapshot = this.changes[--this.currentIdx];
      this.balance = snapshot.balance;
      return snapshot;
    }
    return null;
  }

  redo() {
    // can't redo if next idx is out of bound
    // update current idx, get snapshot, update balance, return snapshot
    if (this.currentIdx + 1 < this.changes.length) {
      const snapshot = this.changes[++this.currentIdx];
      this.balance = snapshot.balance;
      return snapshot;
    }
    return null;
  }

  toString() {
    return `Balance: $${this.balance}`;
  }
}

let ba = new BankAccount(100);
ba.deposit(50);
ba.deposit(25);
console.log(ba.toString());

ba.undo();
console.log(`Undo 1: ${ba.toString()}`);
ba.undo();
console.log(`Undo 2: ${ba.toString()}`);
ba.redo();
console.log(`Redo 2: ${ba.toString()}`);
