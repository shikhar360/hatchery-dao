import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";


function GetAccessToken() {
 
  return process.env.NEXT_PUBLIC_WEB_STORAGE;
}

function MakeStorageClient() {
  
    return new Web3Storage({ token: GetAccessToken() as string });
 
}

export const StoreData = async (files : any) => {
  toast.info("Storing data on IPFS...");
  const client = MakeStorageClient();
  const cid = await client.put([files]);
  toast.success("Data stored on IPFS")
  return cid;
};