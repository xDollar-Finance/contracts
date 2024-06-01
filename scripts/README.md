# XDO ETH <-> Polygon Bridge

## Basics
Cross-chain bridge usually means two contracts on both side. For example if you want to build a cross-chain bridge between Ethereum and Polygon, it usually means you need a contract on Ethereum and a contract on Polygon, those two contracts can talk to each other.

## Contracts
Created a [reverse ERC20 transfer bridge](https://github.com/xDollar-Finance/contracts/tree/erc20-reverse-transfer/contracts/examples/erc20-reverse-transfer) based on the [ERC20 transfer bridge](https://github.com/xDollar-Finance/contracts/tree/main/contracts/examples/erc20-transfer) example.

* [FxReverseERC20RootTunnel](https://github.com/xDollar-Finance/contracts/blob/erc20-reverse-transfer/contracts/examples/erc20-reverse-transfer/FxReverseERC20RootTunnel.sol)
* [FxReverseERC20ChildTunnel](https://github.com/xDollar-Finance/contracts/blob/erc20-reverse-transfer/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol)

### Polygon -> ETH
User deposit XDO to Polygon-side bridge and Ethereum-side bridge mints XDO token to user's wallet.

### ETH -> Polygon
Ethereum-side bridge burns XDO token on Ethereum and release the same amount of XDO on Polygon from the bridge to user's wallet.

## Scripts
### Setup
1. Run `npm install` in the top-level directory.
2. Create a `.env` file in the top-level directory which looks like this:
```
PRIVATE_KEY=<your wallet's private key>
RPC_APIKEY=<your RPC's api key>
```
### Get ethers from Goerli testnet
Follow the [instruction](https://faucet.goerli.mudit.blog/) here to get ether on Goerli testnet

### Get matic from Polygon Mumbai testnet
Follow the [instruction](https://faucet.matic.network/) here to get matic on Mumbai testnet.

### Get LINK token on Polygon Mumbai testnet
Go to https://faucet.matic.network/, choose `Link` in `Select Token` section and choose `Mumbai` in `Select Network` section. Enter your wallet address and get one LINK token. We'll use LINK token to test the bridge.

### Send LINK Token from Polygon Mumbai to Goerli
1. Approve [FxReverseERC20ChildTunnel](https://github.com/xDollar-Finance/contracts/blob/erc20-reverse-transfer/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol) to spend your LINK.
```
npx hardhat run scripts/approve_token.js --network mumbai
```
2. Go to `scripts/deposit.js` and update the `receiptant` address to your wallet address.
3. Run
```
npx hardhat run scripts/deposit.js --network mumbai
```
4. Use the transaction hash from previous deposit step to update line 11 in `scripts/generate_child_proof.js` and run the script to get proof. You'll probably get an error message like this: ` AssertionError [ERR_ASSERTION]: Burn transaction has not been checkpointed as yet`. This is expected because it usually takes some time until the transaction on Mumbai to be checkpointed. When you see a big chunk of `0x...` output, copy that, that is the `proof` we need for the following step.
5. Update `proof` in line 7 at `scripts/root_receive_message.js` and run this script to finish the process.
```
npx hardhat run scripts/root_receive_message.js --network goerli
```

### Send LINK from Goerli to Mumbai
1. Run
```
npx hardhat run scripts/withdraw.js --network goerli
```

## Appendix (Steps to deploy bridges)

### Deploy test token on Goerli testnet
```
npx hardhat run scripts/deploy_fxerc20.js --network goerli
```
After the above command, you should be able to see the output like this:
```
FxERC20 deployed to: <contract address>
```
Copy the contract address, we'll need this later.

### Deploy Root Tunnel contract on Goerli testnet
Go to line 12 at `scripts/deploy_root.js` and update the value of `templateTokenAddress` to the contract address from the previous step and run:
```
npx hardhat run scripts/deploy_root.js --network goerli
```
After the above command, you should be able to see the output like this:
```
FxReverseERC20RootTunnel deployed to: <contract address>
```
Copy the Root Tunnel contract address, we'll need this later.

This step is to deploy the cross-chain bridge on Goerli testnet side.

### Deploy Child Tunnel contract on Polygon Mumbai testnet
Go to line 11 at `scripts/deploy_child.js` and update the value of `fxERC20TokenAddress` to the contract address from the previous step and run:
```
npx hardhat run scripts/deploy_child.js --network mumbai
```
After the above command, you should be able to see the output like this:
```
FxReverseERC20ChildTunnel deployed to: <contract address>
```
Copy the Child Tunnel contract address, we'll need this later.

This step is to deploy the cross-chain bridge on Mumbai testnet side.

### Setup Root and Child Tunnel
Updates `scripts/set_child_address.js` and `scripts/set_root_address.js` with the Root and Child Tunnel address from previous steps and run:
```
npx hardhat run scripts/set_child_address.js --network mumbai
```
```
npx hardhat run scripts/set_root_address.js --network goerli
```