import React from "react";
import { HatcheryDaoAbi, HatcheryDaoAddress } from "../constants";
import { CoreContractAddress, CoreContractAbi } from "../constants";
import { ExchangeContractAddress, ExchangeContractAbi } from "../constants";

import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OWNERS_ONLY() {
  const [sUri, setSUri] = React.useState<string>("");
  const [iUri, setIUri] = React.useState<string>("");
  const [wAddress, setWAddress] = React.useState<string>("");
  const [iCore, setICore] = React.useState<number>();
  const [cExchange, setCExchange] = React.useState<number>();

  const provider = useProvider();
  const { data: signer } = useSigner();

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

  const { address, isConnected } = useAccount();

  function handleSUri(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setSUri(e.target.value);
  }
  function handleIUri(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setIUri(e.target.value);
  }

  function handleWhiteListAdd(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setWAddress(e.target.value);
  }
  function handleInterestCore(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    if (+e.target.value < 0) return;
    setICore(+e.target.value);
  }
  function handleCommissionExchange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(+e.target.value);
    if (+e.target.value < 0) return;
    setCExchange(+e.target.value);
  }
  // /-------------------------------------------------------------------------------- 
  // /-------------------------------------------------------------------------------- 
  // /-------------------------------------------------------------------------------- 
  //  Contract Functions
  // /--------------------------------------------------------------------------------

  async function setContractStartupURI( val: string) {
    try{
      
      const tx = await sbt?.setStartupURI(val);
      toast("Waiting for URI to get settled")
      await tx?.wait();
      toast("Startup URI has been set")

    }catch(err){
      console.log(err)
      toast.err("")
    }
    
  }


  return (
    <>
    <div className=" bg-[#100a25] min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <ToastContainer />
      <h1 className="font-vt sm:text-6xl text-3xl mt-16 text-center px-8  text-white ">
        Only Owners area : You must be an Owner to access
      </h1>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-between ">
        <input
          placeholder="STRING : SET_STARTUP_URI"
          onChange={(e) => handleSUri(e)}
          type="text"
          className=" text-center py-1 px-3 my-4 placeholder:text-zinc-500 border-2  border-black rounded-xl  "
        />
        <button className="bg-amber-500 text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-amber-600 rounded-xl transition-all duration-300 ease-linear">
          SetStartupURI
        </button>
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-between">
        <input
          placeholder="STRING : SET_INVESTOR_URI"
          onChange={(e) => handleIUri(e)}
          type="text"
          className=" text-center py-1 px-3 my-4 placeholder:text-zinc-500 border-2  border-black rounded-xl  "
          />
        <button className="bg-amber-500 text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-amber-600 rounded-xl transition-all duration-300 ease-linear">
          SetInvestorURI
        </button>
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-between">
        <input
          placeholder="ADDRESS : WhiteList_Address"
          onChange={(e) => handleWhiteListAdd(e)}
          type="text"
          className=" text-center py-1 px-3 my-4 placeholder:text-zinc-500 border-2  border-black rounded-xl  "
          />
        <button className="bg-amber-500 text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-amber-600 rounded-xl transition-all duration-300 ease-linear">
          WhitelistingAddr
        </button>
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-between">
        <input
          placeholder="UINT : Change_Interest_Core"
          onChange={(e) => handleInterestCore(e)}
          type="number"
          className=" text-center py-1 px-3 my-4 placeholder:text-zinc-500 border-2  border-black rounded-xl  "
          min={0}
          />
        <button className="bg-amber-500 text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-amber-600 rounded-xl transition-all duration-300 ease-linear">
          ChangeIntrestInCore
        </button>
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-between">
        <input
          placeholder="UINT : Change_CommissionRate"
          onChange={(e) => handleCommissionExchange(e)}
          type="number"
          className=" text-center py-1 px-3 my-4 placeholder:text-zinc-500 border-2  border-black rounded-xl  "
          min={0}
          />
        <button className="bg-amber-500 text-white py-1 px-4 hover:scale-110 hover:shadow-xl hover:shadow-amber-600 rounded-xl transition-all duration-300 ease-linear">
          ChangeCommissionInExchange
        </button>
      </div>
      <div className="flex flex-wrap flex-col sm:flex-row gap-8 items-center justify-evenly font-vt text-xl sm:text-3xl my-4 px-8 w-full">
        <button className=" bg-[#ffb3c1] py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-300 ease-linear">
          Withdraw_Earnings_Minting
        </button>
        <button className=" bg-[#ffb3c1] py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-300 ease-linear">
          Withdraw_Earnings_Core
        </button>
        <button className=" bg-[#ffb3c1] py-2 px-4 rounded-2xl hover:scale-110 hover:shadow-xl hover:shadow-red-400 transition-all duration-300 ease-linear">
          Withdraw_Earnings_Exchange
        </button>
      </div>
    </div>
    </>
  );
}
