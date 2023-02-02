
const {ethers} = require("hardhat");

async function main() {

  // deployment of HSbT contract
  const HSBTFactoryContractFactory = await ethers.getContractFactory("HatcherySBT");
  const HSBTFactoryContract = await HSBTFactoryContractFactory.deploy();
  await HSBTFactoryContract.deployed();
  console.log("HatcheryDao contract deployed to:", HSBTFactoryContract.address);
  // deployment of Core contract
  const CoreContractFactory = await ethers.getContractFactory("Core");
  const CoreContract = await CoreContractFactory.deploy(HSBTFactoryContract.address);
  await CoreContract.deployed();
  console.log("Core contract deployed to:", CoreContract.address);

  //Deployment of DataExchange Contract
  const DataExchangeContractFactory = await ethers.getContractFactory("Exchange");
  const DataExchangeContract = await DataExchangeContractFactory.deploy(HSBTFactoryContract.address);
  await DataExchangeContract.deployed();
  console.log("DataExchange contract deployed to:", DataExchangeContract.address);
}

/*
Currently deployed using remix IDE:
Was getting error when running the command
--------------------------------------------------------
```npx hardhat run scripts/deploy.js --network hyperspace```
--------------------------------------------------------

with API of 
--------------------------------------------------------
https://api.hyperspace.node.glif.io/rpc/v0
https://api.hyperspace.node.glif.io/rpc/v1
----------------------------------------------------------
(no issues when deploying on Mumbai testnet)

Error:
ProviderError: HttpProviderError
    at HttpProvider.request 
    at LocalAccountsProvider.request 
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at EthersProviderWrapper.send 


*/

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
