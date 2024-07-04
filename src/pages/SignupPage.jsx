import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import { LuEye } from 'react-icons/lu'
import { IoIosEye } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent'
import SuccessComponent from '../components/SuccessComponent'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'
import { setError, setSuccess } from '../store/authSlice.js'

const SignupPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        dispatch(setError(''))
        e.preventDefault()
        const data = {
            firstName: e.target.firstName?.value,
            lastName: e.target.lastName?.value,
            username: e.target.username?.value,
            email: e.target.email?.value,
            password: e.target.password?.value,
            phoneNumber: e.target.phoneNumber?.value,
            dob: new Date(e.target.dob?.value).toISOString()
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }


        // create request to create user
        const response = await fetch('http://localhost:3000/api/user/create', options)
        
        const responseData = await response.json()

        // if error, set error state
        if(responseData.status === 'error'){
            dispatch(setError(responseData.message))
            dispatch(setSuccess(''))
        } else {
            dispatch(setError(''))
            dispatch(setSuccess(responseData.message))
            // instead of navigating to login page, direclty login user
            // for this, we need to create a request to login user
            // then store the token in local storage
            // then navigate to home page
            loginUser(data.email, data.username, data.password)
        }

    }

    const loginUser = async(email, username, password) => {
        // check if email or username is provided
        // if email is provided, login with email
        // if username is provided, login with username
        let data = {}
        if(email){
            data = {
                email,
                password
            }
        } else {
            data = {
                username,
                password
            }
        }

        // set options for login request
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // create request to login user
        const response = await fetch('http://localhost:3000/api/user/login', options)
        const responseData = await response.json()

        // if error, set error state
        if(responseData.status === 'error'){
            dispatch(setError(responseData.message))
            dispatch(setSuccess(''));
        } else {
            // if success, store user data in local storage
            localStorage.setItem('user', JSON.stringify(responseData.data))

            // set the store with user data
            dispatch(login(responseData.data))

            // if success, set success state and set error state to empty

            setTimeout(() => {
                dispatch(setSuccess(responseData.message))
                dispatch(setError(''))

                // no need to store token in local storage
                // as we are using session based authentication
                // where token is stored as cookie

                // so, we can directly navigate to home page
                // navigate to home page
                navigate('/')
            }, 2200)

            // store user data in store


            clearTimeout();

        }

    }


  return (
    <div className='flex justify-center items-center w-full bg-background relative'>
        <ErrorComponent />
        <SuccessComponent />
        <form 
        onSubmit={(e) => handleSubmit(e)}
        className='w-full md:w-2/3 lg:w-1/2 roudned-xl h-screen bg-backgroundShade'>
            <div className='w-full flex flex-col justify-center h-screen p-10 px-[5%] sm:px-10 lg:px-40'>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="text" name="firstName" id="firstName" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='First Name'
                    />
                </div>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="text" name="lastName" id="lastName" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='Last Name'
                    />
                </div>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="text" name="username" id="username" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='username'
                    />
                </div>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="text" name="email" id="email" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='email'
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
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="number" name="phoneNumber" id="phoneNumber" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='Phone Number'
                    />
                </div>
                <div className='flex justify-center items-center text-sm'>
                    <div className='w-14 h-[41px] border border-collapse border-gray-300 rounded-md rounded-r-none flex justify-center items-center'>
                        <FaUser className='text-xl text-white bg-gray-300 p-1 rounded-full'/>
                    </div>
                    <input type="date" name="dob" id="dob" 
                    className='outline-none w-full p-[10px] my-2 border border-gray-300 rounded-md rounded-l-none' 
                    placeholder='DOB'
                    />
                </div>
                <div className='flex justify-end items-center'>
                    <button type ="submit" className='px-3 p-2 bg-primary text-white rounded-md my-2'
                    >Create Account</button>
                </div>

                <p
                className='w-full text-center p-5 text-gray-400 text-xs font-light'
                >
                    Already have an Account? <Link to={'/login'} className='font-semibold text-primary'>Sign in</Link>
                </p>

                <p className='w-full text-center text-xs text-gray-500 p-5'>
                Click “Sign up” to agree to SplitPay's Terms of Service and acknowledge that SplitPay's Privacy Policy applies to you.
                </p>


            </div>
        </form>
    </div>
  )
}

export default SignupPage