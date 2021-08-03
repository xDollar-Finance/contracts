const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const receiptant = "0x93d300E23c395c7362211d6a77e799B7E831AA19";
    const amount = hre.ethers.utils.parseEther("0.5");

    const childTunnel = new hre.ethers.Contract("0x7432eb844c9E9b886a10Ca123F44c60070658596", childTunnelJson["abi"], deployer);
    // const tx = await childTunnel.mapToken(linkTokenAddress);
    const tx = await childTunnel.deposit(linkTokenAddress, receiptant, amount, hre.ethers.utils.formatBytes32String(""));
    console.log('tx hash:', tx);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });