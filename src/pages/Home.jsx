import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderHomePage from '../components/HeaderHomePage';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user.user)

    if(!user){
        navigate('/')
    }

  return (
    <div>
          <HeaderHomePage />
          <main className='bg-background w-full p-10 px-[5%] md:px-[7%] lg:px-[10%]'>
          <div className='flex gap-10 justify-between'>
          <div className=' w-full lg:w-[65%]'>
              <h1 className='text-3xl font-bold p-5 py-3 text-white '>Welcome Back, <span className='text-primary'>{user?.username}</span>!!</h1>
              <div>
                  <button 
                  onClick={() => navigate('/add-group')}
                  className='text-white font-bold m-5 p-3 px-5 bg-backgroundShade rounded-lg flex justify-center items-center'> <span className='text-xl font-bold text-primary pr-3'>+</span> Add Group</button>
              </div>
              <div className='relative'>
                  <h2 className='text-base p-5 text-white mt-5'>Previous Transactions</h2>
                  <div className='w-[100px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>
              <div className='bg-backgroundShade w-full p-5 rounded-xl mt-3 flex flex-col gap-8'>
                  {/* <div>
                      You have no previous transactions
                  </div> */}

                  <div className='flex justify-between items-start gap-5 lg:gap-0 lg:justify-between lg:items-center relative flex-col lg:flex-row'>
                      <div className='flex gap-5 pl-5 h-18'>
                          <img 
                          className='w-10 h-10 rounded-full'
                          src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                          alt="" />

                          <div className='h-10 flex flex-col justify-between'>
                              <div className='flex justify-center items-center gap-2 '>
                                  <h3 className='text-white font-bold text-[14px]'>John Doe</h3>
                                  <p className='text-successMsg text-xs'>Sent You $20</p>
                              </div>
                              <p className='text-yellow-400 text-[10px]'>You owe $50, Owes you $20</p>
                          </div>
                      </div>

                      <div className=' h-[100px] lg:h-10 w-[2px] bg-primary absolute'>

                      </div>

                      <button className='ml-5 bg-successMsg text-white font-semibold py-2 px-7 rounded-lg'>Rs. 5000</button>
                  </div>                

              </div>

              <div className='relative'>
                  <h2 className='text-base p-5 text-white mt-5'>Pending Transactions</h2>
                  <div className='w-[100px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>

              <div className='bg-backgroundShade w-full px-5 py-6 rounded-xl mt-3 flex flex-col gap-8'>
              <div className='flex w-full flex-col lg:flex-row justify-between items-start lg:justify-between lg:items-center h-36 lg:h-20 relative'>
                      <div className='flex gap-5 pl-5 h-20 '>
                          <div className='flex flex-col justify-between'>
                              <div className='flex justify-center items-center gap-2'>
                                  <h3 className='text-white font-bold text-[14px]'>Group Name</h3>
                                  <p className='text-yellow-400 text-[10px]'>You owe $50, Owes you $20</p>
                              </div>
                              <div className='flex relative'>
                                <img 
                                className='w-10 h-10 rounded-full z-50 absolute left-0 bottom-0'
                                src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                                alt="" />

                                <img 
                                className='w-10 h-10 rounded-full z-40 absolute left-7 bottom-0'
                                src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                                alt="" />

                                <img 
                                className='w-10 h-10 rounded-full z-30 absolute left-14 bottom-0'
                                src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                                alt="" />
                                </div>
                          </div>
                      </div>

                      <div className='h-36 lg:h-20 w-[2px] bg-primary absolute'>

                      </div>

                      <div className='flex gap-5 pl-5 lg:pl-0'>
                        <button className='bg-successMsg text-white font-semibold py-2 px-7 rounded-lg'>Rs. 5000</button>
                        <button className='bg-errorMsg text-white font-semibold py-2 px-7 rounded-lg'>Rs. 5000</button>
                      </div>
              </div> 

              </div>

              <div className='relative'>
                  <h2 className='text-base p-5 text-white mt-5'>Total Spendings</h2>
                  <div className='w-[100px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>

              <div className='bg-backgroundShade w-full p-5 rounded-xl mt-3 h-screen flex flex-col gap-8'>
                  
              </div>
          </div>
          <div className='w-[30%] bg-backgroundShade p-5 rounded-lg sticky top-10 h-[500px] hidden lg:flex lg:flex-col'>
              <div className='relative'>
                      <h2 className='text-base p-5 text-white'>Friends</h2>
                      <div className='w-[50px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>
              <div className='flex flex-col gap-8'>
                <div className='flex justify-between items-center relative'>
                        <div className='flex gap-5 pl-5'>
                            <img 
                            className='w-10 h-10 rounded-full'
                            src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                            alt="" />

                            <div className='h-10 flex flex-col justify-between'>
                                <div className='flex justify-center items-center gap-2'>
                                    <h3 className='text-white font-bold text-[14px]'>John Doe</h3>
                                </div>
                                <p className='text-yellow-400 text-[10px]'>{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center relative'>
                        <div className='flex gap-5 pl-5'>
                            <img 
                            className='w-10 h-10 rounded-full'
                            src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                            alt="" />

                            <div className='h-10 flex flex-col justify-between'>
                                <div className='flex justify-center items-center gap-2'>
                                    <h3 className='text-white font-bold text-[14px]'>John Doe</h3>
                                </div>
                                <p className='text-yellow-400 text-[10px]'>{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center relative'>
                        <div className='flex gap-5 pl-5'>
                            <img 
                            className='w-10 h-10 rounded-full'
                            src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                            alt="" />

                            <div className='h-10 flex flex-col justify-between'>
                                <div className='flex justify-center items-center gap-2'>
                                    <h3 className='text-white font-bold text-[14px]'>John Doe</h3>
                                </div>
                                <p className='text-yellow-400 text-[10px]'>{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
          </div>
          </main>

      </div>
  )
}

export default Home