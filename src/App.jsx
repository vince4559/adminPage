import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EmployeeDetails from '../src/components/EmployeeDetails'
import SharedComponents from './components/SharedComponents';
import EmployeeForm from '../src/components/EmployeeForm'
import Login from './Auth,jsx/Login';


const App = () => {
  return (
   <>
   <Routes>
      <Route path='/' element={<SharedComponents />}>
      <Route index element={<Home />} />
      <Route path='/form' element={<EmployeeForm />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employee/:id' element={<EmployeeDetails />} />
      </Route>
    </Routes>
   </>
  )
}

export default App

