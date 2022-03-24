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
  const [diceShowing, setDiceShowing] = useState<boolean>(true);
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
          setDiceShowing(!diceShowing);
          const tx = await info.vrn?.requestRandomWords();
          console.log(tx);
        }}
      >
        Roll the dice
      </button>
      <div style={{ width: "220px", height: "220px" }}>
        {diceShowing && <img src="./images/dice.gif" alt="dice" />}
      </div>
      <h2>{result ? result : <p>The result is..</p>}</h2>
    </div>
  );
}

export default App;
