export function createAccount(initialBalance) {
  let sold = initialBalance;
  let history = [];
  let name;

  function deposit(amount) {
    sold = sold + amount;
    history.push({ type: "deposit", amountDeposited: amount, balance: sold });
  }
  function withdraw(amount) {
    if (amount > sold) {
      return;
    }
    sold = sold - amount;
    history.push({ type: "withdraw", amountWithdrawn: amount, balance: sold });
  }

  function transfer(amount, otherAccount) {
    if (amount > sold) {
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
  function createUserProfile(userName) {
    name = userName;
    return name;
  }
  return {
    deposit,
    withdraw,
    getBalance,
    getHistory,
    transfer,
    createUserProfile,
  };
}
