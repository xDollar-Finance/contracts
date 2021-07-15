const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const fxERC20Token = await (await hre.ethers.getContractFactory("FxERC20", deployer)).deploy();
    await fxERC20Token.deployed();

    console.log("FxERC20 deployed to:", fxERC20Token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });