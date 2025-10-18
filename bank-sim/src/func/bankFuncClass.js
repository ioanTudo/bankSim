export class createAccount {
  #sold;
  history = [];

  constructor(initialBalance) {
    this.#sold = initialBalance;
  }

  deposit(amount) {
    this.#sold += amount;
    this.history.push({
      type: "deposit",
      amountDeposited: amount,
      balance: this.#sold,
    });
  }
  withdraw(amount) {
    if (amount > this.#sold) {
      return;
    }
    this.#sold -= amount;
    this.history.push({
      type: "withdraw",
      amountWithdrawn: amount,
      balance: this.#sold,
    });
  }
  transfer(amount, otherAccount) {
    if (this.#sold < amount) {
      console.log("insuficient founds");
      return;
    }
    this.withdraw(amount);
    otherAccount.deposit(amount);
    this.history.push({
      type: "transfer",
      amountTransfered: amount,
      balance: this.#sold,
    });
  }

  get balance() {
    return this.#sold;
  }
  get historyTranzaction() {
    return this.history;
  }
}
