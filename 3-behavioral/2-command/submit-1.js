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
    console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      return true;
    }
    // todo: check if after withdrawing, balance >= overdraftLimit
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

class BankAccountCommand {
  // todo: construct obj:
  // what account on which this command operates
  // what action that this command does (action type)
  // how much money is this command
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
  }
  /*****/
  // todo: implement call() that executes this command
  // 2 cases:
  // deposit
  // withdraw
  call() {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        break;
      case Action.withdraw:
        this.account.withdraw();
        break;
    }
  }
}

let ba = new BankAccount(100);

new BankAccountCommand(ba, Action.deposit, 50).call();
new BankAccountCommand(ba, Action.deposit, 70).call();
console.log(ba.toString());
