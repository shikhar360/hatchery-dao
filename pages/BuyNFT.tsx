import React from 'react'

export default function BuyNFT() {
  return (
    <section className=' bg-[#100a25] grid sm:grid-cols-2 grid-cols-1 items-start   justify-center min-h-screen w-full mx-auto '>
      <div className=' shadow-white shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-white transition-all duration-300 ease-linear bg-white w-3/5 flex flex-col items-center justify-center border-2 border-black border-dashed p-4 rounded-xl mx-auto my-20 font-jose rounded- '>
       <img src="/img/startup.jpg" alt="img" className='rounded-xl' />
       <div className='w-full mx-auto flex flex-col items-center justify-center'>

       
       <p className='text-xl font-semibold text-center mt-4 mb-2 '>Startup Soulbound NFT</p>
       <button  className='mb-4 bg-gradient-to-br from-[#ff9900] to-[#fdcf00] py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold'> Buy NOW : 0.1 ETH</button>
      
       <p className='text-sm font-semibold'>This is a StartupSBT . You will be able to do the following things :</p>
       <ul className='text-sm ml-4'>
        <li> Post about your Startup</li>
        <li> Able to raise funding</li>
        <li> Will able to see other startups</li>
        <li> Will able to buy/sell your Data</li>
        <li> Will able to have huddle meeting with Investors </li>
        <li> And many more...</li>
       </ul>
       </div>

      </div>
      <div className=' shadow-white shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-white transition-all duration-300 ease-linear bg-white w-3/5 flex flex-col items-center justify-center border-2 border-black border-dashed p-4 rounded-xl mx-auto my-20 font-jose '>
       <img src="/img/investor.jpg" alt="img" className='rounded-xl' />
       <div className='w-full mx-auto flex flex-col items-center justify-center'>

       
       <p className='text-xl font-semibold text-center mt-4 mb-2 '>Investor Soulbound NFT</p>
       <button  className='mb-4 bg-gradient-to-br from-[#ff9900] to-[#fdcf00] py-2 px-4 rounded-xl hover:shadow-black shadow-black hover:scale-105 transition-all duration-300 ease-linear font-semibold'> Buy NOW : 0.2 ETH</button>
      
       <p className='text-sm font-semibold'>This is a InvestorSBT . You will be able to do the following things :</p>
       <ul className='text-sm ml-4'>
        <li> Able to Invest</li>
        <li> Manage your investments</li>
        <li> Post about your Startup</li>
        <li> Able to raise funding</li>
        <li> Will able to see other startups</li>
        <li> Will able to buy/sell your Data</li>
        <li> Will able to have huddle meeting with Investors </li>
        <li> And many more...</li>
       </ul>
       </div>
      </div>
      

    </section>
  )
}
