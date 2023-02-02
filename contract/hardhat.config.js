require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const RPC = process.env.HYPERSPACE_FILCOIN_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "hyperspace",
  networks: {
    hyperspace : {
      url: RPC,
      accounts: [PRIVATE_KEY],
      chainId: 3141,
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  } 
};

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