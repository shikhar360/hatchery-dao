import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link"

interface NewPost {
  name: string;
  tagline: string;
  amount: number | undefined;
  descrip: string;
}

export default function EditPost() {

  const [name, setName] = useState<string>();
  const [tagline, setTagline] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [descrp, setDescrip] = useState<string>();
  const [img, setImg] = useState<Blob>();

  const [post , setPost] = useState<NewPost>({
    name: "",
    tagline: "",
    amount: undefined,
    descrip: ""
  });
  
  function handlePost(e: any) {
    
    setPost(prev => {
      return {
        ...prev,
        [e.target?.name]: e.target?.value
      }
     
    });
  }
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    
    setName(e.target.value);
  }
  function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTagline(e.target.value);
  }
  function handleAmt(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(+e.target.value);
  }
  function handleDesc(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescrip(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if( e.target.files === null ) return;
    setImg(e.target.files[0]);
  }

  const router = useRouter();
  const activateEdit = router.query.name;
  console.log(activateEdit);

  // const { address, isConnected } = useAccount();
  // const provider = useProvider();
  // const { data: signer } = useSigner();
  // const contract = useContract({
  //   addressOrName: contractAddress,
  //   contractInterface: abi,
  //   signerOrProvider: signer || provider,
  // });

  async function settingDates() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function settingNameDesc() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function submitPost(val : NewPost) {
    try {
      console.log(val);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full font-jose bg-[#100a25]  bg-cover bg-no-repeat sm:pt-20 py-20 sm:pb-44  relative">
      <Head>
        <title> {activateEdit === "POST_NEW" ? "Post" : "Edit" } Startup</title>
        <meta name="description" content="Created with ❤ by SHIKHAR" />
      </Head>

      <div className="sm:w-60 w-48 h-48 sm:h-60 animate-bounceb delay-1000 rounded-full bg-gradient-to-br to-[#9a75ff] from-[#3b296d] absolute md:top-16  md:left-48  sm:top-12 sm:left-28  top-28 left-8 z-10 "></div>
      <div className="sm:w-60 w-48 h-48 sm:h-60 animate-bounceb rounded-full bg-gradient-to-tl to-[#9a75ff] from-[#3b296d] absolute  md:bottom-32 md:right-48 sm:bottom-24 sm:right-28 bottom-20 right-12 z-10"></div>

      <div className="flex flex-col text-white sm:w-6/12 w-11/12 z-30  bg-white/10 backdrop-blur-lg rounded-2xl items-start justify-start gap-2 my-auto  ">


        <div className="flex items-center justify-start  w-full z-30 ">
          {activateEdit !== "POST_NEW" ? <span className=" z-30 text-2xl w-5/6 text-start sm:text-3xl mx-8 mt-4  ">
           <b className="text-base">Edit - </b> {activateEdit }
          </span> : <span className=" z-30 text-2xl w-5/6 text-start sm:text-3xl mx-8 mt-4  ">
           <b className="text-base">Create Post - </b> New Startup
          </span> }

          <span className="cursor-pointer mt-4 px-8 ">
          <Link
            href='/PostStartup'
           >
              <img
                src={`img/back.png`}
                alt="header"
                className="w-6 ml-4 cursor-pointer"
                // onClick={() => alert("i am touched")}
              />
              </Link>
          </span>
        </div>


        <div
          className={`z-30 flex w-full flex-col items-start  justify-center sm:text-xl text-sm`}
        >
        <span className="text-sm mx-8 mb-3 text-gray-400 z-30 ">
          {activateEdit === "POST_NEW" ? "Let's share some details about your Startup":"Mutate your Startup details"}
        </span>
          {(activateEdit === "NAME" || activateEdit === "POST_NEW"  ) && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              
              <input
              name="name"
                type="text"
                onChange={activateEdit === "POST_NEW" ? handlePost :handleName}
                className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                placeholder="A Million Dollar Startup"
              />


            {activateEdit !== "POST_NEW" && <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>}
              </div>
          </>
          )}


          {(activateEdit === "TAGLINE" || activateEdit === "POST_NEW" ) && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              
              <input
              name="tagline"
                type="text"
                onChange={activateEdit === "POST_NEW" ? handlePost :handleTag}
                className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                placeholder="Delivering values to Millions"
              />
            {activateEdit !== "POST_NEW" && <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>}
              </div>
          </>
          )}

          {(activateEdit === "AMOUNT" || activateEdit === "POST_NEW" ) && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              
              <input
              name="amount"
                type="number"
                min={0}
                onChange={activateEdit === "POST_NEW" ? handlePost :handleAmt}
                className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                placeholder="$80,000"
              />
            {activateEdit !== "POST_NEW" && <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>}
              </div>
          </>
          )}

          {(activateEdit === "DESCRIPTION" || activateEdit === "POST_NEW" ) && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              
              <textarea
              name="descrip"
                onChange={activateEdit === "POST_NEW" ? handlePost :handleDesc}
                className="text-black text-start text-sm border resize-none h-80 py-4 w-full border-zinc-300 px-8  rounded-sm  "
                placeholder="A Detailed Description about Startup and its vision and mission."
              />
            {activateEdit !== "POST_NEW" && <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>}
              </div>
          </>
          )}
          {(activateEdit === "IMAGE") && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              

            <div className="flex items-center justify-center w-full">
               <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                   </div>
                   <input id="dropzone-file" type="file" className="hidden" onChange={handleImage} />
               </label>
              </div> 
              {/* <input
                type="text"
                onChange={handleImage}
                className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                placeholder="You Ban"
              /> */}
            <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>
              </div>
          </>
          )}
          {(activateEdit === "VIDEO") && (
          <>
            {/* <span className=" text-lg mx-8 ">Name</span> */}
            <div className=" z-30 py-3 flex flex-col flex-wrap items-start  gap-2 w-full px-8 ">
              
              <input
                type="text"
                onChange={handleName}
                className="text-black text-start text-sm border w-full border-zinc-300 px-8  rounded-sm h-8 "
                placeholder="A Million Dollar Startup"
              />
            <button
              // onClick={() => changeCommissionExchange(cExchange)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>
              </div>
          </>
          )}

           {activateEdit === "POST_NEW" && <button
              onClick={() => submitPost(post)}
              className="bg-[#2f1e6b] text-white py-1 px-4 w-3/4 mx-auto my-3 hover:scale-110 hover:shadow-xl hover:shadow-violet-800 rounded-xl transition-all duration-150 ease-linear"
              >
              Save
            </button>}
        </div>
      </div>
    </div>
  );
}
