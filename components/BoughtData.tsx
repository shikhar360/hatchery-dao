import React, { useState } from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useBalance,
} from "wagmi";

interface IsignAuth{
  publicKey : string;
  signedMessage : string;
}
interface Icid{
  cid : string;
}

function BoughtData({cid} : Icid) {
  
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const [fileURL, setFileURL] = useState<string>("");

  const sign_auth_message = async()   =>{
    
    if(!signer)return
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const decrypt = async( cidHash : string) =>{
    // Fetch file encryption key
    // const cid = "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"; //replace with your IPFS CID
    // const {publicKey  , signedMessage } = await sign_auth_message();
    const data = await sign_auth_message();
    console.log(data?.signedMessage)
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      data?.publicKey as string,
      data?.signedMessage as string 
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */
   
    // const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(cidHash , keyObject.data.key);
    console.log(decrypted)
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  }

  function handleClick(){
    window.open(fileURL)
  }

  return (
    <div className="flex py-2 rounded-xl flex-col w-full bg-white/30 backdrop-blur-xl items-center justify-center  px-8">

      <p className="px-4 text-sm truncate w-full text-center">{cid}</p>
      <div className="flex items-center justify-center flex-wrap sm:gap-8  mt-2 w-full">

      <button  className="bg-[#070a14] text-white py-1 px-2  mx-auto  hover:scale-105 hover:shadow-md hover:shadow-[#100a25] rounded-md transition-all duration-150 ease-linear  text-center" onClick={()=>decrypt(cid)}>Decrypt</button>
      {
        fileURL?
        <a  className="bg-[#070a14] text-white py-1 px-2  mx-auto  hover:scale-105 hover:shadow-md hover:shadow-[#100a25] rounded-md transition-all duration-150 ease-linear  text-center" href={fileURL} onClick={handleClick}>ViewFile</a>
        :
        null
      }
      </div>
    </div>
  );
}

export default BoughtData;