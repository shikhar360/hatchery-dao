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
error ONLY_FOR_OWNERS_BRO();

contract Core {

  
   HatcherySBT public sbtFactory;
   uint private s_ID = 0;
   uint private i_ID = 0;
   uint256[] private pushIDX ;
   uint256 internal interestRate = 10;
   

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
   

   /*
   *@dev Adding startups to List
   */
   
   function addStartupsToList ( string memory _name , string memory _descrip , string memory _tagline, uint256 _amt   ) external onlyStartupORInvestors {
   
    if(isAlreadyStartupOwner[msg.sender]){
        startupList[atIndex[msg.sender]].isActive = false ;
    }

    startupList.push(S_Details( s_ID , _name , _tagline , _descrip , _amt , payable(msg.sender) , 0  , true , "initial_img" , "NOT_UPLOADED_YET" ));

    atIndex[msg.sender] = s_ID ;

    
    isAlreadyStartupOwner[msg.sender] = true;

    s_ID ++ ;
   }
   
   
   

   /*
   *@dev Adding video hash to startups
   */
    function addVideoHash( string memory _hash) external onlyStartupORInvestors {
       if(isAlreadyStartupOwner[msg.sender] == true){
        startupList[atIndex[msg.sender]].videoHash = _hash;
       }else {
           revert BE_STARTUP_OWNER();
       }
    }
    
    function editImgLink (string memory _imgLink)external onlyStartupORInvestors {
        if(isAlreadyStartupOwner[msg.sender] == true){
            startupList[atIndex[msg.sender]].imgHash = _imgLink;
        }else {
        revert BE_STARTUP_OWNER();
        }

    }
   
   /*
   *@dev Adding Investments Function
   */

   function investAmount ( address _startupOwner) public payable onlyInvestors{   
    require(msg.value > 0 , " Invest More than 0");
    require(startupList[atIndex[_startupOwner]].amount != 0 , "Startup needs no money" );

    uint256 valToEth = msg.value / 10**18 ;

    uint256 calc = startupList[atIndex[_startupOwner]].amount * 10**18 ;
    

    if(calc < msg.value) {

       startupList[atIndex[_startupOwner]].amount = 0;
       startupList[atIndex[_startupOwner]].isActive = false ;

    } else {
       startupList[atIndex[_startupOwner]].amount -= valToEth ;

    }

    uint restAmount = msg.value - (msg.value * interestRate/100);
    (bool callSuccess,) = payable(_startupOwner).call{value: restAmount}("");
    require(callSuccess,"Transfer Failed");

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
   *@dev Function for changing the Interest Rates
   */ 
   function changeIntrestRate ( uint256 _amt) external onlyOwner {
     require(_amt > 0 && _amt < 20 , "Intrest cant be Zero % and more than 20%");
     interestRate = _amt ;
   }

   /*
   *@dev Edit Functions for startup
   */ 
   function editName( string memory _name) external onlyStartupOwners {
     require(startupList[atIndex[msg.sender]].isActive == true , "Cant edit Inactive Startups" );
      startupList[atIndex[msg.sender]].name = _name;
   }

   function editTagline( string memory _tag) external onlyStartupOwners {
    require(startupList[atIndex[msg.sender]].isActive == true , "Cant edit Inactive Startups" );
      startupList[atIndex[msg.sender]].tagline = _tag;
   }
   
   function editDescription( string memory _des) external onlyStartupOwners {
    require(startupList[atIndex[msg.sender]].isActive == true , "Cant edit Inactive Startups" );
      startupList[atIndex[msg.sender]].description = _des;
   }

   function editAmount( uint256 _amt) external onlyStartupOwners {
    require(startupList[atIndex[msg.sender]].isActive == true , "Cant edit Inactive Startups" );
      startupList[atIndex[msg.sender]].amount = _amt;
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
   
    function getVideoHash(address _addr) external view returns(string memory){
        return startupList[atIndex[_addr]].videoHash;
    }
    
    function getImageLink( address _addr) external view returns(string memory){
        return startupList[atIndex[_addr]].imgHash ;
    }
   
   
   function getOwnerAdd () external view returns (address){
       return sbtFactory.getAddressOfOwner();
   }
   
   function withdrawCore() external onlyOwner {
    (bool callSuccess,) = payable(msg.sender).call{value:address(this).balance}("");
    require(callSuccess,"Call failed");
   }

   /*
   *@dev Modifiers
   */
    modifier onlyOwner{
    if (!(sbtFactory.isOwner(msg.sender) ) ){
        revert ONLY_FOR_OWNERS_BRO();
    }  
    _;   
    }
   
   
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