// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct S_Details {
  uint256 sID; 
  string name ;
  string description;
  uint256 amount;
  address ownerAddress;
  uint256 upVoteCount;
  bool isActive;
}