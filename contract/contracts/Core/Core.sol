// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../HSBTFactory.sol";
import "./StartupDetails.sol";


error YOU_HAVENT_BOUGHT_TOKEN();
error BE_STARTUP_OWNER();
error ONLY_INVESTOR_FUNCTION();

contract Core {

  
   HatcherySBT public sbtFactory;
   uint private s_ID = 0;
   uint private i_ID = 0;
   uint256[] private pushIDX ;


    constructor(address _address){
     sbtFactory = HatcherySBT(_address);

    }
    
   S_Details[] internal startupList;
   

   mapping(address => uint256) internal atIndex;
   mapping(address => bool) internal isAlreadyStartupOwner;
   mapping(address => string) internal attachVideoHash;
   mapping(address => uint256[]) internal investedToStartup;
   mapping(address => uint256) internal totalInvested;

   /*
   *@dev Adding startups to List
   */
   
   function addStartupsToList ( string memory _name , string memory _descrip , string memory _tagline, uint256 _amt  ) external onlyStartup onlyInvestors {
   
    if(isAlreadyStartupOwner[msg.sender]){
        startupList[atIndex[msg.sender]].isActive = false ;
    }

    startupList.push(S_Details( s_ID , _name , _descrip , _tagline , _amt , payable(msg.sender) , 0  , true ));

    atIndex[msg.sender] = s_ID ;
    
    isAlreadyStartupOwner[msg.sender] = true;

    s_ID ++ ;
   }
   

   /*
   *@dev Adding video hash to startups
   */
    function addVideoHash( string memory _hash) external onlyStartup onlyInvestors {
       if(isAlreadyStartupOwner[msg.sender]){
        attachVideoHash[msg.sender] = _hash;
       }else {
           revert BE_STARTUP_OWNER();
       }
    }

   
    
   /*
   *@dev Adding Investments Function
   */
   function amountInvested ( address _startupOwner) external onlyInvestors payable {
      
    (bool callSuccess,) = payable(_startupOwner).call{value:msg.value}("");
    require(callSuccess,"Transfer Failed");
    startupList[atIndex[_startupOwner]].amount -= msg.value ;
    startupList[atIndex[_startupOwner]].upVoteCount ++  ;
    totalInvested[msg.sender] = msg.value;
    pushIDX = investedToStartup[msg.sender];
    uint256 _id = startupList[atIndex[_startupOwner]].sID;
    pushIDX.push(_id);
    investedToStartup[msg.sender] = pushIDX ;
    uint256[] memory _initial;
    pushIDX = _initial;

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

   function getInvestedStartupsIdx() internal view returns (uint256[] memory){
    return investedToStartup[msg.sender] ; 
   }

   function getCurrentInvestemntNeeded()external  view returns(uint256){
      return startupList[atIndex[msg.sender]].amount ; 
   }
   
    function getVideoHash() external view returns(string memory){
        return attachVideoHash[msg.sender];
    }
   
    modifier onlyStartup{
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

  
}