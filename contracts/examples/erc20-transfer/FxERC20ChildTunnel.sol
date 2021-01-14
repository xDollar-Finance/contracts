// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { FxBaseChildTunnel } from '../../tunnel/FxBaseChildTunnel.sol';
import { FxERC20 } from './FxERC20.sol';

/** 
 * @title FxERC20ChildTunnel
 */
contract FxERC20ChildTunnel is FxBaseChildTunnel {
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    
    // event for token maping
    event TokenMapped(address indexed rootToken, address indexed childToken);
    // root to child token
    mapping(address => address) public rootToChildToken;
    // token template
    address public tokenTemplate;

    constructor(address _fxChild, address _tokenTemplate) FxBaseChildTunnel(_fxChild) {
        tokenTemplate = _tokenTemplate;
    }

    function _processMessageFromRoot(uint256 /* stateId */, address /* sender */, bytes memory data) internal override {
        (bytes32 syncType, bytes memory syncData) = abi.decode(data, (bytes32, bytes));

        if (syncType == DEPOSIT) {
            _syncDeposit(syncData);
        } else if (syncType == MAP_TOKEN) {
            _mapToken(syncData);
        } else {
            revert("ChildChainManager: INVALID_SYNC_TYPE");
        }
    }

    function withdraw(address rootToken, uint256 amount) public {
        // get root to child token
        address childToken = rootToChildToken[rootToken];
        require (childToken != address(0x0), "No mapped token");

        // withdraw tokens
        FxERC20 childTokenContract = FxERC20(childToken);
        childTokenContract.withdraw(msg.sender, amount);

        // send message to root regarding token burn
        _sendMessageToRoot(abi.encode(rootToken, childToken, msg.sender, amount));
    }

    //
    // Internal methods
    //

    function _mapToken(bytes memory syncData) internal returns (address) {
        (address rootToken, string memory name, string memory symbol, uint8 decimals) = abi.decode(syncData, (address, string, string, uint8));
        
        // get root to child token
        address childToken = rootToChildToken[rootToken];

        // check if it's already mapped
        require(childToken == address(0x0), "Token is already mapped");

        // deploy new child token
        childToken = _createClone(rootToken, tokenTemplate);
        FxERC20(childToken).initialize(address(this), rootToken, name, symbol, decimals);

        // map the token
        rootToChildToken[rootToken] = childToken;
        emit TokenMapped(rootToken, childToken);

        // return new child token
        return childToken;
    }

    function _syncDeposit(bytes memory syncData) internal {
        (address rootToken, address depositor, address user, uint256 amount, bytes memory depositData) = abi.decode(syncData, (address, address, address, uint256, bytes));
        address childTokenAddress = rootToChildToken[rootToken];

        // deposit tokens
        FxERC20 childTokenContract = FxERC20(childTokenAddress);
        childTokenContract.deposit(user, amount);
    }

    function _createClone(address _rootToken, address _target) internal returns (address _result) {
        bytes20 _targetBytes = bytes20(_target);
        bytes32 _salt = keccak256(abi.encodePacked(address(this), _rootToken));

        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(clone, 0x14), _targetBytes)
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            _result := create2(0, clone, 0x37, _salt)
        }
    }
}
