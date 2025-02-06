import { Outlet } from 'react-router-dom'
import './App.css'

import Navbar from './components/navbar';
import Footer from './components/Footer';
// In index.js or App.js


function App() {

  return (
    <>
  <Navbar/>
  <Outlet/>
  <Footer/>

      
    </>
  )
}

export default App
