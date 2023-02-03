import Head from 'next/head'
import Homepage from '../components/Homepage';


export default function Home() {
  


  return (
    <div className='w-full min-h-screen overflow-x-hidden scrollbar-hide scroll-smooth'>
      <Head>
        <title>Hatchery-Dao</title>
        <meta name="description" content="Created with <3 by Shikhar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hatch.png" />
      </Head>
     
      <Homepage/>
      

    </div>
  )
}
