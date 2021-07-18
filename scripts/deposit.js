const hre = require("hardhat");
const childTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol/FxReverseERC20ChildTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const childTunnel = new hre.ethers.Contract("0xE013dD357671dE5C698cF48E5483fB339b1229b4", childTunnelJson["abi"], deployer);
    await childTunnel.mapToken("0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA");
    // await childTunnel.deposit("0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA", "0x495c6e272fBd6f35dfe6B957f253492f81cb8D00", hre.ethers.utils.parseEther("1"), hre.ethers.utils.formatBytes32String("1234"));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });