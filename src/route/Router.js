import { Route, Routes } from 'react-router-dom';
import SignUp from '../component/SignUp';
import Main from '../component/Main';

import React from 'react'
import Login from '../component/Login';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router;
