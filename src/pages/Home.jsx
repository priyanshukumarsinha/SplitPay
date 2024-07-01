import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());

        // update the local storage
        localStorage.clear();

        // redirect to login page
        navigate('/');
    
    }
  return (
    <div>Home

        <button
        onClick={() => logoutUser()}
        >Logout</button>
    </div>
  )
}

export default Home