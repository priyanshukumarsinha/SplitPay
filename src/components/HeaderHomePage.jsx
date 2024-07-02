import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const HeaderHomePage = () => {
  return (
    <header className='bg-background w-full p-10 px-[5%] md:px-[7%] lg:px-[10%]'>
        <Navbar />
    </header>
  )
}

export default HeaderHomePage