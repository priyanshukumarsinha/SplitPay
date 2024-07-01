import React from 'react'
import { Logo } from '../assets'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className='flex items-center justify-between bg-backgroundShade p-4 px-10 rounded-xl'>
        <div>
            <img src={Logo} 
            className='w-40'
            alt="" />
        </div>
        <div 
        onClick={() => navigate('/login')}
        className='bg-background p-2 rounded-full'>
            <FaUser className='text-white text-xl'/>
        </div>
    </nav>
  )
}

export default Navbar