const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0x2d12dA5cBB1E7Da90BBbFbDef15c0c3e14e0B56d", rootTunnelJson["abi"], deployer);
    await rootTunnel.setFxChildTunnel("0x7432eb844c9E9b886a10Ca123F44c60070658596");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });