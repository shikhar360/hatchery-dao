// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract HatcheryDao is ERC20 {
    error NOT_OWNER();
    event JoinedDao(address member);
    event Claimed(address member, uint256 amount);
    event Updated(uint256 _id, bool updateStatus);

    address private owner;

    struct Investor {
        string name;
        string description;
        address userAddress;
        bool registered;
    }

    struct Founder {
        string name;
        string description;
        address userAddress;
        bool registered;
    }

    struct Startup {
        string name;
        string description;
        address nativeToken;
        string videoHash;
        uint256 valuation;
        bool updated;
    }

    mapping (address => bool) public hasJoined;
    mapping (uint256 => Investor) public investor;
    mapping (address => bool) public isInvestor;
    mapping (uint256 => Founder) public founder;
    mapping (address => bool) public isFounder;
    mapping (uint256 => Startup) public startup;

    uint256 investorId;
    uint256 founderId;
    uint256 startupId;

    address[] public DAO_Members;

    constructor(uint256 initialSupply) ERC20("HETCHToken", "HDT") {
            _mint(address(this), initialSupply);
            owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) {
            revert NOT_OWNER();
        }
        _;
    }

    modifier enoughWallabyToJoin () {
        if(msg.value <= 0.1 ether) {
            revert("DAO_NOT_FOR_BROKIES");
        }
        _;
    }

    // Registration part
    function joinDao() external payable enoughWallabyToJoin  {
        require(!hasJoined[msg.sender], "ALREADY_JOINED!!!");
        DAO_Members.push(msg.sender);
        hasJoined[msg.sender] = true;
        emit JoinedDao(msg.sender);
    }

    // Registor as a startup founder
    function registerAsFounder(
        string memory _name,
        string memory _description,
        address _companyWalletAddress
    )
    public 
    payable 
    {
        require(hasJoined[msg.sender], "YOU_NEED_TO_JOIN_FIRST");
        require(msg.value == 0.5 ether, "BROKE_BUMS_CAN'T_REGISTER_AS_FOUNDERS");
        Founder storage thisFounder = founder[founderId];
        thisFounder.name = _name;
        thisFounder.description = _description;
        thisFounder.userAddress = _companyWalletAddress;
        thisFounder.registered = true;
        isFounder[msg.sender] = true;
        founderId++;
    }

    // Register as an investor
    function registerAsInvestor(
        string memory _name,
        string memory _description,
        address _investorWalletAddress
    )
    public
    payable
    {
        require(hasJoined[msg.sender], "YOU_NEED_TO_JOIN_DAO_FIRST");
        require(msg.value == 1 ether, "BROKE_SO_CALLED_INVESTORS_NOT_ALLOWED");
        Investor storage thisInvestor = investor[investorId];
        thisInvestor.name = _name;
        thisInvestor.description = _description;
        thisInvestor.userAddress = _investorWalletAddress;
        thisInvestor.registered = true;
        isInvestor[msg.sender] = true;
        investorId++;
    }
    
    // These two will make you eligible for certain function calls
    modifier enoughEth(uint256 _amount) {
        if(_amount == 1) {
            require(msg.value == 0.01 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 2) {
            require(msg.value == 0.02 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 3) {
            require(msg.value == 0.03 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 4) {
            require(msg.value == 0.04 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 5) {
            require(msg.value == 0.05 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 6) {
            require(msg.value == 0.06 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if (_amount == 7) {
            require(msg.value == 0.07 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 8) {
            require(msg.value == 0.08 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 9) {
            require(msg.value == 0.09 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else if(_amount == 10) {
            require(msg.value == 0.1 ether, "BROKE_BUMS_CAN'T_BUY_KHAN_TOKENS");
        }
        else {
            revert("CAN'T BUY MORE THAN 10 TOKENS");
        }
        _;
    }

    function claimTokens(uint256 _amount)
    public
    payable
    enoughEth(_amount)
    {
        if(isInvestor[msg.sender] == true) {
            _transfer(address(this), msg.sender, _amount);
        }
        else if (isFounder[msg.sender] == true) {
            _transfer(address(this), msg.sender, _amount);
        }
        else {
            revert("YOU_ARE_NOT_ELIGIBLE_TO_CLAIM");
        }
        emit Claimed(msg.sender, _amount);
    }

    modifier onlyFounders() {
        if (!isFounder[msg.sender]) {
            revert("NOT_FOUNDER");
        }
        _;
    }

    function createPostAsFounder(
        string memory _name,
        string memory _description,
        address _nativeToken,
        string memory _videoHash,
        uint256 _valuation
    )
    external 
    onlyFounders
    {
        require(balanceOf(msg.sender) >= 2, "ATLEAST_TWO_TOKENS_REQUIRED_TO_POST");
        Startup storage thisStartup = startup[startupId];
        thisStartup.name = _name;
        thisStartup.description = _description;
        thisStartup.nativeToken = _nativeToken;
        thisStartup.videoHash = _videoHash;
        thisStartup.valuation = _valuation;
        startupId++;
        _burn(msg.sender, 2);
    }

    //updateable data
    function UpdateStartupPost(
        uint256 _id,
        string memory _name,
        string memory _description,
        address _nativeToken,
        string memory _videoHash,
        uint256 _valuation
    )
    external
    onlyFounders
    {
        Startup storage thisStartup = startup[_id];
        require(!thisStartup.updated, "DATA_ALREADY_UPDATED_ONCE");
        thisStartup.name = _name;
        thisStartup.description = _description;
        thisStartup.nativeToken = _nativeToken;
        thisStartup.videoHash = _videoHash;
        thisStartup.valuation = _valuation;
        thisStartup.updated = true;
        emit Updated(_id, thisStartup.updated);
    }



    function mint(uint256 _amount) onlyOwner external {
        _mint(address(this), _amount);
    }
    // after registration they can create if they have a certain amount of balance
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getInvestorId() public view returns(uint256) {
        return investorId;
    }

    function getFounderId() public view returns(uint256) {
        return founderId;
    }

    function getStartupId() public view returns(uint256) {
        return startupId;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    receive() external payable {}

    fallback() external payable {}
}

/*
User will land on the website 

see the details and buy the token  (on the separate page)
e.g -> 100 token will give the access to creating a startup and 200 tokens will give the access to post the startup as well as to DO THE INVESTING

access control will be given on the basis of amount of nft or token that he have (Soulbound Tokens projects have won in the past so keep this in mind)

after they have bought the token they will be pushed to a new page where they will see the list of all the startups that have posted their proposal to get the investment.

(
There will be a mega form page to fill the info of startups
name (editable only twice) (string)
description (editable)     (string)
Native token (erc20)       (string)
Amount                     (number)
address
startupID                  (optional)
mapping of address to a string (to save the hash of video)
--------------------------OR--------------------

If he is investor then his details like
name 
comapany
description
valuation             ++ Address

=> Users should be able to join the DAO
=> Users should be able to buy the tokens
=> Users should be able to create a post for a startup
=> Users should be able to invest in a startup
=> Users should be able to add themselves as investors or Startup founders
*/