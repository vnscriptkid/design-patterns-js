class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    // todo: add logic
    console.log(`Deposited ${amount}, balance is now ${this.balance}`);
  }

  withdraw(amount) {
    console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
    // todo: check if after withdrawing, balance >= overdraftLimit
    // return true or false
  }

  toString() {
    return `Balance: ${this.balance}`;
  }

  // define common info overdraftLimit = -500
}

let Action = Object.freeze({
  deposit: 1,
  withdraw: 2,
});

class BankAccountCommand {
  // todo: construct obj:
  // what account on which this command operates
  // what action that this command does (action type)
  // how much money is this command
  // status of command: successful or failed
  /*****/
  // todo: implement call() that executes this command
  // 2 cases:
  // deposit
  // withdraw
}

let ba = new BankAccount(100);

let cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
console.log(ba.toString());
