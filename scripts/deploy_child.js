const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // const fxERC20Token = await (await hre.ethers.getContractFactory("FxERC20", deployer)).deploy();
    // await fxERC20Token.deployed();

    // console.log("FxERC20 deployed to:", fxERC20Token.address);

    const fxERC20TokenAddress = "0x41D33972fD40e1222B7025374C701CEDDA0Ed28f";

    const fxChildAddress = "0x8397259c983751DAf40400790063935a11afa28a";

    // const ChildTunnel = await hre.ethers.getContractFactory("FxReverseERC20ChildTunnel", deployer);
    // const childTunnel = await ChildTunnel.deploy(fxChildAddress, "0xf937cF3022B73816DaBD779Ea03Cd74C9e21c634");
    // await childTunnel.deployed();
    // console.log("FxReserveERC20ChildTunnel deployed to:", childTunnel.address);

    const ChildTunnel = await hre.ethers.getContractFactory("FxReverseERC20ChildTunnel", deployer);
    const childTunnel = await ChildTunnel.deploy(fxChildAddress, fxERC20TokenAddress);
    await childTunnel.deployed();
    console.log("FxReverseERC20ChildTunnel deployed to:", childTunnel.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });