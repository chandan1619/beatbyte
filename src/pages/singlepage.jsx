import React from 'react'
import TopBar from '../components/TopBar'
import SinglePage from '../components/SinglePage'
import Footer from '../components/Footer'

const singlepage = () => {
  return (
    <div className='min-w-screen min-h-screen'>
    <TopBar/>
    <SinglePage />
    <Footer/>
    </div>
  )
}

export default singlepage