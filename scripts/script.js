const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const VRFv2Consumer = await hre.ethers.getContractFactory("VRFv2Consumer");
  const vrfv2Consumer = await VRFv2Consumer.deploy();

  await vrfv2Consumer.deployed();

  console.log("VRFv2Consumer deployed to:", vrfv2Consumer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
