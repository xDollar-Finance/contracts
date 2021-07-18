const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0xd5aB7DbE5C848d047715a5d52e323434D225D62c", rootTunnelJson["abi"], deployer);
    await rootTunnel.withdraw("0xA7e9b72783157bf9d9DDA84d2af6C77E9c21ED9E", hre.ethers.utils.parseEther("0.5"));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });