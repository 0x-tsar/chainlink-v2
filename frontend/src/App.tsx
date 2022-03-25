import React, { useEffect, useState } from "react";
import "./App.css";
import { Contract } from "ethers";
import { connectEthereum } from "./helpers/ethereum";

interface VRNMethods {
  requestRandomWords(): void;
  s_randomWords: number[];
}

interface IEthereum {
  account: string;
  // vrn: Contract | undefined;
  vrn: VRNMethods | undefined | Contract;
  balance: string;
}

function App() {
  const [diceShowing, setDiceShowing] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>("");
  const [lastNumber, setLastNumber] = useState<string | null>("");
  const [info, setInfo] = useState<IEthereum>({
    account: "",
    vrn: undefined,
    balance: "",
  });

  useEffect(() => {
    const done = async () => {
      const { account, vrn, balance }: IEthereum = await connectEthereum();
      setInfo({ account, vrn, balance });
    };

    // requestRandomWords()
    // s_randomWords
    done();
  }, []);

  return (
    <div className="App">
      <h1>Chainlink Lottery v2</h1>
      <button
        style={{
          width: "200px",
          height: "50px",
          cursor: "pointer",
          fontSize: "larger",
        }}
        onClick={async (e) => {
          let oldNumber = String(await info.vrn?.s_randomWords(0));
          console.log(`old number: ${oldNumber}`);

          let requestRandomWords = await info.vrn?.requestRandomWords();

          setDiceShowing(true);
          await requestRandomWords.wait();
          let newNumber = String(await info.vrn?.s_randomWords(0));

          while (oldNumber === newNumber) {
            newNumber = String(await info.vrn?.s_randomWords(0));
          }

          newNumber = String(await info.vrn?.s_randomWords(0));
          console.log(`newNumber: ${newNumber[0]}`);

          setDiceShowing(false);
          setResult(newNumber[0]);
        }}
      >
        Roll the dice
      </button>
      <div style={{ width: "220px", height: "220px" }}>
        {diceShowing && <img src="./images/dice.gif" alt="dice" />}
      </div>
      <h1>
        {diceShowing ? (
          <div>
            <p style={{ fontSize: "16px" }}>
              The dice are rolling and Chainlink is generating a random
              verifiable number, this process can take up to 2 minutes..
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </h1>
      <h1>{result ? result : <p></p>}</h1>
    </div>
  );
}

export default App;
