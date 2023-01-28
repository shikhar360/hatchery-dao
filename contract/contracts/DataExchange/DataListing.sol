// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct DataListing {
    uint d_Id ;
    string name ;
    string details ;
    uint256 amount;
    address payable dataOwner;
    string hash ;
}