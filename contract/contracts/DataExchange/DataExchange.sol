// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../HSBTFactory.sol";
import "./DataListing.sol";

error ONLY_STARTUPS_AND_INVESTOR_CAN_BUY();
error ONLY_FOR_OWNERS_BRO();

contract Exchange {

    HatcherySBT public sbtFactory;
    DataListing[] internal listingArr ;
    uint internal commissionRate = 5 ;
    uint internal dId = 0 ;
    string[] internal allBought;


    mapping(address => string[]) internal boughtData ;

    constructor(address _address){
     sbtFactory = HatcherySBT(_address);

    }
     

    function addDataListing (string memory _name , string memory _desc , uint256 _amt , string memory _hash)external onlyStartupORInvestors{
      listingArr.push(DataListing(dId , _name , _desc , _amt , payable(msg.sender) , _hash ));
      dId ++ ;

    }

   /*
   *@dev Buying the data with specific ID
   */ 
    function buyData ( uint256 _idx) external payable onlyStartupORInvestors {
      require(msg.value == listingArr[_idx].amount , "Please Send correct AMOUNT");

       uint restAmount = msg.value - (msg.value * commissionRate/100);
      (bool callSuccess,) = payable(listingArr[_idx].dataOwner).call{value: restAmount}("");
      require(callSuccess,"Transfer Failed");
      
      string[] memory defaultValue ;
      allBought = boughtData[msg.sender] ;
      allBought.push(listingArr[_idx].hash) ;
      boughtData[msg.sender] = allBought ;
      allBought = defaultValue;

    } 
    
    /*
   *@dev Getter functions
   */ 
    function getAllBoughtData () external view returns(string[] memory) {
        return boughtData[msg.sender] ;
    }

    function getAllListing () external view returns (DataListing[] memory){
        return listingArr ;
    } 

   /*
   *@dev Function for changing the Interest Rates
   */ 
    function changeCommissionIntrestRate ( uint256 _amt) external onlyOwner {
     require(_amt > 0 && _amt < 20 , "Intrest cant be Zero % and more than 20%");
     commissionRate = _amt ;
    }

    function withdrawExchangeEarnings() external onlyOwner {
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
   

    modifier onlyStartupORInvestors{
    if (!(sbtFactory.isStartup(msg.sender)  || sbtFactory.isInvestor(msg.sender)  ) ){
        revert ONLY_STARTUPS_AND_INVESTOR_CAN_BUY();
    }  
    _;   
    }


}