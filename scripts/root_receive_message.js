const hre = require("hardhat");
const rootTunnelJson = require("../artifacts/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol/FxReverseERC20RootTunnel.json");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const rootTunnel = new hre.ethers.Contract("0xd5aB7DbE5C848d047715a5d52e323434D225D62c", rootTunnelJson["abi"], deployer);
    await rootTunnel.receiveMessage("0xf90dbb840993ef50b90160ba1bd2e5b3029666a73796f85679ea2e3b560741006daf00760125302cee8ab6612095704da298ea4f91f7b9bb1dfa5ee81a75f0896d9a39c28f55e9e966fd6d0a345870be8dae9c4fb2c1acb196ae3355cba10e21fae798707f0f97b10ebb2faa9142c7861819ac6bdcda58dd33a62c51c6cd2a4ea90e1efd6be36eff480373d0adf5583082c9f4a8df5dd49277d3f32926a1d8d3883caae4f7aefb8fc22d2935c919592e9935211c8242451118bf6aca55aece2a4d9f0e2aae82275e681ce34033bfa687e1b4126e25737e3cafe338139f120db9f5ee9c0389310b7b02fc497236f49045b382c05ec0b0efff782b24f88002da06f8fe8d1cc209e6e78684c1a23e5c6f95c453683974bfb448aa5a9adaacae84116862a076bf4578f4b06e92613d6c0b398066cefb91eaeec84184203771ff5b5272366d6a1dcb96308455b3b9664e9f8d38b0fc2e9d07c7c34a4a12346e0e0261eceb40731fc14c6989ff9884010207738460f10888a0f53a42ffa6211d97b74659c79083779d0b70aa0a43b985e5b0c382f7646b4a06a09c7edc613b74ba80c9c4c9c71860ae8e789f266645250de329a1725e0c72bbb4b90546f9054301840130bbfab9010000000200000000000010000000000000000000000000000000000000000000000000000000000200000000000000000000008000004000000000000000200000000000000000000000000008000010900000800000000000000100000000000000000000000000000000000000000000000000000040000080000010000000000000000000000000000000000000000800000800000000000100000000000004260000000002000000000000000000000000000000000000000000000000004000000002002008000401000000000000000000000000000000100000000000000010000000000000000000000000000000000000000000000000000000100004f90437f89b943dc7b06dd0b1f08ef9acbbd2564f8605b4868eeaf863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a00000000000000000000000003de9292964a32d8dced58a2a024dec2ec4f1cfb9a00000000000000000000000000000000000000000000000000de0b6b3a7640000f89b943dc7b06dd0b1f08ef9acbbd2564f8605b4868eeaf863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a00000000000000000000000003de9292964a32d8dced58a2a024dec2ec4f1cfb9a000000000000000000000000000000000000000000000021e0c0013070adc0000f901ba943de9292964a32d8dced58a2a024dec2ec4f1cfb9e1a08c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036b901800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000014087a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000003dc7b06dd0b1f08ef9acbbd2564f8605b4868eea000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000203132333400000000000000000000000000000000000000000000000000000000f9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a0000000000000000000000000c35649ae99be820c7b200a0add09b96d7032d232b8a00000000000000000000000000000000000000000000000000000921f69ff99000000000000000000000000000000000000000000000000004d1c1d6bcb901e91000000000000000000000000000000000000000000000099090fb899f10740a90000000000000000000000000000000000000000000000004d1b8b4c6190859100000000000000000000000000000000000000000000009909104ab95b06d9a9b906b7f906b4f90111a04c60d76fc82941e910076adb0106ae6e98631c7c77a3d1f0d243fdaff404bccba0060d34a86eaa16d5786d2a5cb1302a245718f48474bdaec12c0ee4910b330c95a01da145ceb900a8ec9e5fea968322a691c89e9185f24bbba1f88a9a1c85b3134aa016a61894d8bc36d1462ab7b45583db1788e4bde4ee7f6406da52a3fee2974028a0d6065fdb30a7b2d5cc0fb1f56d45ac66591e28096286d14202dc3d44bbb748fea03a949a2b00aa166fcfcd758a25ffd85488aa71523e8b9f38dfc22844848d791da0dfd1d65cf317de488c9b96a339c8969e990fb2f07ce5e1ac20168cfd7e5855a380a0a20fc0b6773e8ff882f3cb8dfdc48ad1cd4904f3a7313413615ceac48f0dd8c18080808080808080f851a06029574c9db75e1d91b6593d52be1d3f31855b215ff76aed473479848feede69a0d830c7df436ce10f618048ea0b7a41741ce44438f7a0cf86a7f8a739ee8ca923808080808080808080808080808080f9054a20b90546f9054301840130bbfab9010000000200000000000010000000000000000000000000000000000000000000000000000000000200000000000000000000008000004000000000000000200000000000000000000000000008000010900000800000000000000100000000000000000000000000000000000000000000000000000040000080000010000000000000000000000000000000000000000800000800000000000100000000000004260000000002000000000000000000000000000000000000000000000000004000000002002008000401000000000000000000000000000000100000000000000010000000000000000000000000000000000000000000000000000000100004f90437f89b943dc7b06dd0b1f08ef9acbbd2564f8605b4868eeaf863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a00000000000000000000000003de9292964a32d8dced58a2a024dec2ec4f1cfb9a00000000000000000000000000000000000000000000000000de0b6b3a7640000f89b943dc7b06dd0b1f08ef9acbbd2564f8605b4868eeaf863a08c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a00000000000000000000000003de9292964a32d8dced58a2a024dec2ec4f1cfb9a000000000000000000000000000000000000000000000021e0c0013070adc0000f901ba943de9292964a32d8dced58a2a024dec2ec4f1cfb9e1a08c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036b901800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000014087a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000003dc7b06dd0b1f08ef9acbbd2564f8605b4868eea000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000203132333400000000000000000000000000000000000000000000000000000000f9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a0000000000000000000000000495c6e272fbd6f35dfe6b957f253492f81cb8d00a0000000000000000000000000c35649ae99be820c7b200a0add09b96d7032d232b8a00000000000000000000000000000000000000000000000000000921f69ff99000000000000000000000000000000000000000000000000004d1c1d6bcb901e91000000000000000000000000000000000000000000000099090fb899f10740a90000000000000000000000000000000000000000000000004d1b8b4c6190859100000000000000000000000000000000000000000000009909104ab95b06d9a982006002");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });