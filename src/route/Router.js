import { Route, Routes } from 'react-router-dom';
import SignUp from '../component/SignUp';
import Main from '../component/Main';

import React from 'react'
import SignIn from '../component/SignIn';
import TodoList from '../component/TodoList';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  )
}

export default Router;
