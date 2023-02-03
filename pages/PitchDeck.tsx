

import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import VideoWindow from "../components/VideoWindow";
import PeerVideoAudioElem from "../components/PeerVideoAudioElem";
import { useRouter } from "next/router";
import Head from "next/head";

function PitchDeck() {
  const huddleClient = getHuddleClient(process.env.NEXT_PUBLIC_HUDDLE as string);
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
 const roomState = useHuddleStore((state) => state.roomState);


  const router = useRouter()
  const {data} = router.query
  console.log(data)

  const handleJoin = async () => {
    try {
      
      await huddleClient.join("startup", {
        address: data as string,
        wallet: undefined,
        ens: ""
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };


  return (
    <HuddleClientProvider value={huddleClient}>
      <Head>
        <title>Private Meeting</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
      <div className=" w-full min-h-screen  flex  flex-col bg-[url('/img/grad3.jpg')]  bg-cover bg-no-repeat items-center gap-4 sm:pt-20 pt-40 justify-start  text-white scrollbar-hide">

      <h2 className={` py-1 px-4  rounded-md m-2 ${roomState.joined ? "bg-lime-500 text-black" : "bg-blue-500 text-white"} font-jose `}>
                 {roomState.joined ? "Enjoy Huddle-01" : "Waiting for Participant to Join"}
      </h2>

      <div className="w-full flex items-center justify-center">

      <button
            className="rounded-md   bg-lime-500  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2 "
              onClick={() =>
                // will not work in localhost
                huddleClient.startRecording({
                  sourceUrl: window.location.href,
                })
              }
            >
              Start Rec.
            </button>
            <button
            className="rounded-md   bg-red-500  hover:shadow-xl  hover:scale-110 hover:shadow-purple-600 transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2 "
            onClick={() => huddleClient.stopRecording({ ipfs: true })}>
              Stop Rec.
            </button>
      </div>

       <div className="md:w-4/6 sm:w-2/3 w-full   mx-auto pb-3 bg-white/10  transition-all duration-300 ease-linear  backdrop-blur-md flex flex-col  items-start justify-start  rounded-xl font-jose ">


        <div className="w-full flex  px-3 py-4 gap-4">
          <div className="w-full bg-stone-800 relative ">
           <VideoWindow />
          { !roomState.joined ? <img src="img/huddleinvest.gif" alt="img" className={`sm:w-16 w-8 absolute top-1/2 right-1/2 translate-x-2/4 -translate-y-1/2 rounded-3xl  `}/> : null}
            </div>
          <div className="w-full bg-stone-800 relative ">
          {peersKeys.map((key) => (
              <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
              
            ))}
           { !roomState.joined ? <img src="img/huddlestart.gif" alt="img" className={`sm:w-16 w-8 absolute top-1/2 right-1/2 translate-x-2/4 -translate-y-1/2 rounded-3xl  `}/> : null}
            </div>
        </div>





        <div className=" flex gap-4 w-9/12  flex-wrap mx-auto items-center justify-evenly">

<img src="img/join.png" className={`rounded-md  hover:shadow-md  hover:scale-110 hover:shadow-white transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2 ${roomState.joined ? "bg-lime-500" : "bg-stone-800"} sm:w-14 w-10`} onClick={handleJoin} />


<img src="img/camera.png"   className={`rounded-md  hover:shadow-md  hover:scale-110 hover:shadow-white transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2  bg-stone-800 sm:w-14 w-10`}  onClick={() => huddleClient.enableWebcam()}/>
  
  
  
  <img src="img/closeVideo.png" className={`rounded-md  hover:shadow-md  hover:scale-110 hover:shadow-white transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2  bg-stone-800 sm:w-14 w-10`}   onClick={() => huddleClient.disableWebcam()}/>


  <img src="img/mute.png" className={`rounded-md  hover:shadow-md  hover:scale-110 hover:shadow-white transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2  bg-stone-800 sm:w-14 w-10`}   onClick={() => huddleClient.muteMic()}/>
  <img src="img/unmute.png" className={`rounded-md  hover:shadow-md  hover:scale-110 hover:shadow-white transition-all duration-200 ease-linear flex items-center justify-center py-1.5 px-3 sm:my-3 my-1 mr-2  bg-stone-800 sm:w-14 w-10`}   onClick={() => huddleClient.unmuteMic()}/>
  
   </div>
       </div>

      </div>
    </HuddleClientProvider>
  );
}

export default PitchDeck;

