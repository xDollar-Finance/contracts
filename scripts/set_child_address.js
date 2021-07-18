const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0x3De9292964A32D8DcEd58A2a024Dec2EC4F1cfB9", childTunnelJson["abi"], deployer);
    await childTunnel.setFxRootTunnel("0xd5aB7DbE5C848d047715a5d52e323434D225D62c");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });