import React from 'react'
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";
import Head from 'next/head';

export default function PitchDeckPublic() {
 
const iframeConfig: IframeConfig = {
  roomUrl: "https://iframe.huddle01.com/123",
  height: "1000px",
  width: "100%",
  noBorder: false, // false by default
};
  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center'>
      <Head>
        <title>Public Pitch</title>
         <meta name="description" content="Created with <3 by Shikhar" />
          <link rel="icon" href="/hatch.png" />
      </Head>
    <HuddleIframe config={iframeConfig} />
      </div>
  )
}