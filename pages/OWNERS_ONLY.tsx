import React, { useEffect, useState } from "react";
import { HatcheryDaoAbi, HatcheryDaoAddress } from "../constants";
import { CoreContractAddress, CoreContractAbi } from "../constants";
import { ExchangeContractAddress, ExchangeContractAbi } from "../constants";

import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function OWNERS_ONLY() {
  const [sUri, setSUri] = React.useState<string>("");
  const [iUri, setIUri] = React.useState<string>("");
  const [wAddress, setWAddress] = React.useState<string>("");
  const [iCore, setICore] = React.useState<number>();
  const [cExchange, setCExchange] = React.useState<number>();

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const sbt = useContract({
    address: HatcheryDaoAddress,
    abi: HatcheryDaoAbi,
    signerOrProvider: signer || provider,
  });

  const core = useContract({
    address: CoreContractAddress,
    abi: CoreContractAbi,
    signerOrProvider: signer || provider,
  });

  const exchange = useContract({
    address: ExchangeContractAddress,
    abi: ExchangeContractAbi,
    signerOrProvider: signer || provider,
  });


  function handleSUri(e: React.ChangeEvent<HTMLInputElement>) {
    
    setSUri(e.target.value);
  }
  function handleIUri(e: React.ChangeEvent<HTMLInputElement>) {
    
    setIUri(e.target.value);
  }

  function handleWhiteListAdd(e: React.ChangeEvent<HTMLInputElement>) {
    
    setWAddress(e.target.value);
  }
  function handleInterestCore(e: React.ChangeEvent<HTMLInputElement>) {
   
    if (+e.target.value < 0) return;
    setICore(+e.target.value);
  }
  function handleCommissionExchange(e: React.ChangeEvent<HTMLInputElement>) {
   
    if (+e.target.value < 0) return;
    setCExchange(+e.target.value);
  }
  // /--------------------------------------------------------------------------------
  // /--------------------------------------------------------------------------------
  // /--------------------------------------------------------------------------------
  //  Contract Functions
  // /--------------------------------------------------------------------------------

  async function check() {
    try {
      const tx = await sbt?.isStartup(address);
      if (tx == true) {
        toast.success("Yes you are a startup");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //  ipfs://QmbmaHB9MRE3JWZJy4BhjeaTvbS7bNAqWQXdnfWqV4Jr4G
  async function setContractStartupURI(val: string) {
    try {
      const tx = await sbt?.setStartupURI(val);
      toast("Waiting for URI to get settled");
      await tx?.wait();
      toast("Startup URI has been set");
    } catch (err) {
      console.log(err);
      toast.error("Got some error while setting up Startup URI");
    }
  }

  // ipfs://QmbUBZ8GN15jUnGCHa1ppFujzbpSdJ7FUCy4HYtHWSzuJu
  async function setContractInvestorURI(val: string) {
    try {
      const tx = await sbt?.setInvestorURI(val);
      toast("Waiting for URI to get settled");
      await tx?.wait();
      toast("Investor URI has been set");
    } catch (err) {
      console.log(err);
      toast.error("Got some error while setting up Investor URI");
    }
  }

  async function whitelistingAdd(val: string) {
    try {
      const tx = await sbt?.whiteListingAddress(val);
      toast("Waiting address to get whitelist");
      await tx?.wait();
      toast("Congrats! Address has been whitelisted");
    } catch (err) {
      console.log(err);
      toast.error("Error while whitelisting address");
    }
  }

  async function changeInterestCore(val: number | undefined) {
    if (val == 0 || val == undefined) return;
    try {
      const tx = await core?.changeIntrestRate(val);
      toast("Waiting for change in Interest");
      await tx?.wait();
      toast("Congrats! Interest has been changed");
    } catch (err) {
      console.log(err);
      toast.error("Error while changing interest");
    }
  }

  async function changeCommissionExchange(val: number | undefined) {
    if (val == 0 || val == undefined) return;
    try {
      const tx = await exchange?.changeCommissionIntrestRate(val);
      toast("Waiting for change in Interest");
      await tx?.wait();
      toast("Congrats! Interest has been changed");
    } catch (err) {
      console.log(err);
      toast.error("Error while changing interest");
    }
  }

  async function withdrawMint() {
    try {
      const tx = await sbt?.withdraw();
      toast("Waiting for withdrawl");
      await tx?.wait();
      toast("Congrats! Withdrawl has been done");
    } catch (err) {
      console.log(err);
      toast.error("Error while getting withdrawl");
    }
  }

  async function withdrawFCore() {
    try {
      const tx = await core?.withdrawCore();
      toast("Waiting for withdrawl");
      await tx?.wait();
      toast("Congrats! Withdrawl has been done");
    } catch (err) {
      console.log(err);
      toast.error("Error while getting withdrawl");
    }
  }

  async function withdrawExchange() {
    try {
      const tx = await exchange?.withdrawExchangeEarnings();
      toast("Waiting for withdrawl");
      await tx?.wait();
      toast("Congrats! Withdrawl has been done");
    } catch (err) {
      console.log(err);
      toast.error("Error while getting withdrawl");
    }
  }


  const [balances , setBalances ] = useState<any>({
    HatcheryBal:0,
    CorBal:0,
    ExBal:0
  }) 

  const { data: HatcheryBal } = useBalance({
    address: HatcheryDaoAddress,
    watch: true,
  });
  const { data: CorBal } = useBalance({
    address: CoreContractAddress,
    watch: true,
  });
  const { data: ExBal } = useBalance({
    address: ExchangeContractAddress,
    watch: true,
  });

  
  async function getBals (){


    setBalances({
      HatcheryBal: HatcheryBal?.formatted,
      CorBal: CorBal?.formatted,
      ExBal: ExBal?.formatted
    })


  }

  useEffect(() => {
    getBals()
  }, [])

  return (
    <>
      <div className=" bg-[#100a25] min-h-screen w-full pb-16 flex flex-col items-center justify-center gap-4">
      <Head>
        <title>HatcheryDao - OwnersOnly</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
        <ToastContainer />
    
        <div className="text-white gap-4 font-jose  mt-16 text-center px-8 flex flex-wrap items-center justify-center">
          <p className="text-xl sm:text-2xl">
            <b>HatcheryBal:</b>{" "}
            <b className="font-bold text-3xl text-lime-500">
              {balances.HatcheryBal}
            </b>{" "}
            <b className="text-xs">tFIL</b>
          </p>
          <p className="text-xl sm:text-2xl">
            <b>CoreBalance:</b>{" "}
            <b className="font-bold text-3xl text-lime-500">
              {balances.CorBal}
            </b>{" "}
            <b className="text-xs">tFIL</b>
          </p>
          <p className="text-xl sm:text-2xl">
            <b>ExchangeBalance :</b>{" "}
            <b className="font-bold text-3xl text-lime-500">
              {balances.ExBal}
            </b>{" "}
            <b className="text-xs">tFIL</b>
          </p>
        </div>
        <div className=" sm:w-3/5 w-4/5 bg-white/20 py-4 sm:px-16 px-4  hover:shadow-2xl hover:shadow-white transition-all duration-150 ease-linear rounded-xl shadow-white shadow-xl  backdrop-blur-md ">
          <div className="flex flex-wrap-reverse mb-4 flex-col-reverse md:flex-row  items-center justify-between ">
            <button
              onClick={() => setContractStartupURI(sUri)}
              className="bg-[#100a25] text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
            >
              SetStartupURI
            </button>
            <input
              placeholder="ipfs://QmbmaHBjeaTvbSsfsdfd "
              onChange={(e) => handleSUri(e)}
              type="text"
              className=" text-center py-2 px-6 my-4 focus:scale-110 focus:outline-none transition-all duration-150 ease-linear placeholder:text-zinc-500 placeholder:text-xs text-sm sm:1/2 md:w-3/6 w-4/5 border-none rounded-md  "
            />
          </div>
          <div className="flex flex-wrap-reverse mb-4 flex-col-reverse md:flex-row  items-center justify-between">
            <button
              onClick={() => setContractInvestorURI(iUri)}
              className="bg-[#100a25] text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
            >
              SetInvestorURI
            </button>
            <input
              placeholder="ipfs://Qdfsd4BhjeaTvbS"
              onChange={(e) => handleIUri(e)}
              type="text"
              className=" text-center py-2 px-6 my-4 focus:scale-110 focus:outline-none transition-all duration-150 ease-linear placeholder:text-zinc-500 placeholder:text-xs text-sm sm:1/2 md:w-3/6 w-4/5 border-none rounded-md  "
            />
          </div>
          <div className="flex flex-wrap-reverse mb-4 flex-col-reverse md:flex-row  items-center justify-between">
            <button
              onClick={() => whitelistingAdd(wAddress)}
              className="bg-[#100a25] text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
            >
              WhitelistingAddr
            </button>
            <input
              placeholder="0xshgstcw4c4vf46v4fd4f64fad"
              onChange={(e) => handleWhiteListAdd(e)}
              type="text"
              className=" text-center py-2 px-6 my-4 focus:scale-110 focus:outline-none transition-all duration-150 ease-linear placeholder:text-zinc-500 placeholder:text-xs text-sm sm:1/2 md:w-3/6 w-4/5 border-none rounded-md  "
            />
          </div>
          <div className="flex flex-wrap-reverse mb-4 flex-col-reverse md:flex-row  items-center justify-between">
            <button
              onClick={() => changeInterestCore(iCore)}
              className="bg-[#100a25] text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
            >
              ChangeIntrestInCore
            </button>
            <input
              placeholder="5%"
              onChange={(e) => handleInterestCore(e)}
              type="number"
              className=" text-center py-2 px-6 my-4 focus:scale-110 focus:outline-none transition-all duration-150 ease-linear placeholder:text-zinc-500 placeholder:text-xs text-sm sm:1/2 md:w-3/6 w-4/5  border-none rounded-md  "
              min={0}
            />
          </div>
          <div className="flex flex-wrap-reverse mb-4 flex-col-reverse md:flex-row  items-center justify-between">
            <button
              onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#100a25] text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
            >
              ChangeCommissionInExchange
            </button>
            <input
              placeholder="20%"
              onChange={(e) => handleCommissionExchange(e)}
              type="number"
              className=" text-center py-2 px-6 my-4 focus:scale-110 focus:outline-none transition-all duration-150 ease-linear placeholder:text-zinc-500 placeholder:text-xs text-sm sm:1/2 md:w-3/6 w-4/5 border-none rounded-md  "
              min={0}
            />
          </div>
        </div>
        <div className="flex flex-wrap  md:flex-row  items-center justify-evenly gap-4 mt-8 font-vt text-xl sm:text-3xl my-4 px-8 w-full">
          <button
            onClick={() => withdrawMint()}
            className=" bg-red-500 text-white py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-150 ease-linear"
          >
            Withdraw_Earnings_Minting
          </button>
          <button
            onClick={() => withdrawFCore()}
            className=" bg-red-500 text-white py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-150 ease-linear"
          >
            Withdraw_Earnings_Core
          </button>
          <button
            onClick={() => withdrawExchange()}
            className=" bg-red-500 text-white py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-150 ease-linear"
          >
            Withdraw_Earnings_Exchange
          </button>
        </div>
      </div>
    </>
  );
}
