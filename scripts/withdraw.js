const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const linkTokenAddressOnRoot = "0xbb7d35b6e675affbad11b335faddefea077378ba";

    const rootTunnel = new hre.ethers.Contract("0x2d12dA5cBB1E7Da90BBbFbDef15c0c3e14e0B56d", rootTunnelJson["abi"], deployer);
    await rootTunnel.withdraw(linkTokenAddressOnRoot, hre.ethers.utils.parseEther("0.25"));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });