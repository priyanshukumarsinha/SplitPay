import React, { useCallback, useEffect, useState } from 'react'
import HeaderMakeaGroup from '../components/HeaderMakeaGroup'
import { useDispatch, useSelector } from 'react-redux'
import FriendsComponent from '../components/FriendsComponent'
import ErrorComponent from '../components/ErrorComponent.jsx';
import SuccessComponent from '../components/SuccessComponent.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { setError, setSuccess } from '../store/authSlice.js';
import { data } from 'autoprefixer';
import _, { create } from 'lodash';
import { stringify } from 'postcss';
import { IoIosSend } from 'react-icons/io';

import { SERVER_URI } from '../constants.js';


const GroupPage = () => {

  const {id} = useParams();

  const [group, setGroup] = useState({});

  const [message, setMessage] = useState('')

  const user = useSelector(state => state.auth?.user?.user)
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [groupType, setGroupType] = useState('Public'); // ['Public', 'Private']

  // the members array contains id of the users who are part of the group
  const [members, setMembers] = useState([]);
  const [existingMembers, setExistingMembers] = useState([]); // [userId, userId, userId
  const [friends, setFriends] = useState([]);

  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.status);
  isAuthenticated ? null : navigate('/')

  const [transactions, setTransactions] = useState([])


  const dispatch = useDispatch();

  // is useCallback required here?
  const getMessages = useCallback(async() => {
    const options = {
      method: 'GET',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    }
    const response = await fetch(`${SERVER_URI}/api/message/${id}`, options)
    const data = await response.json();    

    setMessages(data.data)

  }, [messages])

  useEffect(() => {
    getMessages()
  }, [])

  // setInterval(() => {
  //   // not efficient and scalable method
  //   // try using websockets
  //   // but for now, this will do
  //   getMessages()
  // }, 10000)

  // clearInterval();

  useEffect(() => {
    try{
      const messageBody = document.getElementById('messages')
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
      console.log(scrollTop)
    }
    catch{}
  }, [messages])

  // console.log('Messages', messages)

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    }
    fetch(`${SERVER_URI}/api/group/${id}`, options)
      .then(response => response.json())
      .then(data => {
        setGroup(data.data)
        setExistingMembers(data.data.members)
        setMembers(data.data.members)
        setAmount(data.data.amount)
        setCurrency(data.data.currecy)
        setGroupName(data.data.name)
        setGroupDescription(data.data.description)
        setGroupType(data.data.GroupTypes)
      })
  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    }
    fetch(`${SERVER_URI}/api/user/following`, options)
      .then(response => response.json())
      .then(data => {
        setFriends(data.data)
      } 
      )
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

  const updateGroup = async() => {
    const data = {
      groupId : parseInt(id),
      name : groupName,
      description : groupDescription,
      amount: parseInt(amount),
      currecy : currency,
      GroupTypes : groupType
    }

    const options = {
      method: 'PUT',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(`${SERVER_URI}/api/group/update`, options);
    const responseData = await response.json();

    if(responseData.status == 'error'){
      dispatch(setError(responseData.message));
      return;
    }

    dispatch(setSuccess(responseData.message));

    console.log(' Existing members', existingMembers)
    console.log('members', members)

    if(!(_.isEqual(existingMembers, members))){
      const removeDiff = (_.difference(existingMembers, members)) || 0
      const addDiff = (_.difference(members, existingMembers)) || 0

      console.log('Remove Diff', removeDiff)
      console.log('Add Diff', addDiff)

      if(addDiff) {
        addDiff.forEach(member => {
          addMembers(responseData.data.id, member.id)
        })
      }
      if(removeDiff){
        removeDiff.forEach(member => {
          removeMember(responseData.data.id, member.id)
        })
      }

    }
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

    const response = await fetch(`${SERVER_URI}/api/group/add` , options);
    const responseData = await response.json();

    console.log(responseData);

  }

  const removeMember = async(groupId, memberId) => {
    const data = {
      userId: memberId,
      groupId: groupId
    }

    const options = {
      method: 'DELETE',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(`${SERVER_URI}/api/group/remove` , options);
    const responseData = await response.json();

    console.log(responseData);
  };
  
  const createMessage = async() => {
    const data = {
      groupId: id,
      message: message
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

    const response = await fetch(`${SERVER_URI}/api/message/create` , options);
    const responseData = await response.json();

    console.log(responseData);
    setMessage('')

    getMessages();
  }


  return (
    <div>
      <HeaderMakeaGroup />
      <ErrorComponent/>
      <SuccessComponent/>
      <main className='bg-background w-full p-10 px-[5%] md:px-[7%] lg:px-[10%]'>
          <div className='flex gap-10 justify-between'>
            <div className=' w-full lg:w-[65%]'>
                <div className='lg:flex gap-5 items-center'>
                  <input
                  onChange={(e) => setGroupName(e.target.value)}
                  type="text" className='text-3xl font-bold p-5 py-3 text-white bg-inherit border-0 outline-none'
                  placeholder='Group Name'
                  value={groupName}
                  />
                </div>

                <div className='lg:flex gap-5 items-center'>
                    <select 
                    onChange={(e) => setGroupType(e.target.value)}
                    value={groupType}
                    name="gType" className=' lg:ml-5 my-4 p-3 text-primaryShade bg-backgroundShade rounded-lg text-xs outline-none'>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                </div>

                <div className='lg:flex gap-5 items-center'>
                  <textarea name="" id=""
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  className='lg:ml-1 my-4  w-full text-XS p-5 py-3 text-white bg-inherit border-0 outline-none overflow-y-hidden'
                  placeholder='Description'
                  ></textarea>
                </div>

                <div className='flex'>
                  <div className='lg:flex gap-5 items-center'>
                    <select 
                    value={currency}
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
                    value={amount}
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

                    {
                      members &&
                      (members.map((member, index) => (
                        <div key={index} className='flex justify-between items-start gap-5 lg:gap-0 lg:justify-between lg:items-center relative flex-col lg:flex-row'>
                          <div className='flex gap-5 pl-5 h-18'>
                              <img 
                              className='w-10 h-10 rounded-full'
                              src={member.photoURL} 
                              alt="" />

                              <div className='h-10 flex flex-col justify-between'>
                                  <div 
                                  className='flex justify-start items-center gap-2 '>
                                      <h3 className='text-white font-bold text-[14px]'>{member.username}</h3>
                                  </div>
                                  <p className='text-yellow-400 text-[10px]'>{`${100/members.length}%`}</p>
                              </div>
                          </div>

                          <div className=' h-[100px] lg:h-10 w-[2px] bg-primary absolute'>

                          </div>

                          <button className='ml-5 bg-yellow-600 text-white font-semibold py-2 px-7 rounded-lg'>Rs. {amount/members.length}</button>
                        </div>
                      )))
                    }                          

                </div>

                <div className='w-full flex justify-end'>
                  <button 
                  onClick={() => updateGroup()}
                  className='text-white font-bold m-5 p-3 px-5 bg-backgroundShade rounded-lg flex justify-center items-center'> <span className='text-xl font-bold text-primary pr-3'>+</span> Update Group</button>
              </div>

              <div className='relative'>
                  <h2 className='text-base p-5 text-white mt-5'>Previous Transactions</h2>
                  <div className='w-[100px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
              </div>
              <div className='bg-backgroundShade w-full p-5 rounded-xl mt-3 flex flex-col gap-8'>
                  {/* <div>
                      You have no previous transactions
                  </div> */}

                  {
                        transactions.length === 0 && (
                            <div className='text-textDim'>
                                You have no previous transactions
                            </div>
                        )
                  }
                  

                  {/* <div className='flex justify-between items-start gap-5 lg:gap-0 lg:justify-between lg:items-center relative flex-col lg:flex-row'>
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
                  </div>                 */}

              </div>

              <div className='bg-backgroundShade w-inherit p-10 rounded-xl my-10 flex flex-col gap-8'>
                <div className='overflow-y-scroll h-[500px] no-scrollbar' id="messages">
                  {
                    messages && 
                    (messages.map((message, index) => (
                      <div key={index} className='flex gap-5'>
                        <img src="https://tse4.mm.bing.net/th?id=OIP.vSuRGgrtiIEx228wtcp_dgHaHa&pid=Api&P=0&h=180" alt="" className='w-10 h-10 rounded-full'/>
                        <div className=''>
                          <h3 className='text-white font-bold text-[14px]'>{message.sender.username}</h3>
                          <p className='text-white bg-background/50 p-5 my-2 rounded-lg'>
                            {message.message}
                          </p>
                        </div>
                      </div>
                    ))
                    )
                  }
                  
                </div>
                <div className='relative'>
                  <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                   className='pr-20 text-white rounded-lg bg-background/50 p-5 py-3 border-0 outline-none w-full h-20 overflow-y-hidden' placeholder='Message...'
                  name="" id=""></textarea>
                  {
                     /^\d+$/.test(message) ? (
                      <div className='absolute bottom-0 right-3 h-full flex justify-center items-center'>
                        <button className='p-3 bg-primary font-semibold text-white px-5 rounded-lg'>Pay</button>
                      </div>
                    ) :(
                      <div className='absolute bottom-0 right-3 h-full flex justify-center items-center'>
                        <button 
                        onClick={() => {createMessage()}}
                        className='p-4 bg-primary font-semibold text-white px-5 rounded-lg'>
                          <IoIosSend className='bg-primary text-xl text-white'/>
                        </button>
                      </div>
                    )
                  }

                </div>
              </div>

            </div>

            <FriendsComponent friends={friends} addToGroup={addToGroup} />

          </div>
      </main>
    </div>
  )
}

export default GroupPage