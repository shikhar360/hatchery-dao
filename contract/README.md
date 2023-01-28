#  DEPLOYMENT
HatcheryDao contract deployed to : 0x1B69e07789856c0663f5a5619CE733CA34C70874
Core contract deployed to: 0xD11E7A0Dc33325D8dC99Dd071664A0A91E373523
DataExchange contract deployed to: 0x5a3037a6AbFB24b6C020A987125fEf5B9c7C345f


# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
## Function Checklist
------- HSBTFactory ----------
SetUri (investors and startups)
Mint 
WhiteListingAddress 
Withdraw (from SBT Factory)
ChangeOwnership
------- Core ----------
addStartupsToList
addVideoHash
editImgLink
investAmount
changeIntrestRate(from core)
editName
editTagline
editDescription
editAmount
withdrawCore
------- DataExchange ----------
addDataListing
buyData
changeCommissionIntrestRate
withdrawExchangeEarnings