// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../HSBTFactory.sol";
import "./StartupDetails.sol";

error YOU_HAVENT_BOUGHT_TOKEN();
error BE_STARTUP_OWNER();
error ONLY_INVESTOR_FUNCTION();

contract Core {
   bytes32 internal constant STARTUP = keccak256("STARTUP");
   bytes32 public constant INVESTOR = keccak256("INVESTOR");
   HatcherySBT public sbtFactory;
   uint private s_ID = 0;

    constructor(address _address){
     sbtFactory = HatcherySBT(_address);

    }
    
   S_Details[] internal startupList;
   mapping(address => uint256) internal atIndex;
   mapping(address => bool) internal isAlreadyStartupOwner;
   mapping(address => string) internal attachVideoHash;

   /*
   *@dev Adding startups to List
   */
   
   function addStartupsTOList ( string memory _name , string memory _descrip , uint256 _amt  ) external onlyStartupOwner onlyInvestors {
   
    if(isAlreadyStartupOwner[msg.sender]){
        startupList[atIndex[msg.sender]].isActive = false ;
    }

    startupList.push(S_Details( s_ID , _name , _descrip , _amt , payable(msg.sender) , 0  , true ));

    atIndex[msg.sender] = s_ID ;
    
    isAlreadyStartupOwner[msg.sender] = true;

    s_ID ++ ;
   }
   

   /*
   *@dev Adding video hash to startups
   */
    function addVideoHash( string memory _hash) external onlyStartupOwner onlyInvestors {
       if(isAlreadyStartupOwner[msg.sender]){
        attachVideoHash[msg.sender] = _hash;
       }else {
           revert BE_STARTUP_OWNER();
       }
    }
   
    function getVideoHash() external view returns(string memory){
        return attachVideoHash[msg.sender];
    }



   /*
   *@dev Adding Investments Function
   */
   function amountOfTokenToBuy( address _startupOwner) external onlyInvestors payable {
    (bool callSuccess,) = payable(_startupOwner).call{value:msg.value}("");
    require(callSuccess,"Transfer Failed");
    startupList[atIndex[_startupOwner]].amount -= msg.value ;
   }

   function getCurrentInvestemntNeeded()external onlyStartupOwner view returns(uint256){
      return startupList[atIndex[msg.sender]].amount ; 
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
        revert YOU_HAVENT_BOUGHT_TOKEN();
    }  
    _;   
    }

    modifier onlyInvestors{
    if (!(sbtFactory.isInvestor(msg.sender) ) ){
        revert ONLY_INVESTOR_FUNCTION();
    }  
    _;   
    }

   function add (uint a , uint b) external onlyStartupOwner view returns (uint)  {
    
   
    return a + b;


   }
}