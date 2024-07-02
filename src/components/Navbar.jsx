import React, { useState } from 'react'
import { Logo } from '../assets'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.status);
    const handleClick = () => {
        if(!isAuthenticated) {
            navigate('/login')
        } else {
          setShowMenu(!showMenu)
        }
    }
  return (
    <nav className='flex items-center justify-between bg-backgroundShade p-4 px-10 rounded-xl relative'>
        <div>
            <img src={Logo} 
            className='w-40'
            alt="" />
        </div>
        <div 
        onClick={handleClick}
        className='bg-background p-2 rounded-full'>
            <FaUser 
            className='text-white text-xl'/>
        </div>
        {showMenu && <SideBar />}
    </nav>
  )
}

export default Navbar