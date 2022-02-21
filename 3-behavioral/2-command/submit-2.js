class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    // todo: add logic
    this.balance += amount;
    console.log(`Deposited ${amount}, balance is now ${this.balance}`);
  }

  withdraw(amount) {
    // todo: check if after withdrawing, balance >= overdraftLimit
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
      return true;
    }
    // return true or false
    return false;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }

  // define common info overdraftLimit = -500
  static overdraftLimit = -500;
}

let Action = Object.freeze({
  deposit: 1,
  withdraw: 2,
});

let Status = Object.freeze({
  succeeded: "succeeded",
  failed: "failed",
});

class BankAccountCommand {
  // todo: construct obj:
  // what account on which this command operates
  // what action that this command does (action type)
  // how much money is this command
  // status of command: successful or failed (used for undo)
  constructor(account, action, amount, status) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.status = null;
  }
  /*****/
  // todo: implement call() that executes this command, record command state
  // 2 cases:
  // deposit
  // withdraw
  call() {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        break;
      case Action.withdraw:
        this.status = this.account.withdraw(this.amount)
          ? Status.succeeded
          : Status.failed;
        break;
    }
  }
  /*****/
  // todo: implement undo() that undo a successfull command
  undo() {
    if (this.status === Status.failed) {
      console.log(`Can not undo a failed action.`);
      return;
    }
    switch (this.action) {
      case Action.deposit:
        this.account.withdraw(this.amount);
        break;
      case Action.withdraw:
        this.status = this.account.deposit(this.amount)
          ? Status.succeeded
          : Status.failed;
        break;
    }
  }
}

let ba = new BankAccount(100);

let cmd = new BankAccountCommand(ba, Action.withdraw, 700);
cmd.call();
console.log(ba.toString());

console.log("Performing undo:");
cmd.undo();
console.log(ba.toString());
