import React from 'react'
import HeaderLandingPage from '../components/HeaderLandingPage.jsx'
import { useSelector } from 'react-redux';
import Home from './Home.jsx';

const LandingPage = () => {
    const isAuthenticated = useSelector(state => state.auth.status);
    if (isAuthenticated) {
        return <Home />
    }
  return (
    <div className='w-full h-full bg-background'>
        <HeaderLandingPage />
    </div>
  )
}

export default LandingPage