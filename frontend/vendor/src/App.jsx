import { useState } from 'react'
import { Outlet } from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar';
import DashboardSideBar from './page/layout/DashboardSideBar';

function App() {

  return (
    <>
    <Navbar/>
    <DashboardSideBar/>
     {/* <Footer/> */}
    </>
  )
}

export default App
