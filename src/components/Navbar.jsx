import React, { useState } from 'react'
import { Logo } from '../assets'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const isAuthenticated = useSelector(state => state.auth?.status);
    const user = useSelector(state => state.auth?.user?.user)
    const handleClick = () => {
        if(!isAuthenticated) {
            navigate('/login')
        } else {
          setShowMenu(!showMenu)
        }
    }
  return (
    <nav className='flex items-center justify-between bg-backgroundShade p-4 px-10 rounded-xl relative'>
        <Link to='/'>
          <div>
              <img src={Logo} 
              className='w-40'
              alt="" />
          </div>
        </Link>
        <div 
        onClick={handleClick}
        className='bg-background p-2 rounded-full'>
            {
              isAuthenticated ? 
              (<img 
              className='w-10 h-10 rounded-full'
              src={isAuthenticated && user?.photoURL}
              alt="" />)
              :
              <FaUser className='text-white text-2xl' /> 
            }
        </div>
        {showMenu && <SideBar />}
    </nav>
  )
}

export default Navbar