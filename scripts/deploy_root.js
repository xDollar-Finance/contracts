const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // const fxERC20Token = await (await hre.ethers.getContractFactory("FxERC20", deployer)).deploy();
    // await fxERC20Token.deployed();

    // console.log("FxERC20 deployed to:", fxERC20Token.address);


    const templateTokenAddress = "0xDbD35A267bC205bE698375CEBe107101a93fa564";
    const checkpointManagerAddress = "0x2890bA17EfE978480615e330ecB65333b880928e";
    const fxRootAddress = "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA";

    // const RootTunnel = await hre.ethers.getContractFactory("FxReserveERC20RootTunnel", deployer);
    // const rootTunnel = await RootTunnel.deploy(checkpointManagerAddress, fxRootAddress, "0x049190C42BD4C35cEFFb7503eCFFDB90A74316fF");
    // await rootTunnel.deployed();
    // console.log("FxReserveERC20RootTunnel deployed to:", rootTunnel.address);

    const RootTunnel = await hre.ethers.getContractFactory("FxReverseERC20RootTunnel", deployer);
    const rootTunnel = await RootTunnel.deploy(checkpointManagerAddress, fxRootAddress, templateTokenAddress);
    await rootTunnel.deployed();
    console.log("FxReverseERC20RootTunnel deployed to:", rootTunnel.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });