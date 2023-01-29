import Head from 'next/head'
import Homepage from '../components/Homepage';


export default function Home() {
  


  return (
    <>
      <Head>
        <title>Hatchery-Dao</title>
        <meta name="description" content="Created with <3 by Shikhar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hatch.png" />
      </Head>
     
      <Homepage/>
      

    </>
  )
}
