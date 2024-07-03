import React, { useEffect, useState } from 'react'
import HeaderMakeaGroup from '../components/HeaderMakeaGroup'
import { useSelector } from 'react-redux'


const MakeaGroupPage = () => {
  const user = useSelector(state => state.auth?.user?.user)
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const adminId = user.id;
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [groupType, setGroupType] = useState('Public'); // ['Public', 'Private']

  // the members array contains id of the users who are part of the group
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);

  // members can be added from the friends list

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    }
    fetch('http://127.0.0.1:3000/api/user/following', options)
      .then(response => response.json())
      .then(data => {
        setFriends(data.data)
      } 
      )
      console.log(friends)
  }, [])

  const addToGroup = (friend) => {
    // first check if the friend is already in the group
    const friendExists = members.find(member => member.id === friend.id)

    if(friendExists) {
      // remove the friend from the group
      const newMembers = members.filter(member => member.id !== friend.id)
      setMembers(newMembers)
    }
    else {
      // add the friend to the group
      setMembers([...members, friend])
    }
  }

  const createGroup = async() => {
    const data = {
      name : groupName,
      description : groupDescription,
      amount: parseInt(amount),
      currecy : currency,
      GroupTypes : groupType
    }

    const options = {
      method: 'POST',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('http://127.0.0.1:3000/api/group/create', options);
    const responseData = await response.json();

    console.log(responseData);
    members.forEach(member => {
      addMembers(responseData.data.id, member.id)
    })
  }

  const addMembers = async(groupId, memberId) => {
    const data = {
      userId: memberId,
      groupId: groupId
    }

    const options = {
      method: 'POST',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('http://127.0.0.1:3000/api/group/add' , options);
    const responseData = await response.json();

    console.log(responseData);

  }
  

  return (
    <div>
      <HeaderMakeaGroup />
      <main className='bg-background w-full p-10 px-[5%] md:px-[7%] lg:px-[10%]'>
          <div className='flex gap-10 justify-between'>
            <div className=' w-full lg:w-[65%]'>
                <div className='lg:flex gap-5 items-center'>
                  <input
                  onChange={(e) => setGroupName(e.target.value)}
                  type="text" className='text-3xl font-bold p-5 py-3 text-white bg-inherit border-0 outline-none'
                  placeholder='Group Name'
                  />
                </div>

                <div className='lg:flex gap-5 items-center'>
                    <select 
                    onChange={(e) => setGroupType(e.target.value)}
                    name="gType" className=' lg:ml-5 my-4 p-3 text-primaryShade bg-backgroundShade rounded-lg text-xs'>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                <div className='lg:flex gap-5 items-center'>
                  <textarea name="" id=""
                  onChange={(e) => setGroupDescription(e.target.value)}
                  className='lg:ml-1 my-4  w-full h-40 text-XS p-5 py-3 text-white bg-inherit border-0 outline-none overflow-y-hidden'
                  placeholder='Description'
                  ></textarea>
                </div>

                <div className='flex'>
                  <div className='lg:flex gap-5 items-center'>
                    <select 
                    onChange={(e) => setCurrency(e.target.value)}
                    name="currencies" className='lg:ml-5 my-4  p-3 text-primaryShade bg-backgroundShade rounded-lg text-xs'>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="">Other</option>
                    </select>
                  </div>

                  <div className='lg:flex gap-5 items-center'>
                    <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="text" className='text-sm p-5 py-3 text-white bg-inherit border-0 outline-none'
                    placeholder='Total Amount'
                    />
                  </div>
                </div>

                {/* <div>
                    <button 
                    onClick={() => navigate('/add-group')}
                    className='text-white font-bold m-5 p-3 px-5 bg-backgroundShade rounded-lg flex justify-center items-center'> <span className='text-xl font-bold text-primary pr-3'>+</span> Add Group</button>
                </div> */}
                <div className='relative'>
                    <h2 className='text-base p-5 text-white mt-5'>Members</h2>
                    <div className='w-[50px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
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
                                  <div className='flex justify-start items-center gap-2 '>
                                      <h3 className='text-white font-bold text-[14px]'>{user.username}</h3>
                                  </div>
                                  <p className='text-yellow-400 text-[10px]'>share</p>
                              </div>
                          </div>

                          <div className=' h-[100px] lg:h-10 w-[2px] bg-primary absolute'>

                          </div>

                          <button className='ml-5 bg-yellow-600 text-white font-semibold py-2 px-7 rounded-lg'>Rs. 0</button>
                        </div>

                    {
                      members &&
                      (members.map((member, index) => (
                        <div key={index} className='flex justify-between items-start gap-5 lg:gap-0 lg:justify-between lg:items-center relative flex-col lg:flex-row'>
                          <div className='flex gap-5 pl-5 h-18'>
                              <img 
                              className='w-10 h-10 rounded-full'
                              src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" 
                              alt="" />

                              <div className='h-10 flex flex-col justify-between'>
                                  <div 
                                  className='flex justify-start items-center gap-2 '>
                                      <h3 className='text-white font-bold text-[14px]'>{member.username}</h3>
                                  </div>
                                  <p className='text-yellow-400 text-[10px]'>share</p>
                              </div>
                          </div>

                          <div className=' h-[100px] lg:h-10 w-[2px] bg-primary absolute'>

                          </div>

                          <button className='ml-5 bg-yellow-600 text-white font-semibold py-2 px-7 rounded-lg'>Rs. 0</button>
                        </div>
                      )))
                    }

                           

                </div>

                <div className='w-full flex justify-end'>
                  <button 
                  onClick={() => createGroup()}
                  className='text-white font-bold m-5 p-3 px-5 bg-backgroundShade rounded-lg flex justify-center items-center'> <span className='text-xl font-bold text-primary pr-3'>+</span> Create Group</button>
              </div>

            </div>

            <div className='w-[30%] bg-backgroundShade p-5 rounded-lg sticky top-10 h-[500px] hidden lg:flex lg:flex-col'>
              <div className='relative'>
                      <h2 className='text-base p-5 text-white'>Friends</h2>
                      <div className='w-[50px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>
              <div className='flex flex-col gap-8'>
                

                {
                  friends && 
                  (
                    friends.map((friend, index) => 
                      (
                      <div key= {index}className='flex justify-between items-center relative'>
                        <div className='flex gap-5 pl-5'>
                            <img 
                            className='w-10 h-10 rounded-full'
                            src={friend.following.photoURL} 
                            alt="" />

                            <div className='h-10 flex flex-col justify-between'>
                                <div 
                                  onClick={() => addToGroup(friend.following)}
                                className='flex justify-start items-center gap-2'>
                                    <h3 className='text-white font-bold text-[14px]'>{friend.following.username}</h3>
                                </div>
                                <p className='text-yellow-400 text-[10px]'>{friend.following.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    ))
                  )
                }

                    
              </div>
          </div>
          </div>
      </main>
    </div>
  )
}

export default MakeaGroupPage