// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../HSBTFactory.sol";
import "./StartupDetails.sol";


error YOU_HAVENT_BOUGHT_TOKEN();
error BE_STARTUP_OWNER();
error ONLY_INVESTOR_FUNCTION();
error MUST_BE_STARTUP_OR_INVESTOR();
error NOT_A_VALID_OWNER();
error NOT_A_VALID_INVESTOR();
error NOT_UPLOADED_VIDEO_YET();

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
   mapping(address => uint256) internal totalFundsCollected;
   mapping(address => bool) internal isValidInvestor;
   mapping(address => bool) internal havePostedHash;

   /*
   *@dev Adding startups to List
   */
   
   function addStartupsToList ( string memory _name , string memory _descrip , string memory _tagline, uint256 _amt  ) external onlyStartupORInvestors {
   
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
    function addVideoHash( string memory _hash) external onlyStartupORInvestors {
       if(isAlreadyStartupOwner[msg.sender] == true){
        attachVideoHash[msg.sender] = _hash;
        havePostedHash[msg.sender] = true;
       }else {
           revert BE_STARTUP_OWNER();
       }
    }

   
   /*
   *@dev Adding Investments Function
   */

   function investAmount ( address _startupOwner) public payable onlyInvestors{
     
    (bool callSuccess,) = payable(_startupOwner).call{value: msg.value}("");
    require(callSuccess,"Transfer Failed");
    uint256 valToEth = msg.value / 10**18 ;
    startupList[atIndex[_startupOwner]].amount -= valToEth ;
    startupList[atIndex[_startupOwner]].upVoteCount ++  ;
    totalInvested[msg.sender] += msg.value;
    isValidInvestor[msg.sender] = true;
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
    function getTotalInvested() external onlyValidInvestor view returns(uint256){
     return totalInvested[msg.sender];
    }

    function getListOfStartups() external  view returns(S_Details[] memory){
     return startupList ; 
    }

    function getOwnerStartups() external onlyStartupOwners view returns(S_Details memory){
       return startupList[atIndex[msg.sender]];
    }

    function getOwnerStartupsAtIndex() external onlyStartupOwners view returns(uint256){
        return atIndex[msg.sender] ;
    }

   function getInvestedStartupsIdx() external onlyValidInvestor view returns (uint256[] memory){
    return investedToStartup[msg.sender] ; 
   }

   function getCurrentInvestemntNeeded()external onlyStartupOwners view returns(uint256){
      return startupList[atIndex[msg.sender]].amount ; 
   }
   
    function getVideoHash() external onlyStartupOwners view returns(string memory){
        if (havePostedHash[msg.sender] == false){
           revert NOT_UPLOADED_VIDEO_YET();
        }

        return attachVideoHash[msg.sender];
    }
   

   /*
   *@dev Modifiers
   */
    modifier onlyStartup{
    if (!(sbtFactory.isStartup(msg.sender) ) ){
        revert YOU_HAVENT_BOUGHT_TOKEN();
    }  
    _;   
    }

    modifier onlyStartupOwners{
    if (!(sbtFactory.isStartup(msg.sender) && isAlreadyStartupOwner[msg.sender] == true ) ){
        revert NOT_A_VALID_OWNER();
    }  
    _;   
    }
    
    modifier onlyValidInvestor{
    if (!(sbtFactory.isInvestor(msg.sender) && isValidInvestor[msg.sender] == true  ) ){
        revert NOT_A_VALID_INVESTOR();
    }  
    _;   
    }

    modifier onlyInvestors{
    if (!(sbtFactory.isInvestor(msg.sender) ) ){
        revert ONLY_INVESTOR_FUNCTION(); 
    }  
    _;   
    }

    modifier onlyStartupORInvestors{
    if (!(sbtFactory.isStartup(msg.sender)  || sbtFactory.isInvestor(msg.sender)  ) ){
        revert MUST_BE_STARTUP_OR_INVESTOR();
    }  
    _;   
    }

}