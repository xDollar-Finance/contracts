const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0xf638c8a2B927E4fc4dCdBe441a5C0a8a4c99B8d2", childTunnelJson["abi"], deployer);
    await childTunnel.setFxRootTunnel("0xE1849F515F4c9AD49F5Ce45B052d3889512e77Fd");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });