import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

 
import { useCreateAsset } from '@livepeer/react';
 
import { useCallback, useState , useMemo } from 'react';
import { useDropzone } from 'react-dropzone';



function getKeys(){
  return process.env.NEXT_PUBLIC_STUDIO_API_KEY
 }

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: getKeys() ,
  }),
});
 
// Pass client to React Context Provider

export default function Test (){
 return (
  <LivepeerConfig client={livepeerClient}>
    <Assets/>
    </LivepeerConfig>
 )
}

import { Player, useAssetMetrics } from '@livepeer/react';
 
 
 function Assets  () {

  const [videos, setVideos] = useState('');

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset({sources: [{ name: videos?.name, file: videos }] });

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });
 
  
  const isLoading = useMemo(
    () =>
      status === 'loading' ||
      (asset?.[0] && asset[0].status?.phase !== 'ready'),
    [status, asset],
  );
 
  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );
 console.log(asset)
  return (
    

    <div className="mt-20">
      
        <div >
          <input onChange={e=>setVideos(e.target.files[0])} type="file" />
          <p>Drag and drop or browse files</p>
 
          
        </div>
     
 
      {asset?.[0]?.playbackId && (
        <Player title={asset[0].name} playbackId={asset[0].playbackId} />
      )}
 
      <div>
        {metrics?.metrics?.[0] && (
          <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
        )}
          {error?.message && <p>{error.message}</p>}

        {videos ? <p>{videos.name}</p> : <p>Select a video file to upload.</p>}
        
        {progressFormatted && <p>{progressFormatted}</p>}
        
        {!asset?.[0].id && (
          <button
            onClick={() => {
              createAsset?.(videos);
            }}
            disabled={isLoading || !createAsset}
          >
            Upload
          </button>
        )}
       {asset?.[0]?.playbackId &&  <h1>{asset[0].playbackId}</h1>}

      </div>
    </div>
       
  );
};
// a7dfcmxisfj53hfj