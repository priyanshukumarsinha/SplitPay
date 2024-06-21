import React from 'react'
import { Button, Navbar } from '../componenets'
import { SplitPay } from '../assets/images'
import Spline from '@splinetool/react-spline';

const LandingPage = () => {
  return (
    <>
      <div className='flex flex-col items-center bg-background w-full h-screen'>
        <Navbar /> 
        <div className='pl-40 w-full h-[80vh] flex '>
          <div className='flex justify-center flex-col w-1/2'>
            <img src={SplitPay} alt="" className='w-[600px] h-[150px]'/>
            <p className='w-[650px] py-10 text-md text-textDim'>
            A web-based application designed to facilitate effortless expense management and payment processes among individuals and groups
            </p>
            <button className='px-3 py-2 bg-primary text-textColor w-40 rounded-2xl mt-16 drop-shadow-[0_35px_35px_rgba(27,33,42,1)]'>
              Get Started
            </button>
          </div>
          <div className='w-1/2 mr-40 flex items-center justify-center'>
          <Spline
              scene="https://prod.spline.design/hVVYeAYofBO4ElKA/scene.splinecode" 
            />
          </div>
        </div>
    </div>
    <div>
      <div>
      <div className='w-1/3 mr-40 flex items-center justify-center'>
          <Spline
              scene="https://prod.spline.design/hVVYeAYofBO4ElKA/scene.splinecode" 
            />
          </div>
      </div>
    </div>
    </>
  )
}

export default LandingPage