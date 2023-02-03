import React from 'react'
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";

export default function PitchDeckPublic() {
 
const iframeConfig: IframeConfig = {
  roomUrl: "https://iframe.huddle01.com/123",
  height: "1000px",
  width: "100%",
  noBorder: false, // false by default
};
  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center'>
    <HuddleIframe config={iframeConfig} />
      </div>
  )
}