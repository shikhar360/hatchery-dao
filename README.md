# HatcheryDAO 🐣️
HatcheryDAO is a **Token** gated  **Startup Incubator DAO** in which a STARTUP can post about his startup and can recieves fundings on it from all over the world . 

It gives access to anyone who has a **Investor Soulbound NFT** to invest in a startup. Investors can invest as low and as high as they want.

HatcheryDAO also act as a **DataDAO** in which you can buy and sell the critical data like profit statement , company's ledger , balance sheet and anything that might be usefull to investor and other startups to know before from the normal people outside the DAO.

## How the DAO makes money ? 💸️ 💰️
There are three ways in which the dao can make the money 

**SOULBOUND NFTs** --------

The DAO has 2 S-NFTs 
* STARTUP Soulbound NFT
* INVESTOR Soulbound NFT

Everyone will get access to use functions based on the NFT that they have bought and all the amout of the NFT can be withdrawn by the **Owners' Address** only . Owners can be changed in the future if the DAO wants.

**Commission on Investments** --------

The owner earns a certain percent of commission on each transaction made by investor and the rest amount is then tranfered to the address of the startup owner

Currently the commission on invetments is **10%** but can be changed in the future if the DAO wants.

**Data Exchange's commission** --------
The owner also earns some commision in between the data exchange process. The data owner will get the rest of the amount after cutting the commissions.

Currently the commission on data exchanges is **5%** , but can be changed in future if the DAO wants.


## Features 🧑‍💻️

There are many features which are implemented while the creation of the DAO

* Buying of Soulbound NFTs
* No entry barrier for startups
* No limitation on Investing
* Buying and sellig of Data
* Encrypted uploading of Data
* Live public presentation on Huddle01
* Private video chat with startup owners
* Startup video uploading on posting page
* Editing of startup post 
* Decentralised video playing
* Private visibility of assets purchased and invested



## Manifesto of HatcheryDAO 🔮️

The DAO ofcourse lacks some feature that it wishes to improve in the future

1. Implementation of a DEX
   
   The DAO is currently doing a lot of transactions in its native token FIL but as we are supposing , in future there will be a lot of **separate entities** participating in it and each entity will have separate business model. 
   
   So the implementation of **ERC20** tokens for each startups on the filecoin ecosystem will compliment each other.

2. Decentralised DBMS integration

   A lot of data is currently getting stored on the smart contract and we wish to implement a DBMS in future . So the smart contract has less load on it.

3. Decentralised ID

   It will be great if we implement the **lens** support on this dapp in future for the readability of the address and avoiding any manual errors.

4. Abolition of owners if caught in bad practises

   Currently there is no way to remove someone from the DAO if they caught in bad practises like spaming and posting wrong content on the Data exchanges.

5. Live Price feed

   Currently there is no live price feed of the invested amount to the startups we wish to implement that feature as well.


## Tech Used ⚙️
The DAO is created using the Next.js framework and the styling is done using TailwindCss apart from these , the following tech is also used : 

- **Lighthouse** ------------------------------------------

   Lighthouse is used to to encrypt the file in the data exchange. Before any file is uploaded it is first getting encrypted using the Lighthouse browser encryption and then the hash of the file is getting stored on the smart contract . Users also have to decrypt the file in order to view it.

     **Link to file where it is used**

   Not only in the Data exchange but it is also used to normal upload the image file on the startup post on the ipfs using the Light house 
 
  **Link to file where it is used**

- **Huddle01** ------------------------------------------

  Huddle is used to create public meeting for pitching your idea in the PitchDeck page , I have used I frame for setting up the group meeting.

   **Link to file where it is used**

   Also huddle is used in doing private video meetings with the startup owners , if they want before investion or clearing doubts.

   **Link to file where it is used**

- **Livepeer** ------------------------------------------   
  
  Livepeer is used to upload the video of startup post and getting the playbackID. The playback is then getting stored on the smart contract.

  **Link to file where it is used**

  It is also used to play the video of the same in the expnd page which you can access by clicking *Allstartups/Expand*

    **Link to file where it is used**

- **Spheron**------------------------------------------ 

  The website's production is running on spheron network and custom root domain is used. 

- **Filecoin**------------------------------------------

  The whole DAO is created and deployed on the filecoin ecosystem (hyperspace at the moment), it is currently supporting the filecoin ecosystem by boosting the transaction on the network , at the same time helping the early startups to raise funding and support by selling the importat Data

- **Conectkit + Wagmi** -------------------------------------
  
  It is used for conneting our dapp to the web3 ecosystem, various functions like useAccount(), useContract(), useProvider(), useSigner(), useBalance() and many more have been used .
 

## Challenges I ran into 🏇️
  - I ran into the problem of deploying the contract on the filecoin network , it was always giving some errors of http provider request which i had mentioned in details in the respected file. At the end I have deployed it using the remix IDE , It was giving no errors when deploying on other networks.

  - Also the transfer of data between pages was something i rarely had done in pas , so got some good grasp of it in this project.

  - Also i was using the protocols like Huddle01 and Livepeer for thr first time , It was quite challenging to implement all that but have to say their docs helped me a lot.


## How to run the app ? 💫️

Just Three Commands to get started

```bash
git clone https://github.com/shikhar360/hatchery-dao.git

yarn
# or
npm install 

npm run dev
# or
yarn dev
```
Also dont forget to add the API keys from : 

* Livepeer 
* Huddle
* Lighthouse

and the naming in `.env` file should be

```js
NEXT_PUBLIC_LIGHTHOUSE=<Your_API_Key>
NEXT_PUBLIC_STUDIO_API_KEY=<Your_API_Key>
NEXT_PUBLIC_HUDDLE=<Your_API_Key>
```
