pragma solidity ^0.8.0;

import "./StrangeToken.sol";

contract StrangeTokenFactory {
    event TokenCreated(address tokenAddress, address creator);

    function createToken(string memory name, string memory symbol, uint8 decimals, uint256 initialSupply) public returns (address) {
        StrangeToken newToken = new StrangeToken(initialSupply, name, symbol, decimals);
        emit TokenCreated(address(newToken), msg.sender);
        return address(newToken);
    }
}