import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const Cards = () => {

  

  // const blogs = [
  //   {
  //       id : 1,
  //       src : "https://flowbite.com/docs/images/blog/image-1.jpg",
  //       title : "Noteworthy technology acquisitions 2021",
  //       content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."


  //   },
  //   {
  //       id : 2,
  //       src : "https://flowbite.com/docs/images/blog/image-1.jpg",
  //       title : "Noteworthy technology acquisitions 2021",
  //       content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

  //   },
  //   {
  //       id : 3,
  //       src : "https://flowbite.com/docs/images/blog/image-1.jpg",
  //       title : "Noteworthy technology acquisitions 2021",
  //       content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

  //   },
  //   {
  //       id : 4,
  //       src : "https://flowbite.com/docs/images/blog/image-1.jpg",
  //       title : "Noteworthy technology acquisitions 2021",
  //       content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

  //   },
  //   {
  //       id : 5,
  //       src : "https://flowbite.com/docs/images/blog/image-1.jpg",
  //       title : "Noteworthy technology acquisitions 2021",
  //       content : "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."

  //   }
  // ]

    const [blogs,setBlogs] = useState([])

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get("http://localhost:8000/blogs");
          setBlogs(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching blog posts:", error);
        }
      };
    
      fetchPosts();
    }, []);

  


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