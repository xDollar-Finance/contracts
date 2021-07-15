// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import { FxBaseChildTunnel } from '../../tunnel/FxBaseChildTunnel.sol';
import { Create2 } from '../../lib/Create2.sol';
import { ERC20 } from "../../lib/ERC20.sol";

/** 
 * @title FxReverseERC20ChildTunnel
 */
contract FxReverseERC20ChildTunnel is FxBaseChildTunnel, Create2 {
    // maybe DEPOSIT and MAP_TOKEN can be reduced to bytes4
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");

    event TokenMapped(address indexed childToken, address indexed rootToken);

    mapping(address => address) public childToRootTokens;
    bytes32 public rootTokenTemplateCodeHash;

    constructor(address _fxChild, address _fxERC20Token) FxBaseChildTunnel(_fxChild) {
        // compute child token template code hash
        rootTokenTemplateCodeHash = keccak256(minimalProxyCreationCode(_fxERC20Token));
    }

    /**
     * @notice Map a token to enable its movement via the PoS Portal, callable only by mappers
     * @param childToken address of token on root chain
     */
    function mapToken(address childToken) public {
        // check if token is already mapped
        require(childToRootTokens[childToken] == address(0x0), "FxERC20ChildTunnel: ALREADY_MAPPED");

        // name, symbol and decimals
        ERC20 childTokenContract = ERC20(childToken);
        string memory name = childTokenContract.name();
        string memory symbol = childTokenContract.symbol();
        uint8 decimals = childTokenContract.decimals();

        // MAP_TOKEN, encode(rootToken, name, symbol, decimals)
        bytes memory message = abi.encode(MAP_TOKEN, abi.encode(childToken, name, symbol, decimals));
        _sendMessageToRoot(message);

        // compute root token address before deployment using create2
        bytes32 salt = keccak256(abi.encodePacked(childToken));
        address rootToken = computedCreate2Address(salt, rootTokenTemplateCodeHash, fxRootTunnel);

        // add into mapped tokens
        childToRootTokens[childToken] = rootToken;
        emit TokenMapped(childToken, rootToken);
    }

    function deposit(address childToken, address user, uint256 amount, bytes memory data) public {
        // map token if not mapped
        if (childToRootTokens[childToken] == address(0x0)) {
            mapToken(childToken);
        }

        // transfer from depositor to this contract
        ERC20(childToken).transferFrom(
            msg.sender,    // depositor
            address(this), // manager contract
            amount
        );

        // DEPOSIT, encode(rootToken, depositor, user, amount, extra data)
        bytes memory message = abi.encode(DEPOSIT, abi.encode(childToken, msg.sender, user, amount, data));
        _sendMessageToRoot(message);
    }

    // exit processor
    function _processMessageFromRoot(uint256 /* stateId */, address sender, bytes memory data) internal override validateSender(sender) {
        (address childToken, address rootToken, address to, uint256 amount) = abi.decode(data, (address, address, address, uint256));
        // validate mapping for root to child
        require(childToRootTokens[childToken] == rootToken, "FxERC20RootTunnel: INVALID_MAPPING_ON_EXIT");

        // transfer from tokens to
        ERC20(childToken).transfer(
            to,
            amount
        );
    }
}
