import { useRef, useState } from "react";
import "./App.css";
import { createAccount } from "./func/bankFunctionality";

function App() {
  const funcRef = useRef(createAccount(100));
  const anotherRef = useRef(createAccount(0));
  const [balanceA, setBalanceA] = useState(funcRef.current.getBalance());
  const [balanceB, setBalanceB] = useState(anotherRef.current.getBalance());
  const [historyA, setHistoryA] = useState([...funcRef.current.getHistory()]);
  const [historyB, setHistoryB] = useState([
    ...anotherRef.current.getHistory(),
  ]);
  const [activeAccount, setActiveAccount] = useState("A");
  const [error, setError] = useState();
  const [amount, setAmount] = useState("");
  // const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmVisibility, setConfirmVisibility] = useState("none");

  const resyncUI = () => {
    setConfirmVisibility("block");
    setTimeout(() => setConfirmVisibility("none"), 3000);

    setAmount("");
    setError("");
  };

  const validNumChecker = () => {
    if (amount <= 0 || Number.isNaN(Number(amount))) {
      setError("Invalid amount");
      return false;
    }
    return true;
  };

  const handleDeposit = () => {
    if (!validNumChecker()) return;

    if (amount <= 0) {
      return setError("Can't deposit");
    }

    if (amount >= 1) {
      if (activeAccount === "A") {
        funcRef.current.deposit(amount);

        setHistoryA([...funcRef.current.getHistory()]);
        setBalanceA(funcRef.current.getBalance());
        setConfirm(`Deposit accepted, amount: ${amount}`);
      }

      if (activeAccount === "B") {
        anotherRef.current.deposit(amount);

        setHistoryB([...anotherRef.current.getHistory()]);
        setBalanceB(anotherRef.current.getBalance());
        setConfirm(`Deposit accepted, amount: ${amount}`);
      }
    }

    resyncUI();
  };

  const handleWithdraw = () => {
    if (!validNumChecker()) return;

    if (amount >= 1) {
      if (activeAccount === "A") {
        if (amount > balanceA) {
          return setError("Insufficient funds");
        } else {
          funcRef.current.withdraw(amount);
          setBalanceA(funcRef.current.getBalance());
          setHistoryA([...funcRef.current.getHistory()]);
          setConfirm(`Withdraw accepted, amount: ${amount}`);
        }
      }

      if (activeAccount === "B") {
        if (amount > balanceB) {
          return setError("Insufficient funds");
        } else {
          anotherRef.current.withdraw(amount);
          setBalanceB(anotherRef.current.getBalance());
          setHistoryB([...anotherRef.current.getHistory()]);
          setConfirm(`Withdraw accepted, amount: ${amount}`);
        }
      }
    }

    resyncUI();
  };

  const handleTransferAtoB = () => {
    if (!validNumChecker()) return;

    if (amount > balanceA) {
      setError("Insufficient founds");
      return;
    }
    funcRef.current.withdraw(amount);
    setHistoryA([...funcRef.current.getHistory()]);
    setBalanceA(funcRef.current.getBalance());

    anotherRef.current.deposit(amount);
    setHistoryB([...anotherRef.current.getHistory()]);
    setBalanceB(anotherRef.current.getBalance());

    resyncUI();
  };
  const handleTransferBtoA = () => {
    if (!validNumChecker()) return;

    if (amount > balanceB) {
      setError("Insufficient founds");
      return;
    }
    anotherRef.current.withdraw(amount);
    setHistoryA([...anotherRef.current.getHistory()]);
    setBalanceA(anotherRef.current.getBalance());

    funcRef.current.deposit(amount);
    setHistoryB([...funcRef.current.getHistory()]);
    setBalanceB(funcRef.current.getBalance());

    resyncUI();
  };
  return (
    <>
      <div className="grid_container">
        <div className="input_container">
          <select
            onChange={(e) => setActiveAccount(e.target.value)}
            value={activeAccount}
          >
            <option value="A">Account A</option>
            <option value="B">Account B</option>
          </select>

          <input
            onChange={(e) => setAmount(+e.target.value)}
            value={amount}
            type="number"
            name="amount"
            id="amount"
          />
        </div>
        <div className="buttons_container">
          <button disabled={amount === 0} type="button" onClick={handleDeposit}>
            Deposit
          </button>
          <button
            disabled={amount === 0}
            type="button"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
          <button onClick={handleTransferAtoB}>Transfer A - B</button>
          <button onClick={handleTransferBtoA}>Transfer B - A</button>
        </div>
        <div>
          <h1 style={{ display: confirmVisibility }}>{confirm}</h1>
          <h1>{error}</h1>
          <h1>Balance A: {balanceA}</h1>
          <h1>Balance B: {balanceB}</h1>
        </div>
        <ul>
          <li>History A:</li>
          {historyA.map((tranz, index) => (
            <li key={index}>
              <p>Type: {tranz.type}</p>
              <p>
                Action:{" "}
                {tranz.amountDeposited
                  ? `+ ${tranz.amountDeposited}`
                  : `- ${tranz.amountWithdrawn}`}
              </p>
            </li>
          ))}
        </ul>
        <ul>
          <li>History B:</li>
          {historyB.map((tranz, index) => (
            <li key={index}>
              <p>Type: {tranz.type}</p>
              <p>
                Action:{" "}
                {tranz.amountDeposited
                  ? `+ ${tranz.amountDeposited}`
                  : `- ${tranz.amountWithdrawn}`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
