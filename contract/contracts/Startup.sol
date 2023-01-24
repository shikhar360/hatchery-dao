// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./HSBTFactory.sol";

contract Startup {
   bytes32 public constant STARTUP = keccak256("STARTUP");
   HatcherySBT public sbtFactory;

    constructor(address _address){
     sbtFactory = HatcherySBT(_address);

    }
 
   function add (uint a , uint b) public view returns (uint){
    
    if (sbtFactory.isStartup(msg.sender) && sbtFactory.isOwner(msg.sender) ){
        return a + b ;
    }else {
        return 56556;
    }

   }
}