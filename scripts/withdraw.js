const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0x7b5C335e29607334f7Decc7c668A8fb0C6b49c47", rootTunnelJson["abi"], deployer);
    await rootTunnel.withdraw("0xEa270F8F5ca054682d4565ae8a4FEdA8df532532", hre.ethers.utils.parseEther("0.5"));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });