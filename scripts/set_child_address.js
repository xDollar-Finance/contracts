const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0x7432eb844c9E9b886a10Ca123F44c60070658596", childTunnelJson["abi"], deployer);
    await childTunnel.setFxRootTunnel("0x2d12dA5cBB1E7Da90BBbFbDef15c0c3e14e0B56d");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });