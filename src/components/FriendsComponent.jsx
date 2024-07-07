import React, { useCallback, useEffect } from 'react'
import { SERVER_URI } from '../constants'

const FriendsComponent = ({addToGroup}) => {
  const [search, setSearch] = React.useState('')
  const [searchedUser, setSearchedUser] = React.useState([])
  const [showSearch, setShowSearch] = React.useState(false)
  const [following, setFollowing] = React.useState(false)
  const [friends, setFriends] = React.useState([])

  React.useEffect(() => {
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

  const startSearch = useCallback(async(value) => {
    // set search value
    setSearch(value)

    // if search value is empty, return
    if(value === '') return showSearch(false)

    // get data from the server
    const response = await fetch(`${SERVER_URI}/api/user/user/${value}`)
    const data = await response.json()

    // set the searched user
    setSearchedUser(data)

  })


  const follow = async(user) => {
    // get the user from the server
    const response = await fetch(`${SERVER_URI}/api/follow/${user?.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const data = await response.json()

    // update the friends list
    if(friends)
    setFriends([...friends, {following : data.data.following}])
    else
    setFriends([{following : data.data.following}])

  }

  const unfollow = async(user) => {
    // get the user from the server
    const response = await fetch(`${SERVER_URI}/api/unfollow/${user.username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
    const data = await response.json()

    // update the friends list
    setFriends(friends.filter(friend => friend.following?.username !== user?.username))
  }

  useEffect(() => {
  }, [searchedUser])

  return (
    <div className='w-[30%] bg-backgroundShade p-5 rounded-lg sticky top-10 h-[500px] hidden lg:flex lg:flex-col'>
    <div className='relative flex justify-between items-center'>
            <h2 className='text-base p-5 text-white'>Friends</h2>
            <div className='w-1/2 text-xs'>
                <input 
                onChange={(e) => startSearch(e.target.value)}
                type="text" placeholder='Search Friends' className='bg-gray-200 px-5 py-3 outline-none rounded-lg w-40 text-background' />
            </div>
            <div className='w-[50px] bg-primary p-[1px] absolute bottom-3 left-5'></div>
    </div>
    {
      search && (
        <div className='p-5 bg-background rounded-lg h-20 my-5 overflow-y-scroll no-scrollbar'>
        {
          // if the searched User is founded then show the user
          // else show the message that no user with this username is found
          searchedUser.data ? (
            <div className='flex justify-between items-center relative'>
                <div className='flex gap-5 '>
                    <img 
                    className='w-10 h-10 rounded-full'
                    src={searchedUser.data.user.photoURL} 
                    alt="" />
  
                    <div className='h-10 flex flex-col justify-between'>
                        <div 
                        className='flex justify-start items-center gap-2'>
                            <h3 className='text-white font-bold text-[14px]'>{searchedUser.data.user.username}</h3>
                        </div>
                        <p className='text-yellow-400 text-[10px]'>{searchedUser.data.user.phoneNumber}</p>
                    </div>
  
                    <div className='absolute right-0'>
                      {
                        // if the user is following then show the following button
                        // else show the follow button
                        friends &&
                        friends.find(friend => (friend.following.id === searchedUser.data.user.id)) ?
                        (
                          <button 
                          onClick={() => unfollow(searchedUser.data.user)}
                          className='bg-primary text-white px-5 py-2 rounded-lg'>Following</button>
                        )
                        : 
                        (
                          <button 
                          onClick={() => follow(searchedUser.data.user)}
                          className='bg-primary text-white px-5 py-2 rounded-lg'>Follow</button>
                        )
                      }
                      
                    </div>
                </div>
            </div>
          ) :("No User Found")
        }
          
      </div>
      )
    }
    <div className='flex flex-col gap-8'>
      

      {
        friends && 
        (
          friends.map((friend, index) => 
            (
            <div key= {index} className='flex justify-between items-center relative'>
              <div className='flex gap-5 pl-5'>
                  <img 
                  className='w-10 h-10 rounded-full'
                  src={friend.following.photoURL} 
                  alt="" />

                  <div className='h-10 flex flex-col justify-between'>
                      <div 
                        onClick={() => (addToGroup && addToGroup(friend.following))}
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
  )
}

export default FriendsComponent