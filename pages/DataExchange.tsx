import React, { useEffect, useState } from "react";
import DataExForm from "../components/DataExForm";

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
import { ethers } from "ethers";
import Head from "next/head";
  
  interface IExData{
    name : string;
    description : string;
    amount : string;
    owner : string;
    hash : string;
    id : string;
  }

export default function DataExchange() {

  const [data , setData]= useState<IExData[]>([{
    name : '',
    description : '',
    amount : '',
    owner : '',
    hash : "",
    id : ''
  }])
  
    const provider = useProvider();
    const { data: signer } = useSigner();
    const { address, isConnected } = useAccount();
  
    const exchange = useContract({
      address: ExchangeContractAddress,
      abi: ExchangeContractAbi,
      signerOrProvider: signer || provider,
    });

 console.log(data);
  async function getMyDataTx() {
    try {
      const myExDataTx = await exchange?.getAllListing();
      // console.log(myStartupTx);
      console.log(myExDataTx);

      let allDataTx : IExData[] = [];

      myExDataTx.forEach((itm : any) => {

        allDataTx.push({
          name: itm.name,
          description: itm.details,
          amount: itm.amount.toString(),
          owner : itm.dataOwner,
          hash : itm.hash,
          id : itm.d_Id.toString()
        });
      });
     
      // getImgVideo(allStarts.owner);
      setData(allDataTx);

    } catch (err) {
      console.log(err);
    }
  }
  

  useEffect(()=>{
    getMyDataTx()
   
  },[])

  async function buyDataEx(id : number , amount : number) {
    try {
     
      const amountNum = amount / 10**18 
      console.log(amountNum  , id )

      const buyDataExTx = await exchange?.buyData( +id , {
        value: ethers.utils.parseEther(amountNum.toString()),
      });


      toast("Sendig money to Owner")
      await buyDataExTx?.wait()
      toast.success("Data bought successfully")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden   relative bg-[url('/img/grad2.jpg')] bg-cover bg-no-repeat  overflow-hidden ">
      <Head>
        <title>Data Exchange</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
      <ToastContainer />
      <DataExForm />
      <div  className="w-full p-20 sm:pt-24 md:p-20 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-max items-center z-10 h-screen gap-12 overflow-scroll scrollbar-hide">


     { data.map(( itm : any  , idx : number) => 

    <div key={idx} className=" w-full bg-white/10  transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col items-start justify-center rounded-md font-jose relative overflow-hidden text-white  ">
    <img src={"/img/lock.jpg"} alt="header" className="sm:h-48 h-48 w-full  " />
    <div className="w-full flex flex-col px-3">
      <p className=" text-md font-semibold pt-3 truncate">{itm.name}</p>
      <p className=" text-lg font-bold pt-1 ">{itm.amount / 10**18} FIL</p>
      <p className=" text-xs font-bold text-stone-200 pt-0.5 truncate">
        {itm.owner}
      </p>
      <p className=" text-sm text-zinc-400 pt-2  h-24 overflow-scroll overflow-x-hidden
      scrollbar-hide">
       {itm.description}
      </p>
      <button
        onClick={() => buyDataEx(itm.id , +itm.amount )}
        className="bg-[#070a14] text-white py-1 px-4 w-3/4 mx-auto my-2 hover:scale-105 hover:shadow-md hover:shadow-[#100a25] rounded-md transition-all duration-150 ease-linear mb-4"
      >
        BUY
      </button>
    </div>

  </div>

  
     )}
      

      
      </div>
    </div>
  );
}
