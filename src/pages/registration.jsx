import React from 'react'
import TopBar from '../components/TopBar'
import Registration from '../components/Registration'
import Footer from '../components/Footer'

const registration = () => {
  return (
    <div className='min-w-screen min-h-screen'>
    <TopBar/>
    <Registration/>
    <Footer/>
    </div>
  )
}

export default registration