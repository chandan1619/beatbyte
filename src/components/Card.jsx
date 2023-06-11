import React from 'react'
import {Link} from 'react-router-dom'

const Card = (prop) => {
  return (
  <>
   

   <div className="flex justify-items-center items-center align-middle">
	<div className="container max-w-5xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">
		<div className="flex items-center justify-between">
			<span className="text-sm dark:text-gray-400">{new Date(prop.blog.date_added).toLocaleDateString('en-US', {year: 'numeric',month: 'short',day: 'numeric'})}</span>
			<a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900">{prop.blog.title}</a>
		</div>
		<div className="mt-3">
			<a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{prop.blog.description}</a>
			<p className="mt-2">{prop.blog.content.length > 300 ? prop.blog.content.substring(0,300):prop.blog.content } .....</p>
		</div>
		<div className="flex items-center justify-between mt-4">
            <Link to = {`/blog/${prop.blog.id}`} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more 
                <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
			<div>
				<a rel="noopener noreferrer" href="#" className="flex items-center">
					<img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
					<span className="hover:underline dark:text-gray-400">{prop.blog.name}</span>
				</a>
			</div>
		</div>
        </div>
</div>

   
</>)
}

export default Card