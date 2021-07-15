const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0xf638c8a2B927E4fc4dCdBe441a5C0a8a4c99B8d2", childTunnelJson["abi"], deployer);
    // await childTunnel.mapToken("0x0DEEec87D2e64107a0f936c481FA70e1F102fe5F");
    await childTunnel.deposit("0x0DEEec87D2e64107a0f936c481FA70e1F102fe5F", "0x43173699bd04d1B527259e4d7a6C8245aB552415", hre.ethers.utils.parseEther("1"), hre.ethers.utils.formatBytes32String("1234"));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });