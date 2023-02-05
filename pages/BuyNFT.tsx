import { HatcheryDaoAbi, HatcheryDaoAddress } from "../constants";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { ethers, utils } from "ethers";
import Head from "next/head";

export default function BuyNFT() {
  const [isStartupO, setIsStartupO] = React.useState<boolean | undefined>();
  const [isInvestorO, setIsInvestorO] = React.useState<boolean | undefined>();
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  const sbt = useContract({
    address: HatcheryDaoAddress,
    abi: HatcheryDaoAbi,
    signerOrProvider: signer || provider,
  });

  async function buyStartupSBT() {
    try {
      if (isConnected === false) {
        toast.error("Please connect your wallet");
        return;
      }

      const value = 0.1;

      const tx = await sbt?.mint(address, {
        value: utils.parseEther(value.toString()),
      });
      toast("Waiting for StartupSBT to get minted");
      await tx?.wait();
      toast("StartupSBT has been minted");
    } catch (err) {
      console.log(err);
      toast.error("Insufficient Fund or Network Error");
    }
  }

  async function buyInvestorSBT() {
    try {
      if (isConnected === false) {
        toast.error("Please connect your wallet");
        return;
      }


      const value = 0.2;

      const tx = await sbt?.mint(address, {
        value: utils.parseEther(value.toString()),
      });
      toast("Waiting for InvestorSBT to get minted");
      await tx?.wait();
      toast("InvestorSbt has been minted");
    } catch (err) {
      console.log(err);
      toast.error("Insufficient Fund or Network Error");
    }
  }

  //  -----------------------------------------------------------------------------------
  //  -----------------------------------------------------------------------------------
  async function check() {
    try {
      const tx = await sbt?.isStartup(address);
      console.log(tx);
      if (tx == true) {
        setIsStartupO(true);
        // toast.success("Thanks for buying StartupSBT");
      }
      const tx2 = await sbt?.isInvestor(address);
      console.log(tx2);
      if (tx2 == true) {
        setIsInvestorO(true);
        // toast.success("Thanks for buying StartupSBT");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  async function checkI() {
    try {
     
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    check();
    // checkI();
  }, []);

  return (
    <>
    <Head>
        <title>HatcheryDao NFTs</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
      <ToastContainer />
      <section className=" bg-[#100a25] grid sm:grid-cols-2 grid-cols-1 items-start   justify-center min-h-screen w-full mx-auto ">
        <div className=" shadow-white shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-white transition-all duration-300 ease-linear bg-white w-3/5 flex flex-col items-center justify-center border-2 border-black border-dashed p-4 rounded-xl mx-auto my-20 font-jose rounded- ">
          <img src="/img/startup.jpg" alt="img" className="rounded-xl" />
          <div className="w-full mx-auto flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-center mt-4 mb-2 ">
              Startup Soulbound NFT
            </p>
            {isStartupO ? (
              <button
                className={`mb-4 bg-lime-500 py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold`}
              >
                Thanks For Buying
              </button>
            ) : (
              <button
                onClick={() => buyStartupSBT()}
                className={`mb-4 bg-gradient-to-br from-[#ff9900] to-[#fdcf00] py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold`}
              >
                Buy NOW : 0.1 FIL
              </button>
            )}

            <p className="text-sm font-semibold">
              This is a StartupSBT . You will be able to do the following things
              :
            </p>
            <ul className="text-sm ml-4">
              <li> Post about your Startup</li>
              <li> Able to raise funding</li>
              <li> Will able to see other startups</li>
              <li> Will able to buy/sell your Data</li>
              <li> Will able to have huddle meeting with Investors </li>
              <li> And many more...</li>
            </ul>
          </div>
        </div>
        <div className=" shadow-white shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-white transition-all duration-300 ease-linear bg-white w-3/5 flex flex-col items-center justify-center border-2 border-black border-dashed p-4 rounded-xl mx-auto my-20 font-jose ">
          <img src="/img/investor.jpg" alt="img" className="rounded-xl" />
          <div className="w-full mx-auto flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-center mt-4 mb-2 ">
              Investor Soulbound NFT
            </p>
            {isInvestorO ? (
              <button
                className={`mb-4 bg-lime-500 py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold`}
              >
                Thanks For Buying
              </button>
            ) : (
              <button
                onClick={() => buyInvestorSBT()}
                className={`mb-4 bg-gradient-to-br from-[#ff9900] to-[#fdcf00] py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold`}
              >
                Buy NOW : 0.2 FIL
              </button>
            )}

            <p className="text-sm font-semibold">
              This is a InvestorSBT . You will be able to do the following
              things :
            </p>
            <ul className="text-sm ml-4">
              <li> Able to Invest</li>
              <li> Manage your investments</li>
              <li> Post about your Startup</li>
              <li> Able to raise funding</li>
              <li> Will able to see other startups</li>
              <li> Will able to buy/sell your Data</li>
              <li> Will able to have huddle meeting with Investors </li>
              <li> And many more...</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
