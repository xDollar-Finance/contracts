const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // const fxERC20Token = await (await hre.ethers.getContractFactory("FxERC20", deployer)).deploy();
    // await fxERC20Token.deployed();

    // console.log("FxERC20 deployed to:", fxERC20Token.address);

    const fxERC20TokenAddress = "0xeeC6960028b9c48FA42d91EFF7d1433BDffda0B7";
    const fxChildAddress = "0xCf73231F28B7331BBe3124B907840A94851f9f11";

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