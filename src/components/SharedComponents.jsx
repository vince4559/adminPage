import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar'

const SharedComponents = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}

export default SharedComponents
