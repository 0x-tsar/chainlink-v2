require("dotenv").config();
const { ethers } = require("hardhat");
const hre = require("hardhat");
const VRFv2Consumer = require("../artifacts/contracts/VRFv2Consumer.sol/VRFv2Consumer.json");

async function main() {
  // We get the contract to deploy
  // const VRFv2Consumer = await hre.ethers.getContractFactory("VRFv2Consumer");
  // const vrfv2Consumer = await VRFv2Consumer.deploy(1804);
  // await vrfv2Consumer.deployed();
  // console.log("VRFv2Consumer deployed to:", vrfv2Consumer.address);

  const provider = new ethers.providers.getDefaultProvider(process.env.rinkeby);
  const signer = new ethers.Wallet(process.env.account, provider);

  const vrfv2Consumer = new ethers.Contract(
    "0xaCf6F0742FF64Aa08eDd6996cF808C92631B22E6",
    VRFv2Consumer.abi,
    signer
  );

  // const tx = await vrfv2Consumer.requestRandomWords();
  // console.log(tx);

  const randomWords1 = await vrfv2Consumer.s_randomWords(0);
  const randomWords2 = await vrfv2Consumer.s_randomWords(1);
  console.log(Number(randomWords1));
  console.log(String(randomWords2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
