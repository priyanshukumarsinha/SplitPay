import React from 'react'

const FriendsComponent = ({friends, addToGroup}) => {

  return (
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