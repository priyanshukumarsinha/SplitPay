import React from 'react'
import ErrorComponent from '../components/ErrorComponent.jsx';
import SuccessComponent from '../components/SuccessComponent.jsx';
import { useParams } from 'react-router-dom';
import HeaderGroupComponent from '../components/HeaderGroupComponent.jsx';

const GroupPage = () => {
  const {id} = useParams()
  return (
    <div>
      <ErrorComponent />
      <SuccessComponent />
      <HeaderGroupComponent />
    </div>
  )
}

export default GroupPage