import React  ,{useMemo} from "react";
import Link from "next/link";

import { Player, useAssetMetrics } from '@livepeer/react';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

function getKeys(){
  return process.env.NEXT_PUBLIC_STUDIO_API_KEY
 }

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: getKeys() as string ,
  }),
});

export default function PostStartup(){
  return (
    <LivepeerConfig client={livepeerClient}>
    <PostStartupExport/>
    </LivepeerConfig>
  )
}

function PostStartupExport() {
  return (
    
    <div className=" w-full min-h-screen overflow-x-hidden flex  flex-col bg-[url('../public/img/grad2.jpg')]  bg-cover bg-no-repeat items-start gap-8 pt-20 justify-start  ">
      <Link
            href={{
              pathname: "/EditPost",
              query: { name: "POST_NEW" },
            }}
        // onClick={handleActive}
        className="rounded-3xl   bg-[#fff]  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center py-2 px-4 ml-16 "
        >
      
        <img src="img/plus.png" alt="img" className="w-12 mr-2" />{" "}
        <span>Post your Startup</span>
      </Link>

      {/* {isMystartup ? ( */}
      <div className="w-full flex items-center justify-center">
        <div className="sm:w-2/4 w-4/5  h-5/6 bg-white/10 animate-bounceb transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col items-start justify-center rounded-xl font-jose relative  ">
          <img
            src={`img/${"initial_img.jpg"}`}
            alt="header"
            className="h-60 w-full rounded-t-xl "
          />
          <Link
            href={{
              pathname: "/EditPost",
              query: { name: "IMAGE" },
            }}
          >
            <img
              src={`img/pencil.png`}
              alt="header"
              className=" absolute right-2 top-2 w-8 cursor-pointer"
              // onClick={() => alert("i am touched")}
            />
          </Link>

          <div className=" w-9/12 flex items-center mt-4 ml-4 text-white">
            <span className="text-2xl font-semibold">Startup Name</span>
            <Link
            href={{
              pathname: "/EditPost",
              query: { name: "NAME" },
            }}
           >
            <img
              src={`img/pencil.png`}
              alt="header"
              className="ml-8 w-4 cursor-pointer"
              // onClick={() => alert("i am touched")}
            />
            </Link>
          </div>

          <div className="flex items-center justify-between gap-8 ">
            <span className="text-base mt-3 ml-4 text-white  ">
              Seeking - <b className="font-bold text-xl">$80,000</b>
            </span>
            <Link
            href={{
              pathname: "/EditPost",
              query: { name: "AMOUNT" },
            }}
           >

            <img
              src={`img/pencil.png`}
              alt="header"
              className="w-4 cursor-pointer"
              // onClick={() => alert("i am touched")}
              />
              </Link>
          </div>

          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex items-center  font-semibold justify-start text-base tracking-widest w-1/2  ">
              Tagline
              <Link
            href={{
              pathname: "/EditPost",
              query: { name: "TAGLINE" },
            }}
              >
              <img
                src={`img/pencil.png`}
                alt="header"
                className="w-4 cursor-pointer"
                // onClick={() => alert("i am touched")}
              />
              </Link>
            </span>
            <p className=" mt-3 mx-4 text-zinc-300 flex-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sed
              culpa sunt quidem quos vel hic
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-start  text-white ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Description
              <Link
            href={{
              pathname: "/EditPost",
              query: { name: "DESCRIPTION" },
            }}
           >
              <img
                src={`img/pencil.png`}
                alt="header"
                className="w-4 cursor-pointer"
                // onClick={() => alert("i am touched")}
              />
              </Link>
            </span>
            <p className=" mt-3 mx-4 flex-wrap text-zinc-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sed
              culpa sunt quidem quos vel hic cupiditate dolore, voluptatum
              doloribus accusamus magni, unde corrupti eum nam nobis alias
              minus? Corporis, quos fuga. Sit veniam inventore dicta maxime
              reprehenderit quod iusto molestias fugit dolor consequatur vitae
              quae praesentium, facilis ad dolorum.
            </p>
          </div>
          <div className="flex items-start flex-col flex-wrap justify-center  text-white w-full  ">
            <span className="mt-3 ml-4 flex font-semibold items-center justify-start text-base tracking-widest w-1/2  ">
              Upload a Video ?
              <Link
            href={{
              pathname: "/EditPost",
              query: { name: "VIDEO" },
            }}
           >
              <img
                src={`img/pencil.png`}
                alt="header"
                className="w-4 ml-4 cursor-pointer"
                // onClick={() => alert("i am touched")}
              />
              </Link>
            </span>
            <div className="w-full my-4 flex items-center justify-center">
              {/* <video className="h-60 " autoPlay controls>
                <source src="/img/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <Player
                title={"Video"}
                playbackId={"b66bkq9unt44br5k"}
                // src={url}
                autoPlay
                muted
                autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ) : ( */}
      <span className="text-2xl sm:text-3xl flex-wrap font-jose text-center content-center bg-white p-4 rounded-xl flex items-center justify-center gap-4  mx-auto  ">
        You Haven't Posted about your Startup yet
        <img src="img/doubt.png" alt="img" className="w-12 mr-2" />
      </span>
      {/* )} */}
    </div>

  );
}
