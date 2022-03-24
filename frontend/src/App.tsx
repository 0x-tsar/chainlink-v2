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
          const requestRandomWords = await info.vrn?.requestRandomWords();
          setDiceShowing(!diceShowing);
          const tx = await requestRandomWords.wait();

          if (tx) {
            //check if the value is different from the last one !important
            const randomNumber = String(await info.vrn?.s_randomWords(0));
            setResult(randomNumber.substring(0, 2));
            setDiceShowing(false);
            console.log(`randomNumber: ${String(randomNumber)}`);

            setTimeout(() => {
              setResult(null);
            }, 6000);
          }
        }}
      >
        Roll the dice
      </button>
      <div style={{ width: "220px", height: "220px" }}>
        {diceShowing && <img src="./images/dice.gif" alt="dice" />}
      </div>
      <h1>{result ? result : <p></p>}</h1>
    </div>
  );
}

export default App;
