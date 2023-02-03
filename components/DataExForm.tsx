import React ,{useState} from 'react'
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
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


interface IData{
  name : string;
  description : string;
  amount : string;
}
export default function DataExForm() {
  const [toggle, setToggle] = useState(false)
  const [file , setFile ] = useState<any>()
  const [data, setData] = useState<IData>({
    name: '',
    description: '',
    amount: '',
  })
  

  function handleFileChange (e : React.ChangeEvent<HTMLInputElement>){
    setFile(e)

  }

  function handleChange (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    setData((prev : any)=> {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  //-------------------------------------------------------------------

  
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const exchange = useContract({
    address: ExchangeContractAddress,
    abi: ExchangeContractAbi,
    signerOrProvider: signer || provider,
  });

  const encryptionSignature = async() =>{
    const messageRequested = (await lighthouse.getAuthMessage(address as string)).data.message;
    const signedMessage = await signer?.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

  
  const progressCallback = (progressData: any) => {
    let percentageDone: any = (
      progressData.total / progressData.uploaded
    )?.toFixed(2);
    let percentage: any = 100 - percentageDone;
    console.log(percentage);
  };


  async function uploadDataTx (val : IData  , file : any){
    if ( !(val.name && val.description && val.amount && file))return 

    console.log(val , file);

    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      file,
      sig.publicKey as string,
      process.env.NEXT_PUBLIC_LIGHTHOUSE as string,
      sig.signedMessage as string,
      progressCallback
    );
   
    console.log(response.data.Hash);
    const uploadHash = response.data.Hash;
    toast.success("Encrypted File uploaded ");
    toast("Sign Transaction to Store")
    const amount = ethers.utils.parseEther(val.amount)
    console.log(+amount);
    const tx = await exchange?.addDataListing(val.name , val.description , +amount , uploadHash)
    toast("Storing>>>>>>>>>")
    await tx?.wait()
    toast.success("Stored Successful")

  }
  

  return (
    <div className={`flex flex-col gap-3 absolute top-24 md:w-2/5 sm:w-2/3 w-10/12 left-0 bg-white/10 backdrop-blur-xl z-20 text-white px-4 py-6  ${!toggle ? "-translate-x-full" : null} transition-all duration-200 ease-linear`}>
      
      <p className='text-xl my-0.5 font-jose '>Lets share some details</p>
          <p className='text-sm font-bold tracking-wider '> Name</p>

           <img
            onClick={()=>setToggle(prev => !prev)}
            src={ !toggle ? `img/openForm.png` : `img/closeForm.png`}
            alt="header" 
            className="w-16 py-2 px-4 absolute -right-20 -top-4 m-4 rounded bg-white  "
            />
             <input
                  name="name"
                  type="text"
                  onChange={
                    handleChange
                  }
                  className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                  placeholder="Profit Statement - 2023"
                />
                    <p className='text-sm font-bold tracking-wider '> Description</p>

                 <textarea
                  name="description"
                  onChange={
                   handleChange
                  }
                  className="text-black text-start text-sm border resize-none h-40 py-4 w-full border-zinc-300 px-8  rounded-sm  "
                  placeholder="A Detailed Description about the Data ."
                />
                  <p className='text-sm font-bold tracking-wider text-lime-500'>Amount</p>
             <input
                 
                  name="amount"
                  type="number"
                  onChange={
                   handleChange
                  }
                  className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                  placeholder="Ask - 0.1 tFIL"
                />
                 <label
                  className="block  text-sm font-medium dark:text-white"
                  htmlFor="file_input"
                >
                  Upload File
                </label>
                <input
                    accept="application/pdf , text/plain"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                />
                   <button
                    onClick={() => uploadDataTx(data , file)}
                    className="bg-[#070a14] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-purple-700 rounded-xl transition-all duration-150 ease-linear"
                  >
                    Encrypt & Upload
                  </button>
    </div>
  )
}
