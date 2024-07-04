import React from 'react'
import HeaderLandingPage from '../components/HeaderLandingPage.jsx'
import { useSelector } from 'react-redux';
import Home from './Home.jsx';
import ErrorComponent from '../components/ErrorComponent.jsx';
import SuccessComponent from '../components/SuccessComponent.jsx';

const LandingPage = () => {
    const isAuthenticated = useSelector(state => state.auth.status);
    if (isAuthenticated) {
        return <Home />
    }
  return (
    <div className='w-full h-full bg-background'>
              <ErrorComponent/>
              <SuccessComponent/>
        <HeaderLandingPage />
    </div>
  )
}

export default LandingPage