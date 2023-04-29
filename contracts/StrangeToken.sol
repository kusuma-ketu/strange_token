// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract StrangeToken{

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol, uint8 decimalUnits) {
        balanceOf[msg.sender] = initialSupply;
        totalSupply = initialSupply;
        name = tokenName;
        symbol = tokenSymbol;
        decimals = decimalUnits;
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 value) public returns (bool){
        transfer(recipient, value);
        approve(sender, value);
        return true;
    }


    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    function getBalance(address _addressOwner) public view returns (uint256) {
        return balanceOf[_addressOwner];
    }

    //totalsupply
    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
    function mint(uint256 _amount) public {
        balanceOf[msg.sender] += _amount;
        totalSupply += _amount;
    }
    //mint
    //allowance
    //burn
    //pause
    //unpause
    //renounceownsership
    //transferownership
}
