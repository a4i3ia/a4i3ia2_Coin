pragma solidity ^0.4.24;


import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
contract UpCoin is ERC20{
    string  public name = "Upcoda Token";
    string  public symbol = "UPCT";
    uint  public decimal = 18;
    uint256 public totalSupply;
    address owner;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
//    event Transfer(address indexed from, address indexed to, uint tokens);
    function UpCoin () public {
        owner = msg.sender;
        balanceOf[msg.sender] = 10000000*10**decimal;
        totalSupply = 10000000*10**decimal;
    }

    function() payable public{
        Transfer(this, msg.sender, msg.value);
    }
    function transfer(address to, uint tokens) public returns (bool success) {
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(tokens);
        balanceOf[to] = balanceOf[to].add(tokens);
        Transfer(msg.sender, to, tokens);
        return true;
    }
   function sendTokens() payable public  {
       uint tokensBought = msg.value;
       balanceOf[msg.sender] = balanceOf[msg.sender].add(tokensBought);
       balanceOf[owner] = balanceOf[owner].sub(tokensBought);
   }
}