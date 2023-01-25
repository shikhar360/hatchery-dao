// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../HSBTFactory.sol";
import "./StartupDetails.sol";

error YOUHAVENTBOUGHTTOKEN();

contract Startup {
   bytes32 internal constant STARTUP = keccak256("STARTUP");
   HatcherySBT public sbtFactory;
   uint private s_ID = 0;

    constructor(address _address){
     sbtFactory = HatcherySBT(_address);

    }
    
   S_Details[] internal startupList;
   mapping(address => uint256) internal atIndex;
   mapping(address => bool) internal isAlreadyStartupOwner;

   
   
   function addStartupsTOList ( string memory _name , string memory _descrip , uint256 _amt , string memory _erc20Add ) external onlyStartupOwner {
   
    if(isAlreadyStartupOwner[msg.sender]){
        startupList[atIndex[msg.sender]].isActive = false ;
    }

    startupList.push(S_Details( s_ID , _name , _descrip , _amt , msg.sender , 0 , _erc20Add , true ));

    atIndex[msg.sender] = s_ID ;
    
    isAlreadyStartupOwner[msg.sender] = true;

    s_ID ++ ;
   }
   
   /*
   *@dev Getter functions
   */
    function getListOfStartups() external view returns(S_Details[] memory){
     return startupList ; 
    }

    function getOwnerStartups() external view returns(S_Details memory){
       return startupList[atIndex[msg.sender]];
    }

    function getOwnerStartupsAtIndex() external view returns(uint256){
        return atIndex[msg.sender] ;
    }

   
    modifier onlyStartupOwner{
    if (!(sbtFactory.isStartup(msg.sender) ) ){
        revert YOUHAVENTBOUGHTTOKEN();
    }  
    _;   
    }

   function add (uint a , uint b) external onlyStartupOwner view returns (uint)  {
    
    if (!(sbtFactory.isStartup(msg.sender) && sbtFactory.isOwner(msg.sender)) ){
        revert YOUHAVENTBOUGHTTOKEN();
    }else {
        return a + b;
    }

   }
}