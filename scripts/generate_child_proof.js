const RPC_APIKEY = process.env.RPC_APIKEY;

const maticPOSClient = new require("@maticnetwork/maticjs").MaticPOSClient({
  network: 'mainnet',
  version: 'v1',
  maticProvider: `https://polygon-mainnet.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
  parentProvider: `https://mainnet.infura.io/v3/${RPC_APIKEY}`, // replace if using mainnet
});
const proof = maticPOSClient.posRootChainManager
  .customPayload(
    "0xdde565be4cf07f1c5acf9cbe2e72c15b18558e5711c005adde2d2ecaa87cfff2", // replace with txn hash of sendMessageToRoot
    "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
  )
  .then(console.log);