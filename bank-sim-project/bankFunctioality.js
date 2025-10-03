function createAccount(initialBalance) {
  let sold = initialBalance;
  let history = [];

  function deposit(amount) {
    sold = sold + amount;
    history.push({ type: "deposit", amountDeposited: amount, balance: sold });
  }
  function withdraw(amount) {
    if (amount > sold) {
      console.log("insuficient founds");
      return;
    }
    sold = sold - amount;
    history.push({ type: "withdraw", amountWithdrawn: amount, balance: sold });
  }

  function transfer(amount, otherAccount) {
    if (amount > sold) {
      console.log("insuficient founds");
      return;
    }
    withdraw(amount);
    otherAccount.deposit(amount);

    history.push({
      type: "withdraw",
      amountWithdrawn: amount,
      balance: sold,
      transferTo: "otherAcc",
    });
  }

  function getBalance() {
    return sold;
  }
  function getHistory() {
    return history;
  }
  return { deposit, withdraw, getBalance, getHistory, transfer };
}

let myAcc = createAccount(100);
let otherAcc = createAccount(0);

myAcc.transfer(100, otherAcc);

console.log(myAcc.getBalance());
console.log(myAcc.getHistory());
console.log(otherAcc.getBalance(), "other");
console.log(otherAcc.getHistory());
