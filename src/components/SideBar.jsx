import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SERVER_URI } from '../constants';

const SideBar = () => {
    const user = useSelector(state => state.auth?.user?.user)
    const status = useSelector(state => state.auth?.status)
    const email = ((user?.email)?.split('@')[0])
                    ?.slice(0,(((user?.email).split('@')[0]).length/2)+1)
                    ?.concat('*'.repeat((((user?.email).split('@')[0]).length-1)-(((user?.email).split('@')[0]).length/2)+1))
                    ?.concat('@')
                    ?.concat((user?.email).split('@')[1])

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutUser = async() => {
        // set options for login request
        const options = {
            method: 'POST',
            credentials : 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }

        // create request to login user
        const response = await fetch(`${SERVER_URI}/api/user/logout`, options)
        const responseData = await response.json()

        if(!response){
            return new Error('Error logging out')
        }

        else{
        dispatch(logout());

        // update the local storage
        localStorage.clear();
        }

        // redirect to login page
        // navigate('/');
    
    }

    if(status) return (
    <div className='bg-[#161a1f] py-10 absolute right-0 top-14 w-full lg:w-[400px] z-50 rounded-t-2xl rounded-b-lg flex flex-col gap-5'>
        <div className='flex gap-5 px-10'>
            <FaUser className='text-white text-xl'/>
            <p className='text-white'>
                Profile
            </p>
        </div>
        <div className='flex gap-5 px-10'>
            <FaUser className='text-white text-xl'/>
            <p className='text-white'>
                Previous Transactions
            </p>
        </div>
        <div className='flex gap-5 px-10'>
            <FaUser className='text-white text-xl'/>
            <p className='text-white'>
                Groups [Pending Transactions]
            </p>
        </div>

        <div className='bg-primary h-[1px] my-5 w-full'></div>

        <div className='flex gap-5 px-10'>
            <p className='text-white'>
                {email}
            </p>
        </div>


        <button 
        onClick={() => logoutUser()}
        className='flex justify-center items-center'>
            <p className='text-white w-[80%] bg-backgroundShade p-5 rounded-lg'>
                Logout
            </p>
        </button>

    </div>
  )
  return null
}

export default SideBar