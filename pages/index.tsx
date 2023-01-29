import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Homepage from '../components/Homepage';
// import bg from '../public/img/bg.png'
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
