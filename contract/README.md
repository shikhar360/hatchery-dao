#  DEPLOYMENT
#### HatcheryDao contract deployed to : 
- 0x0f384daFF7652FfAf7A75CE8a515aE6e9B599135
#### Core contract deployed to: 
- 0x01C3993802Fb76cfa1E7cBD8566f25CD79Da844D
#### DataExchange contract deployed to:
- 0x82C50656Ef2De046f89dCB2ABB52Afa577A49029


## Function Checklist
------- HSBTFactory ----------
- SetUri (investors and startups)
- Mint 
- WhiteListingAddress 
- Withdraw (from SBT Factory)
- ChangeOwnership

------- Core ----------
- addStartupsToList
- addVideoHash
- editImgLink
- investAmount
- changeIntrestRate(from core)
- editName
- editTagline
- editDescription
- editAmount
- withdrawCore
- +getterFunctions

------- DataExchange ----------
- addDataListing
- buyData
- changeCommissionIntrestRate
- withdrawExchangeEarnings
- +getterFunctions

### Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```