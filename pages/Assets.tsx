import React, { useEffect  , useState } from 'react'
import BoughtData from "../components/BoughtData";
import { useRouter } from 'next/router';
import { ExchangeContractAddress, ExchangeContractAbi } from "../constants";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";

export default function Assets() {
  const [assetArr  , setAssetArr] = useState<string[]>([])

  const router = useRouter();
  const {addr} = router?.query
  
   const provider = useProvider();
    const { data: signer } = useSigner();
    const { address, isConnected } = useAccount();
  
    const exchange = useContract({
      address: ExchangeContractAddress,
      abi: ExchangeContractAbi,
      signerOrProvider: signer || provider,
    });

  async function getallBoughtData( ){
    try {
      
      const tx  = await exchange?.getAllBoughtData();
      

      console.log(tx);
      setAssetArr(tx)

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getallBoughtData()
  }, [])
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden pt-20   bg-[url('../public/img/initial_img.jpg')] bg-cover bg-no-repeat  overflow-hidden  relative ">
     
     <div className="absolute top-24 left-4 z-20 ">

        <button
          
          className="rounded-3xl  z-20 bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center mx-4 py-1.5 px-3 text-sm "
          >
          <img src="img/assetStarts.png" alt="img" className="sm:w-8 w-6 mr-2" />{" "}
          <span>Startups Invested</span>
        </button>
    <button
         
         className="rounded-3xl z-20  bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 my-4 mx-4 px-2 text-sm  "
         >
          <img src="img/docs.png" alt="img" className="sm:w-8 w-6 mr-2" />{" "}
          <span>Bought Data</span>
        </button>
          </div>

        <div className='w-full  pt-10 flex items-center justify-start flex-col '>
             {assetArr.map((itm : string , idx : number ) => 
             <div key={idx} className=' w-1/2 mx-auto'>
              <BoughtData cid={itm}/>
             </div>
             )}
        </div> 
    </div>
  )
}
