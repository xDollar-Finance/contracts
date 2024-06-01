// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { IFxERC20 } from '../../tokens/IFxERC20.sol';
import { Create2 } from "../../lib/Create2.sol";
import { FxBaseRootTunnel } from "../../tunnel/FxBaseRootTunnel.sol";

/**
 * @title FxReverseERC20RootTunnel
 */
contract FxReverseERC20RootTunnel is FxBaseRootTunnel, Create2 {
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    string public constant SUFFIX_NAME = "";
    string public constant PREFIX_SYMBOL = "";
    
    // event for token maping
    event TokenMapped(address indexed rootToken, address indexed childToken);
    // root to child token
    mapping(address => address) public childToRootToken;
    // token template
    address public tokenTemplate;

    constructor(address _checkpointManager, address _fxRoot, address _tokenTemplate) FxBaseRootTunnel(_checkpointManager, _fxRoot) {
        tokenTemplate = _tokenTemplate;
        require(_isContract(_tokenTemplate), "Token template is not contract");
    }

    function withdraw(address rootToken, uint256 amount) public {
        IFxERC20 rootTokenContract = IFxERC20(rootToken);
        // child token contract will have root token
        address childToken = rootTokenContract.connectedToken();

        // validate root and child token mapping
        require(
            childToken != address(0x0) &&
            rootToken != address(0x0) && 
            rootToken == childToRootToken[childToken], 
            "FxERC20RootTunnel: NO_MAPPED_TOKEN"
        );

        // withdraw tokens
        rootTokenContract.burn(msg.sender, amount);

        // send message to child regarding token burn
        _sendMessageToChild(abi.encode(childToken, rootToken, msg.sender, amount));
    }

    //
    // Internal methods
    //

    function _processMessageFromChild(bytes memory data)
        internal
        override {

        // decode incoming data
        (bytes32 syncType, bytes memory syncData) = abi.decode(data, (bytes32, bytes));

        if (syncType == DEPOSIT) {
            _syncDeposit(syncData);
        } else if (syncType == MAP_TOKEN) {
            _mapToken(syncData);
        } else {
            revert("FxERC20RootTunnel: INVALID_SYNC_TYPE");
        }
    }

    function _mapToken(bytes memory syncData) internal returns (address) {
        (address childToken, string memory name, string memory symbol, uint8 decimals) = abi.decode(syncData, (address, string, string, uint8));
        
        // get child to root token
        address rootToken = childToRootToken[childToken];

        // check if it's already mapped
        require(rootToken == address(0x0), "FxERC20RootTunnel: ALREADY_MAPPED");

        // deploy new root token
        bytes32 salt = keccak256(abi.encodePacked(childToken));
        rootToken = createClone(salt, tokenTemplate);
        IFxERC20(rootToken).initialize(address(this), childToken, string(abi.encodePacked(name, SUFFIX_NAME)), string(abi.encodePacked(PREFIX_SYMBOL, symbol)), decimals);

        // map the token
        childToRootToken[childToken] = rootToken;
        emit TokenMapped(childToken, rootToken);

        // return new root token
        return rootToken;
    }

    function _syncDeposit(bytes memory syncData) internal {
        (address childToken, address depositor, address to, uint256 amount, bytes memory depositData) = abi.decode(syncData, (address, address, address, uint256, bytes));
        address rootToken = childToRootToken[childToken];

        // deposit tokens
        IFxERC20 rootTokenContract = IFxERC20(rootToken);
        rootTokenContract.mint(to, amount);

        // call `onTokenTranfer` on `to` with limit and ignore error
        if (_isContract(to)) {
            uint256 txGas = 2000000;
            bool success = false;
            bytes memory data = abi.encodeWithSignature("onTokenTransfer(address,address,address,address,uint256,bytes)", childToken, rootToken, depositor, to, amount, depositData);
            // solium-disable-next-line security/no-inline-assembly
            assembly {
                success := call(txGas, to, 0, add(data, 0x20), mload(data), 0, 0)
            }
        }
    }

    // check if address is contract
    function _isContract(address _addr) private view returns (bool){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}
