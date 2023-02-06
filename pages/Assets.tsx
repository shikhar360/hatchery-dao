import React, { useEffect  , useState } from 'react'
import BoughtData from "../components/BoughtData";
import { useRouter } from 'next/router';
import { ExchangeContractAddress, ExchangeContractAbi , CoreContractAddress, CoreContractAbi } from "../constants";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";
import Head from 'next/head';

interface Mystarts {
  name: string;
  description: string;
  tags: string;
  owner : string;
  amt : string
  votes : string
  imgHash : string
}

export default function Assets() {
  const [toggle , setToggle] = useState<boolean>(false)
  const [assetArr  , setAssetArr] = useState<string[]>([])
  const [ invested , setInvested] = useState<number>(0)
  const [ investedStartups , setInvestedStartups] = useState<string[]>([])
  
   const [ allStarts , setAllStarts ] = useState<Mystarts[]>([{
    name: "",
    description: "",
    tags: '',
    owner : '',
    amt : '',
    votes : '',
    imgHash : ''
   }])
  
   const provider = useProvider();
    const { data: signer } = useSigner();
    const { address, isConnected } = useAccount();
    
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

  async function getallBoughtData( ){
    try {
      
      const tx  = await exchange?.getAllBoughtData();
      
      
      // console.log(tx);
      setAssetArr(tx)
      setToggle(false)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getallBoughtData()
  }, [])
  

  async function handleStartupsInvested(){
    try {
      setToggle(true)
      const myStartupTx = await core?.getListOfStartups();
      
      let allStartups : Mystarts[] = [];

      myStartupTx.forEach((itm : any) => {
        if (itm.isActive){
          allStartups.push({
            name: itm.name,
            description: itm.description,
            tags: itm.tagline  ,
            owner : itm.ownerAddress,
            amt : itm.amount.toString(),
            votes : itm.upVoteCount.toString(),
            imgHash : itm.imgHash,
          });
        }
       
      });
     
      // getImgVideo(allStarts.owner);
      setAllStarts(allStartups);


      const investedIdx = await core?.getTotalInvested();
      // console.log(investedIdx.toNumber());
      const number = investedIdx.toString();
      setInvested(+number)

      const investedStartups = await core?.getInvestedStartupsIdx();
      const idxArr : string[] = [];
      investedStartups.forEach((itm : any) => {
        idxArr.push(itm.toString())
      })
      console.log(idxArr);
      setInvestedStartups(idxArr)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="w-full min-h-screen overflow-x-hidden sm:pt-28 md:pt-24 pt-40   bg-[url('/img/initial_img.jpg')] bg-cover bg-no-repeat  overflow-hidden  relative ">
     <Head>
        <title>Your Assets - HatcheryDao</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
     <div className="absolute top-24 left-2 z-20 ">

        <button
          onClick={() => handleStartupsInvested()}
          className="rounded-3xl  z-20 bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center mx-4 py-1.5 px-3 text-sm "
          >
          <img src="img/assetStarts.png" alt="img" className="sm:w-8 w-6 mr-2" />{" "}
          <span>Startups Invested</span>
        </button>
    <button
         onClick={getallBoughtData}
         className="rounded-3xl z-20  bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 my-4 mx-4 px-2 text-sm  "
         >
          <img src="img/docs.png" alt="img" className="sm:w-8 w-6 mr-2" />{" "}
          <span>Bought Data</span>
        </button>
          </div>

        {!toggle && <div className='w-full  pt-10 flex items-center justify-start flex-col '>
          {assetArr[0] ? null :<h1 className='text-2xl font-bold text-white pt-40 flex flex-col items-center justify-center'> You havent Bought any Data yet
          <img src="/img/doubt.png" alt="images" />
          </h1> }
             {assetArr.map((itm : string , idx : number ) => 
             <div key={idx} className=' w-1/2 mx-auto mb-3'>
              <BoughtData cid={itm}/>
             </div>
             )}
        </div> }


        {toggle && investedStartups.map((itm : string , idx : number)=>
          <div key={idx} className="md:w-2/4 sm:w-2/3 w-4/5 mx-auto h-40 pb-3 bg-white/10  transition-all duration-300 ease-linear mb-4 backdrop-blur-md flex items-start justify-start  rounded-xl font-jose overflow-hidden ">
          <img
            src={allStarts[+itm].imgHash === "initial_img" ? "img/initial_img.jpg" : `https://ipfs.io/ipfs/${allStarts[+itm].imgHash}`}
            alt="header" 
            className="h-40 w-48  "
            />
          <div className=" w-full flex flex-col">

            <div className='w-full flex  sm:flex-row flex-col mt-3 sm:mt-0 items-center justify-start'>

           <p className='text-white font-semibold pl-2 mr-2 pt-2 text-md sm:text-2xl'>{allStarts[+itm].name}<img
            src='img/star.png'
            alt="header"
            className=" inline-block h-3 w-3  "
            />
          <span className='text-xs mx-0.5'>({allStarts[+itm].votes})</span> </p>
           
         
          </div>
          <p className=" text-base tracking-widest ml-2 sm:block hidden font-semibold">Tagline :</p>
          <div className=" text-sm  px-2  py-2   w-full overflow-hidden ">
            <p className='text-clip h-16  overflow-scroll scrollbar-hide'>
              {allStarts[+itm].tags}
              </p> 
              </div>
          </div>
       </div>
        ) }
    </div>
  )
}
