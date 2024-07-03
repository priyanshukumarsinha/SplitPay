const getFriends = async() => {
    console.log(localStorage.getItem('accessToken'))
    const options = {
      method: 'GET',
      credentials : 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
  }
  
    return await fetch('http://127.0.0.1:3000/api/user/following', options);
}