// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HatcherySBT is ERC721, ERC721URIStorage, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant STARTUP = keccak256("STARTUP");
    bytes32 public constant INVESTOR = keccak256("INVESTOR");

    string private startup_uri;
    string private investor_uri;
    address public owner ;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public ownersID;
    mapping(address => bytes32) public hasAccessOf ;
    mapping(address => bool) public ownSNFT;
    mapping(address => bool) public ownINFT;



    constructor() ERC721("HatcherySBT", "HSBT") {
        _grantRole(OWNER_ROLE, msg.sender);
        owner = msg.sender ;
        hasAccessOf[msg.sender] = OWNER_ROLE ;
    }

    /*
    * @dev Buying a specific SBT for getting access to DAO
    */
    function mint(address to) public payable {
        require(msg.value == 0.1 ether || msg.value == 0.2 ether , "PAY 0.1 or 0.2 ETHERS FOR GETTING ACCESS");
        uint256 tokenId = _tokenIdCounter.current();
        ownersID[msg.sender] = tokenId;
        _tokenIdCounter.increment();

        if(msg.value == 0.1 ether){
        ownSNFT[msg.sender] = true ; 
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, startup_uri);
        }
        //--------------------------------------------

        if(msg.value == 0.2 ether){
        ownINFT[msg.sender] = true ;       
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, investor_uri);
        }

    }
   
    function whiteListingAddress (address _addr) external onlyRole(OWNER_ROLE) {
        ownSNFT[_addr] = true ;  
    }

   /*
   * @dev Most important functions to allow user in other contracts 
   *      checking wether the address is startup owner or investor.
   */
   function isStartup (address _operator) public view returns (bool){
     return ownSNFT[_operator] == true ? true : false;
   }

    function isInvestor (address _operator) public view returns (bool){
     return ownINFT[_operator] == true ? true : false;
   }

   function isOwner (address _operator) public view returns (bool){
     return hasAccessOf[_operator] == OWNER_ROLE ? true : false;
   }

   function getAddressOfOwner () external view returns(address){
       return owner ;
   }

   /*
   * @dev To withdraw the earnings 
   */
   function withdraw() external onlyRole(OWNER_ROLE) {
    (bool callSuccess,) = payable(msg.sender).call{value:address(this).balance}("");
    require(callSuccess,"Call failed");
   }

   /*
   * @dev Change the Ownership
   */

   function changeOwnership (address _previousOwner , address _newOwner) external onlyRole(OWNER_ROLE){
       _revokeRole(OWNER_ROLE , _previousOwner ) ;
       owner = _newOwner ;
       _grantRole(OWNER_ROLE , _newOwner);
   }

   /*
   * @dev setting up the URI (dynamic for future as well) 
   */
   function setStartupURI (string memory _uri) external onlyRole(OWNER_ROLE){
       startup_uri = _uri;
   }

   function setInvestorURI (string memory _uri) external onlyRole(OWNER_ROLE){
       investor_uri = _uri;
   }

   /*
   * @dev setting up the URI (dynamic for future as well) 
   */
   function getURIs () external view returns (string[2] memory){
      return [startup_uri , investor_uri ];
   }
   


    // The following functions are overrides required by Solidity.
    /*
    * @dev Incase member wants to leave the DAO
    */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

     //// Prevent transfers ////
    /**
     * @dev See {IERC721-transferFrom} of openzeppelin Contract
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }

    /**
     * @dev See {IERC721-transferFrom} of openzeppelin Contract
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }

    /**
     * @dev See {IERC721-transferFrom} of openzeppelin Contract
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }
}
