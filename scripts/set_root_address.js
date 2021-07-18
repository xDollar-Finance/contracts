const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0x7b5C335e29607334f7Decc7c668A8fb0C6b49c47", rootTunnelJson["abi"], deployer);
    await rootTunnel.setFxChildTunnel("0xE013dD357671dE5C698cF48E5483fB339b1229b4");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });