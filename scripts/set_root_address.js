const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0xE1849F515F4c9AD49F5Ce45B052d3889512e77Fd", rootTunnelJson["abi"], deployer);
    await rootTunnel.setFxChildTunnel("0xf638c8a2B927E4fc4dCdBe441a5C0a8a4c99B8d2");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });