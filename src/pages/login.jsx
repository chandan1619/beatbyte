import React from 'react'
import TopBar from '../components/TopBar'
import Login from '../components/Login'
import Footer from '../components/Footer'


const login = () => {
  return (
    <div className='min-w-screen min-h-screen'>
    <TopBar/>
    <Login/>
    <Footer/>
    </div>
  )
}

export default login