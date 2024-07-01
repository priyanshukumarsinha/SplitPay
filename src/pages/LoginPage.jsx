import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import { LuEye } from 'react-icons/lu'
import { IoIosEye } from 'react-icons/io'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    
  return (
    <div className='flex justify-center items-center w-full bg-background'>
        <form action="" className='w-full md:w-2/3 lg:w-1/2 roudned-xl h-screen bg-backgroundShade'>
            <div className='w-full flex flex-col justify-center h-screen p-10 px-[5%] sm:px-10 lg:px-40'>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="text" name="email" id="email" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='Username or Email'
                    />
                </div>
                <div className='flex justify-center items-center text-sm relative'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <RiLockPasswordLine className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type={`${passwordVisible? 'text' : 'password'}`} name="password" id="password" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='Password'
                    />

                    <div className='absolute right-5'
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {
                            passwordVisible ? <LuEye className='text-xl text-gray-300' /> : <IoIosEye className='text-xl text-gray-300'/>
                        }

                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <button className='px-3 p-2 bg-primary text-white rounded-md my-2'>Login</button>
                </div>

                <p className='w-full text-center p-5 text-gray-400 text-xs'>
                    <Link to={'/forgot-password'} 
                    className='font-semibold text-primary'>Forgot Password?</Link> <br />
                    Forgot email or trouble signing in? <Link to={'/help'} className='text-primary font-semibold'>Get help</Link>.
                </p>

                <p
                className='w-full text-center p-5 text-gray-400 text-xs font-light'
                >
                    No Account? <Link to={'/signup'} className='font-semibold text-primary'>Create one</Link>
                </p>

                <p className='w-full text-center text-xs text-gray-500 p-5 mt-20'>
                    Click “Sign up” to agree to SplitPay's Terms of Service and acknowledge that SplitPay's Privacy Policy applies to you.
                </p>


            </div>
        </form>
    </div>
  )
}

export default LoginPage