import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const auth = useSelector((state) => state.auth);
  return(
    auth.authenticated ? children : <Navigate to='signin' replace/>
   )

 }

export default PrivateRoute