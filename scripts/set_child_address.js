const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0xE013dD357671dE5C698cF48E5483fB339b1229b4", childTunnelJson["abi"], deployer);
    await childTunnel.setFxRootTunnel("0x7b5C335e29607334f7Decc7c668A8fb0C6b49c47");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });