import React from 'react'
import Card from './Card'

const Cards = () => {

  

  const blogs = [
    {
        id : 1,
        src : "https://flowbite.com/docs/images/blog/image-1.jpg",
        title : "Noteworthy technology acquisitions 2021",
        content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."


    },
    {
        id : 2,
        src : "https://flowbite.com/docs/images/blog/image-1.jpg",
        title : "Noteworthy technology acquisitions 2021",
        content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

    },
    {
        id : 3,
        src : "https://flowbite.com/docs/images/blog/image-1.jpg",
        title : "Noteworthy technology acquisitions 2021",
        content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

    },
    {
        id : 4,
        src : "https://flowbite.com/docs/images/blog/image-1.jpg",
        title : "Noteworthy technology acquisitions 2021",
        content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

    },
    {
        id : 5,
        src : "https://flowbite.com/docs/images/blog/image-1.jpg",
        title : "Noteworthy technology acquisitions 2021",
        content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

    }
  ]
  return (
    <>
    
    <div className='flex flex-wrap justify-start items-left gap-5 mx-5'>
    {
        blogs.map((blog,index) =>
        
    
        <Card blog = {blog}/>
        
        )

    }
    </div>

    </>
  )
}

export default Cards