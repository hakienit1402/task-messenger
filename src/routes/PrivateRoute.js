import React from 'react';
import { Navigate  } from 'react-router-dom';
const PrivateRoute = ({children}) => {
  const auth = localStorage.getItem('authMess') ? JSON.parse(localStorage.getItem('authMess')) : false;
  return(
    auth ? children : <Navigate to='signin'/>
   )

 }

export default PrivateRoute