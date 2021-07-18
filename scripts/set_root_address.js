const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0xd5aB7DbE5C848d047715a5d52e323434D225D62c", rootTunnelJson["abi"], deployer);
    await rootTunnel.setFxChildTunnel("0x3De9292964A32D8DcEd58A2a024Dec2EC4F1cfB9");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });