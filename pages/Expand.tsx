import React , {useEffect, useState} from 'react'
import Link from 'next/link'
import { Player} from "@livepeer/react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { CoreContractAddress, CoreContractAbi, HatcheryDaoAddress, HatcheryDaoAbi } from "../constants";
function getKeys() {
  return process.env.NEXT_PUBLIC_STUDIO_API_KEY;
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: getKeys() as string,
  }),
});

export default function Expand() {
  return (
    <div className="w-full">
      <LivepeerConfig client={livepeerClient}>
        <ExpandExport />
      </LivepeerConfig>
    </div>
  );
}

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import { ethers } from "ethers";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";
import { stringify } from 'querystring';
import Head from 'next/head';

interface IvidImg{
  img : string;
  vid : string;
}

function ExpandExport() {

  const router = useRouter();
  const {name , descrip , tags , owner , amt , votes , imgHash , vidHash} = router?.query
  console.log(name , descrip , tags , owner , amt);


  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const core = useContract({
    address: CoreContractAddress,
    abi: CoreContractAbi,
    signerOrProvider: signer || provider,
  });
 
  const [ imgVid , setImgVid] = useState<IvidImg>({
    img : "",
    vid : ""
  })
 
  
  
  const [invest , setInvest] = React.useState<number>()

  function handleInvest(e : React.ChangeEvent<HTMLInputElement>){
    setInvest(Number(e.target.value))
  }
  // console.log(invest);

  const sbt = useContract({
    address: HatcheryDaoAddress,
    abi: HatcheryDaoAbi,
    signerOrProvider: signer || provider,
  });
  
  const { data: userBal } = useBalance({
    address: address,
    watch: true,
  });
  


  async function investStartup(val : number){
    try {
      
    
      const balance = await userBal;

      console.log(balance)
      if (balance === undefined) return
      if(+(balance.formatted) < val){
        toast.warn("Insufficient Balance")
        return;
      }
      
      
      const checkI = await sbt?.isInvestor(address);
     
       if (!(checkI)){
        toast.warn("BUY INVESTOR NFT FIRST ")
        return;
       }

      const investTx = await core?.investAmount(owner , {value : ethers.utils.parseEther(val.toString())})
      console.log(investTx);
      toast.success("Investing .........")
      await investTx?.wait()
      toast.success("Invested Successfully")

    } catch (err) {
      toast.error("Investment Failed")
    }
  }


  return (
    <>
    <div className=" w-full min-h-screen overflow-x-hidden flex  flex-col bg-[url('/img/grad3.jpg')]  bg-cover bg-no-repeat items-start gap-8 pt-20 justify-start  ">
      <ToastContainer />
      <Head>
        <title>HatcheryDao</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
      
      <div className="w-full flex items-center justify-center">
        {name && <div className="sm:w-2/4 w-4/5  h-5/6 bg-white/10  transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col items-start justify-center rounded-xl font-jose relative mb-8  ">
          <img
            src={imgHash === "initial_img" ? "/img/initial_img.jpg" : `https://ipfs.io/ipfs/${imgHash}`}
            alt="header"
            className="h-60 w-full rounded-t-xl "
          />
          

          <div className=" w-9/12 flex items-center mt-4 ml-4 text-white">
            <span className="text-2xl font-semibold">{name}</span>
            <div className="ml-2">
              <img
            src='img/star.png'
            alt="header"
            className=" inline-block h-3 w-3  "
            />
          <span className='text-xs mx-0.5'>({votes})</span> 
          </div>
            <Link
            href={{
              pathname: "/PitchDeck",
              query: { data : owner },
            }}
          className="rounded-md bg-[#2176ff]  hover:shadow-xl  hover:scale-110 hover:shadow-blue-400 transition-all duration-200 ease-linear flex items-center justify-center py-0.5 px-2 ml-4 "
          // onClick={()=>getImgVideo(owner as string)}
           >
          <img src="img/camera.png" alt="img" className="sm:w-4 w-3 mr-2" />{" "}
          <span className="text-sm">Huddle Meet </span>
          </Link>
          </div>

          <div className="flex items-center justify-between gap-8 ">
            <span className="text-base mt-3 ml-4 text-white  ">
              Seeking - <b className="font-bold text-xl">{amt} FIL</b>
            </span>
           
          </div>

          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex items-center  font-semibold justify-start text-base tracking-widest w-1/2  ">
              Tagline
            
            </span>
            <p className=" mt-3 mx-4 text-zinc-300 flex-wrap">
             {tags}
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Description
             
            </span>
            <p className=" mt-3 mx-4 flex-wrap text-zinc-300">
             {descrip} 
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-center  text-white w-full  ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
             Video
             
            </span>
            <div className="w-full my-4 flex items-center justify-center">
             
              <Player
                title={"Video"}
                playbackId={vidHash === "NOT_UPLOADED_YET" ? "aaf8n564dj8nwh19" : vidHash as string}
                // src={url}
                autoPlay
                muted
                autoUrlUpload={{
                  fallback: true,
                  ipfsGateway: "https://w3s.link",
                }}
              />
            </div>

          </div>
          
           <div className="py-2 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
                <input
                  name="amount"
                  type="number"
                  onChange={
                  handleInvest
                  }
                  className="text-black text-center text-sm border w-full border-zinc-300 px-4  rounded-sm h-8 "
                  placeholder="1 FIL - $Max FIL"
                />

                
                  <button
                    onClick={() => investStartup(invest as number)}
                    className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-2 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
                  >
                   Invest
                  </button>
                
              </div>
         
        </div>}
      </div>
    </div>
    </>
  )
}
