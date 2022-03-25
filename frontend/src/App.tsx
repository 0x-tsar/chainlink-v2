import React, { useEffect, useState } from "react";
import "./App.css";
import { Contract } from "ethers";
import { connectEthereum } from "./helpers/ethereum";
import { type } from "@testing-library/user-event/dist/type";

interface VRNMethods {
  requestRandomWords(): void;
  s_randomWords: number[];
}

interface IEthereum {
  account: string;
  vrn: VRNMethods | undefined | Contract;
  balance: string;
  netVersion: number | string;
}

function App() {
  const [diceShowing, setDiceShowing] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>("");
  const [info, setInfo] = useState<IEthereum>({
    account: "",
    vrn: undefined,
    balance: "",
    netVersion: "4",
  });

  useEffect(() => {
    const done = async () => {
      const { account, vrn, balance, netVersion }: IEthereum =
        await connectEthereum();
      setInfo({ account, vrn, balance, netVersion });
    };

    done();
  }, []);

  return (
    <div className="App">
      <h1>Chainlink Lottery v2</h1>
      {info.netVersion === "4" ? (
        <button
          style={{
            width: "200px",
            height: "50px",
            cursor: "pointer",
            fontSize: "larger",
          }}
          onClick={async (e) => {
            setResult(null);
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
            // console.log(`newNumber: ${newNumber[0]}`);

            setDiceShowing(false);
            setResult(newNumber[0]);
          }}
        >
          Roll the dice
        </button>
      ) : (
        <h1 className="blink_me" style={{ color: "red", backgroundColor: "" }}>
          Connect to Rinkeby network [id: 4] to use the DApp
        </h1>
      )}

      <div style={{ width: "220px", height: "220px" }}>
        {diceShowing && <img src="./images/dice.gif" alt="dice" />}
      </div>
      <h1>
        {diceShowing ? (
          <div>
            <p style={{ fontSize: "16px", padding: "30px" }}>
              The dice are rolling and Chainlink is generating a random
              verifiable number, this process can take up to 3 minutes depending
              on the block traffic
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
