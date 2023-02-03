import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";



export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [addr, setAddr] = useState<string>('')
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected){
      setAddr(address as string)
    }
  }, [isConnected])

  return (

    <nav className=" z-50 w-full bg-[#070a14]     p-0 text-white font-vt text-lg flex items-start justify-between transition-all duration-300 ease-linear fixed top-0 ">
     

      <div className="z-80 sm:w-72 cursor-pointer flex  items-center mt-3 px-3 justify-center rounded-md ">
       <span>Hatchery</span> 
      </div>

      <div
        className={`  py-2   flex items-end  justify-end sm:justify-between md:w-full flex-col sm:flex-row `}
      >
        
          <div
            className="z-80  px-6 flex items-center justify-center cursor-pointer transition-all duration-300 ease-linear p-1 rounded-full sm:hidden "
            onClick={() => setIsActive(!isActive)}
          >
            {!isActive  ? (
              <img src="/img/menu.png" alt="menu" width={"38"} className={` duration-100 transition-all ease-linear`} />
            ) : (
              <img src="/img/close.png" alt="menu" width={"38"} className={`z-80 hover:rotate-90 duration-100 transition-all ease-linear`} />
            )}
          </div>
       

        
          <div className={` ${isActive ? "flex flex-col gap-2 items-center justify-center ":" hidden sm:flex sm:items-center sm:justify-end  sm:mr-auto gap-2 mx-auto text-xs md:text-sm lg:text-base"}`}>

            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={"/"}>
             Home
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={{
               pathname: "/Assets", 
                query: { addr: addr }
              }}>
             Assets
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={"/AllStartups"}>
            AllStartups
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={{pathname:"/PostStartup",
              //  query : {}
              }}>
            Post & Edit 
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={"/DataExchange"}>
            Data Exchange
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#c176ff] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md text-center   ">
            <Link href={{
               pathname: "/PitchDeckPublic", 
              }}>
             Pitch Deck
            </Link>
            </p>
          
          </div>

            <div className={` ${isActive ? "flex flex-col gap-2 my-4 ":" hidden sm:flex sm:items-center sm:justify-center  gap-2 my-auto md:pr-4 pr-6"}`}>

            <p className="z-80 cursor-pointer bg-[#c176ff] hover:bg-[#ffad15] text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4  rounded-md text-center   ">
            <Link href={"/BuyNFT"}>

             Buy NFT
            </Link>
            </p>
            <p className="z-80 cursor-pointer hover:bg-[#9d4edd] hover:text-black transition-all duration-200 ease-linear bg-transparent   rounded-md text-center   ">
            </p>
            <ConnectKitButton/>
            </div>  
       
      </div>
    
    </nav>
  );
}