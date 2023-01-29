import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Navbar() {

  const [width, setWidth] = useState<number >(200);
  const [isActive, setIsActive] = useState<boolean>(false);
  const sm: number = 648;


  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      setWidth(width);
      return width
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  useEffect(()=>{

    function handleinitialResize() {
      const { innerWidth: width } = window;
     
      return width
    }

    setWidth(handleinitialResize())
  },[])

  
  

  return (

    <nav className="z-80 w-full bg-[#070a14]   mx-auto  p-0 text-white font-vt text-lg flex items-start justify-center transition-all duration-300 ease-linear fixed top-0 ">
     
      <div className="z-80  cursor-pointer flex items-center mt-3 mx-3 justify-center rounded-md ">
       <span>Hatchery</span> 
      </div>


      <div
        className={`h-full py-2 ml-auto   flex items-center gap-6 px-2 justify-end  flex-col sm:flex-row `}
      >
        {width < sm    && (
          <div
            className="z-80 w-full flex items-start justify-center cursor-pointer transition-all duration-300 ease-linear p-1 rounded-full"
            onClick={() => setIsActive(prev => !prev)}
          >
            {!isActive  ? (
              <img src="/img/menu.png" alt="menu" width={"38"} className={`z-80 hover:rotate-45 duration-100 transition-all ease-linear`} />
            ) : (
              <img src="/img/close.png" alt="menu" width={"38"} className={`z-80 hover:rotate-90 duration-100 transition-all ease-linear`} />
            )}
          </div>
        )}

        {isActive || width > sm ? (
          <>
            <span className="z-80 cursor-pointer hover:bg-[#ffef0e] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4 rounded-md   ">
            <Link href={"/"}>
             Home
            </Link>
            </span>
            <span className="z-80 cursor-pointer hover:bg-[#ffef0e] hover:text-black transition-all duration-200 ease-linear  bg-transparent  py-1 px-4  rounded-md   ">
            <Link href={"/BuyNFT"}>

             Buy Now
            </Link>
            </span>
            <span className="z-80 cursor-pointer hover:bg-[#ffef0e] hover:text-black transition-all duration-200 ease-linear bg-transparent  py-1 px-4   rounded-md   ">
            <Link href={"/"}>

             Register
            </Link>
            </span>
          
          </>
        ) : null}
      </div>
    
    </nav>
  );
}