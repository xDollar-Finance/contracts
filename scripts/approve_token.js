const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const abi = ["function approve(address _spender, uint256 _value) returns (bool)"];
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

    const token = new hre.ethers.Contract(linkTokenAddress, abi, deployer);
    const tx = await token.approve("0x7432eb844c9E9b886a10Ca123F44c60070658596", hre.ethers.utils.parseEther("1"));
    console.log('tx hash:', tx);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });