import React from 'react'
import { Navbar } from '../componenets'
import { SplitPay } from '../assets/images'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center bg-background w-full h-screen'>
        <Navbar />
        <div className='pl-40 w-full h-[80vh] flex '>
          <div className='flex justify-center flex-col'>
            <img src={SplitPay} alt="" className='w-[600px] h-[150px]'/>
            <p className='w-[650px] py-10 text-md text-textDim'>
            A web-based application designed to facilitate effortless expense management and payment processes among individuals and groups
            </p>
          </div>
          <div></div>
        </div>
    </div>
  )
}

export default HomePage