import React , {useEffect} from 'react'
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

function ExpandExport() {

  const router = useRouter();
  const data1 = router.query.data!;
  console.log(data1);
  // if (data1) {
//  const obj  = ""
    const obj = JSON.parse(data1 as string);
  // }

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const core = useContract({
    address: CoreContractAddress,
    abi: CoreContractAbi,
    signerOrProvider: signer || provider,
  });
 
  
  async function getImgVideo(addr : string) {
    try {
      const imgTx = await core?.getImageLink(addr);
      console.log(imgTx);
     
      const vidTx = await core?.getVideoHash(addr)
      console.log(vidTx);
      
    } catch (err) {
     
      console.log("Recommended to upload a Video ;)");
    }
  }
 
  useEffect(()=>{
    if(obj.owner){
      getImgVideo(obj.owner)
    }
  },[])
  
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


  async function investStartup(val : number){
    try {
    
      
      const checkI = await sbt?.isInvestor(address);
     
       if (!(checkI)){
        toast.warn("BUY INVESTOR NFT FIRST ")
        return;
       }

      const investTx = await core?.investAmount(obj.owner , {value : ethers.utils.parseEther(val.toString())})
      console.log(investTx);
      toast.success("Investing .........")
      await investTx?.wait()
      toast.success("Invested Successfully")
      
    } catch (err) {
      toast.error("Investment Failed")
    }
  }


  return (
    <div className=" w-full min-h-screen overflow-x-hidden flex  flex-col bg-[url('../public/img/grad3.jpg')]  bg-cover bg-no-repeat items-start gap-8 pt-20 justify-start  ">
      <ToastContainer />
      <div className="w-full flex items-center justify-center">
        {obj && <div className="sm:w-2/4 w-4/5  h-5/6 bg-white/10  transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col items-start justify-center rounded-xl font-jose relative mb-8  ">
          <img
            src={`img/initial_img.jpg`}
            alt="header"
            className="h-60 w-full rounded-t-xl "
          />
          

          <div className=" w-9/12 flex items-center mt-4 ml-4 text-white">
            <span className="text-2xl font-semibold">{obj.name}</span>
           
          </div>

          <div className="flex items-center justify-between gap-8 ">
            <span className="text-base mt-3 ml-4 text-white  ">
              Seeking - <b className="font-bold text-xl">${obj.amt}</b>
            </span>
           
          </div>

          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex items-center  font-semibold justify-start text-base tracking-widest w-1/2  ">
              Tagline
            
            </span>
            <p className=" mt-3 mx-4 text-zinc-300 flex-wrap">
             {obj.tags}
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Description
             
            </span>
            <p className=" mt-3 mx-4 flex-wrap text-zinc-300">
             {obj.description} 
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-center  text-white w-full  ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
             Video
             
            </span>
            <div className="w-full my-4 flex items-center justify-center">
              {/* <video className="h-60 " autoPlay controls>
                <source src="/img/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              {/* <Player
                title={"Video"}
                playbackId={video.current}
                // src={url}
                autoPlay
                muted
                autoUrlUpload={{
                  fallback: true,
                  ipfsGateway: "https://w3s.link",
                }}
              /> */}
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
                  placeholder="$1-$Max"
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
  )
}
