import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import { LuEye } from 'react-icons/lu'
import { IoIosEye } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import ErrorComponent from '../components/ErrorComponent'
import SuccessComponent from '../components/SuccessComponent'

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [widthLength, setWidthLength] = useState('100%')

    const loginUser = async(e) => {
        e.preventDefault()

        // check if e.target.email.value is actually an email
        // how to check? use regex
        // regex for email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let email;
        let username;

        // check if email is valid
        if(e.target.email.value && !emailRegex.test(e.target.email.value)){
            username = e.target.email.value
        } else {
            email = e.target.email.value
        }

        const password = e.target.password.value

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
            credentials : 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        // create request to login user
        const response = await fetch('http://127.0.0.1:3000/api/user/login', options)
        const responseData = await response.json()

        // store cookies in local storage
        localStorage.setItem('accessToken', (responseData.data.accessToken))
        localStorage.setItem('refreshToken', (responseData.data.refreshToken))

        // if error, set error state
        if(responseData.status === 'error'){
            setError(responseData.message)
            setSuccess('');
        } else {
            // if success, store user data in local storage
            localStorage.setItem('user', JSON.stringify(responseData.data))

            // set the store with user data
            dispatch(login(responseData.data))

            // if success, set success state and set error state to empty

            setTimeout(() => {
                setSuccess(responseData.message)
                setError('')

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
    <div className='flex justify-center items-center w-full bg-background'>
        <ErrorComponent error={error} widthLength = {widthLength} setError={setError} setWidthLength={setWidthLength} />
        <SuccessComponent success= {success} widthLength = {widthLength} setSuccess = {setSuccess} setWidthLength = {setWidthLength}/>
        <form 
        onSubmit={(e) => loginUser(e)}
        action="" className='w-full md:w-2/3 lg:w-1/2 roudned-xl h-screen bg-backgroundShade'>
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
                    <button 
                    type='submit'
                    className='px-3 p-2 bg-primary text-white rounded-md my-2'>Login</button>
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