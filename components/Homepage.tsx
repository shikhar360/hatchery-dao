import React ,{useEffect} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";


export default dynamic (() => Promise.resolve(Homepage), {ssr: false})

const Homepage=()=> {


  function handleContact(e: string) {
    window.open(e);
  }
  
  

   useEffect(() => {
 
   }, []);
  return (
    <>
      <section className=" bg-[#100a25] min-h-screen font-mono w-full text-white flex items-center justify-center flex-col overflow-hidden ">
        <div className="flex flex-col items-center justify-center sm:mt-16 mt-12  w-full ">
          <p className="font-jose text-xs sm:text-base">Welcome to the</p>
          <p className="font-vt sm:text-9xl text-7xl  text-[#ff9e00]">
            HatcheryDAO
          </p>
          <p className="font-jose text-xs sm:text-base">
            The one stop shop for Investors and Startups
          </p>
          <img src="/img/arr1.png" alt="img" className="ml-56 sm:w-32 w-28" />
          <Link
            href="/BuyNFT"
            className=" z-30 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all border-dashed border-2 border-white  rounded-3xl hover:bg-white group"
          >
            <span className="z-30 w-48 h-48 rounded-full rotate-[-40deg] bg-[#ff9e00] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 "></span>
            <span className="z-30 relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black  font-bold font-vt  text-3xl ">
              Buy NFT
            </span>
          </Link>
        </div>

        <div className=" w-full sm:mr-auto flex items-center justify-center flex-col gap-2 font-jose sm:mt-24 mt-12 mb-8 relative">
          <div className="sm:w-2/6 sm:mr-auto sm:ml-8  w-4/5 flex flex-col sm:items-start items-center sm:justify-start justify-center gap-4  ">
            <p className="sm:text-3xl text-xl font-semibold animate-bouncein z-10 ">
              What is HatcheryDao ?
            </p>
            <p className="text-xs sm:text-sm text-center sm:text-start z-20">
              Hatchery Dao is a NFT gated startup incubator platform to promote
              startups and help them to raise the funding . It is also a
              DataExchange platform to buy sell critical data like balance sheet
              , ledger , profit statement <b>PRIOR FROM GENERAL PUBLIC</b>{" "}
            </p>
          </div>
          <img
            src="/img/earth.png"
            alt="img"
            className="absolute z-10 w-9/12 sm:-top-48 sm:-right-64 -bottom-72 -right-32 animate-rotate "
          />
        </div>
      </section>
      <section className=" w-full flex flex-col items-center justify-start   bg-white ">
        <p className="mt-16 sm:text-5xl text-3xl  font-bold font-jose">
          🏗️ BUILT USING 🏔️
        </p>
        <div className="grid sm:grid-cols-5 grid-cols-3 auto-cols-max items-center  ">
          <img src="/img/huddle.png" alt="img" className=" sm:p-12 p-6" />
          <img src="/img/filecoin.png" alt="img" className=" sm:p-12 p-6" />
          <img src="/img/livepeer.png" alt="img" className=" sm:p-12 p-6" />
          <img src="/img/spheron.png" alt="img" className=" sm:p-12 p-6" />
          <img src="/img/lighthouse.jpg" alt="img" className=" sm:p-12 p-6" />
        </div>

        <p className="mt-8 sm:text-4xl text-2xl font-semibold font-jose text-[#070a14]">
          Who is this for ?
        </p>

        <div className="flex sm:flex-row flex-col items-center justify-center w-full sm:w-3/4 mb-12 gap-4">
          <img
            src="/img/investor.jpg"
            alt="img"
            className="w-9/12 sm:w-4/12 p-8 rounded-full"
          />
          <p className=" font-jose sm:text-sm text-xs p-8 text-center sm:w-2/5 w-9/12">
            The Investors who are looking for early age startups to{" "}
            <b>invest</b> and want to aquire profit in long terms. They will be
            able to Invest and <b>Buy the critical datas</b> like profit
            statement . They are not only limited to this , they will be able to
            post some data like other startups <b>balance sheet</b> also{" "}
          </p>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-center w-full sm:w-3/4 gap-4">
          <p className=" font-jose sm:text-sm text-xs p-8 text-center sm:w-2/5 w-9/12">
            The Startups that are looking for initial funding can post about
            their startus here , they will be able to do the basic{" "}
            <b>CRUD operations</b> on few things and will also be able to sell
            their data like ledger ,<b>profit statement</b> etc{" "}
          </p>
          <img
            src="/img/startup.jpg"
            alt="img"
            className="w-9/12 sm:w-4/12 p-8 rounded-full"
          />
        </div>
      </section>

      <section className=" rounded-xl flex flex-col items-center justify-center w-full min-h-screen sm:p-14 p-8">
        <p className="sm:text-4xl text-2xl text-center font-semibold my-12">
          Reasons why you should Buy HatcheryDAO SBT ?
        </p>
        <div className="grid sm:w-9/12 w-4/5 sm:grid-cols-3 grid-cols-2 items-center gap-5 bg-[#9d4edd] p-6 text-black rounded-3xl">
        <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="img/aplayer.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> Identify the A-Player earlier</p>
            <p className="text-xs ">
              With the help of HatcheryDao SBTs you will be eligible to
              participate in the DataExchange platform. It is a type of DataDao
              to buy and sell the critical data like balance sheet , ledger ,
              profit statement etc.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start w-full hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="/img/less.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> Invest as minimum as you want</p>
            <p className="text-xs ">With the help of HatcheryDao Investor SBT you can invest as small
              as 0.1$ , It must be greater than zero atleast , unless its no
              point to invest.
            </p>
          </div>

          

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="/img/earth2.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> Get Investments all over the WORLD</p>
            <p className="text-xs ">Anyone with a metamask wallet can invest and if you are a startup
              you can also get the funding from all over the world. Its that
              easy and simple. and not only that you will be able to exchange
              tokens into your fav token from our platform as well.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="/img/operation.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3"> CRU Operations</p>
            <p className="text-xs ">
              We hate mistakes , so we have made it easy for you to do the CRUD
              operations on your startup. You can do the basic CRU operations on
              name, description, amount and other things. We intentionally left
              the D, you cant delete but deactivations are allowed.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="/img/easy.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3">Simple UI</p>
            <p className="text-xs ">
              I tried to make it as simple as ABC , You will be able to see all
              your startups that you invested , all the investments that you
              have done and many things like that in one place.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start w-full  hover:shadow-xl shadow-black transition-all duration-150 ease-linear p-2 hover:bg-white rounded-xl ">
            <img
              src="/img/doubt.png"
              alt="img"
              className="w-12 hover:rotate-180 duration-150 transition-all ease-linear"
            />
            <p className="text-lg mb-3">
              Clear your doubts with startup OWNERS
            </p>
            <p className="text-xs ">
              We have implemented the huddle01 sdk for doing one-on-one meeting
              with the startups owners before you invest , although it is not
              necessary but it is always a great idea to know you company before
              you invest in it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#100a25] min-h-screen flex-col flex justify-center py-14 pb-16 items-center ">
        <div className="sm:w-3/4 w-full px-8 flex justify-evenly">
          <img
            src="/img/future.gif"
            alt="img"
            className="w-2/5 my-ayto hidden sm:inline-block"
          />
          <div>
            <p className="sm:text-7xl  text-center my-4 mb-8 text-4xl font-vt text-white ">
              Some future Implementation 🚀️
            </p>
            <p className=" sm:ml-auto py-2 hover:scale-105 px-4 bg-[#9d4edd] hover:bg-white text-[#070a14] rounded-full transition-all duration-200 ease-linear font-jose text-center mt-4 font-seibold sm:text-xl text-lg sm:w-3/5 w-full">
              A Dex can be implemented to facilitate trade in FIL 💱️{" "}
            </p>
            <p className="py-2 hover:scale-105 px-4 bg-[#9d4edd] hover:bg-white text-[#070a14] rounded-full transition-all duration-200 ease-linear font-jose text-center mt-4 font-seibold sm:text-xl text-lg sm:w-3/5 w-full">
              {" "}
              🧑‍🤝‍🧑️ Voteout based on majority if caught in wrong practices
            </p>
            <p className=" sm:ml-auto py-2 hover:scale-105 px-4 bg-[#9d4edd] hover:bg-white text-[#070a14] rounded-full transition-all duration-200 ease-linear font-jose text-center mt-4 font-seibold sm:text-xl text-lg sm:w-3/5 w-full">
              Implementation of decentralized DBMS for storing data 🗄️
            </p>
            <p className="py-2 hover:scale-105 px-4 bg-[#9d4edd] hover:bg-white text-[#070a14] rounded-full transition-all duration-200 ease-linear font-jose text-center mt-4 font-seibold sm:text-xl text-lg sm:w-3/5 w-full">
              🆔️ Lens Profile can be integrated for decentralized Identity
            </p>
            <p className="sm:ml-auto py-2 hover:scale-105 px-4 bg-[#9d4edd] hover:bg-white text-[#070a14] rounded-full transition-all duration-200 ease-linear font-jose text-center mt-4 font-seibold sm:text-xl text-lg sm:w-3/5 w-full">
              Live prices of invested token based on current market 💹️
            </p>
          </div>
        </div>
      </section>
      <div>
      <div className="mx-auto w-full flex flex-col items-center justify-center  ">
        <p className="sm:text-6xl text-3xl text-center my-4 mb-8  font-jose mt-12 ">So what you are waiting for ?
        </p>
        <p className="sm:text-5xl text-2xl text-center my-4 mb-8  font-vt mt-12 ">
         If you want FREE Access ??
        </p>
        <p className="sm:text-2xl text-xl text-center my-4 mb-8  font-jose w-9/12 mx-auto ">
          Share the project on twitter and contact the owner with tweet link 😊️
        </p>
          <p className="sm:text-4xl text-2xl text-center my-4 mb-8  font-jose mt-12 ">OR</p>
          <Link href={"/BuyNFT"} className="mx-auto z-10 font-vt text-6xl bg-[#9d4edd] text-[#ffffff] rounded-3xl shadow-[#c3a2dd] shadow-xl py-2 px-8 hover:scale-110 transition-all duration-200 ease-linear">Buy Now</Link>
        </div>
      
        <img src="img/arr2.png" alt="img" width={250} className="ml-48" />{" "}
       
      </div>
      <footer>
        <div className="bg-[#04040f] text-white grid grid-cols-2 w-full">
          <div className="flex flex-col items-start p-4 justify-start">
            <p className="text-xl">HatcheryDAO</p>
            <p className="text-sm">
              A One stop shop for STARTUPS and INVESTORS
            </p>
            <div className="flex   gap-8 mt-2">
              <div
                onClick={() => handleContact("https://twitter.com/shikkhar_")}
              >
                <img
                  className="cursor-pointer"
                  src="/img/twitter.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div
                onClick={() => handleContact("https://github.com/shikhar360")}
              >
                <img
                  className="cursor-pointer"
                  src="/img/github.png"
                  alt="bg"
                  width={40}
                />
              </div>
              <div
                onClick={() =>
                  handleContact("https://linkedin.com/in/shikhar360")
                }
              >
                <img
                  className="cursor-pointer"
                  src="/img/linkin.png"
                  alt="bg"
                  height={40}
                  width={40}
                />
              </div>
            </div>
          </div>
          <span className=" py-2 my-auto  text-[#c7c7c7] text-xs">
            ©2023 HatcheryDAO. ALL COPYRIGHTS RESERVED
          </span>
        </div>
      </footer>
    </>
  );
}
