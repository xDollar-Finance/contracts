const RPC_APIKEY = process.env.RPC_APIKEY;

const maticPOSClient = new require("@maticnetwork/maticjs").MaticPOSClient({
  network: 'mainnet',
  version: 'v1',
  maticProvider: `https://polygon-mainnet.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
  parentProvider: `https://mainnet.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
});
const proof = maticPOSClient.posRootChainManager
  .customPayload(
    "0xc132296042fa3b7a27c2a7845fa8b2f1d2cf8acb3b85993a8db0051c9ff4788f", // replace with txn hash of sendMessageToRoot
    "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
  )
  .then(console.log);