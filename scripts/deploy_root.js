const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // const fxERC20Token = await (await hre.ethers.getContractFactory("FxERC20", deployer)).deploy();
    // await fxERC20Token.deployed();

    // console.log("FxERC20 deployed to:", fxERC20Token.address);


    const templateTokenAddress = "0x41D33972fD40e1222B7025374C701CEDDA0Ed28f";
    const checkpointManagerAddress = "0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287";
    const fxRootAddress = "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2";

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