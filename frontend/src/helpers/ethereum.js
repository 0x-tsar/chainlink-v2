import { ethers } from "ethers";
import VRFv2Consumer from "../artifacts/contracts/VRFv2Consumer.sol/VRFv2Consumer.json";

export const connectEthereum = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const vrn = new ethers.Contract(
    "0xaCf6F0742FF64Aa08eDd6996cF808C92631B22E6",
    VRFv2Consumer.abi,
    signer
  );

  const balance = String(await provider.getBalance(account));

  return { account, vrn, balance };
};
