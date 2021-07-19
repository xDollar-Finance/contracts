# XDO ETH <-> Polygon Bridge

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

### Send XDO from Ethereum to Polygon
1. Go to `scritps/withdraw.js` and update the amount of XDO you want to send to Polygon, (currently set to `hre.ethers.utils.parseEther("0.5")`)
2. Run
```
npx hardhat run scripts/withdraw.js
```

### Send XDO from Polygon to Ethereum
1. Approve [FxReverseERC20ChildTunnel](https://github.com/xDollar-Finance/contracts/blob/erc20-reverse-transfer/contracts/examples/erc20-reverse-transfer/FxReverseERC20ChildTunnel.sol) to spend your XDO.
2. Go to `scripts/deposit.js` and update the wallet and amount you want to send.
3. Run
```
npx hardhat run scripts/deposit.js
```
4. Use the transaction hash from previous deposit step to update line 11 in `scripts/generate_child_proof.js` and run the script to get proof.
5. Update the proof in `scripts/root_receive_message.js` and run this script to finish the process.
