import React from 'react'
import { Logo, Profile } from '../assets/images'

const Navbar = () => {
  return (
    <div className='w-[80%] p-5 bg-black rounded-[20px] mt-10 bg-backgroundShade drop-shadow-[0_35px_35px_rgba(27,33,42,1)]'>
        <div className='flex justify-between'>
            <img src={Logo} alt="Logo" className='w-40 h-10 cursor-pointer' />
            <img src={Profile} alt="Profile" className='w-auto h-10 cursor-pointer' />
        </div>
    </div>
  )
}

export default Navbar