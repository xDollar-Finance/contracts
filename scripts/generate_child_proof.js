const RPC_APIKEY=process.env.RPC_APIKEY;

const maticPOSClient = new require("@maticnetwork/maticjs").MaticPOSClient({
    maticProvider: `https://polygon-mumbai.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
    parentProvider: `https://goerli.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
  });
  const proof = maticPOSClient.posRootChainManager
    .customPayload(
      "0x7f56c45f9515bc86a866970344ca7d2b24747f2dad291a3fb101a6ec1aacd59a", // replace with txn hash of sendMessageToRoot
      "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
    )
    .then(console.log);