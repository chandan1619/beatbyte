import React from 'react'
import { useParams, Link } from 'react-router-dom';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

const SinglePage = () => {

    const { id } = useParams();

    console.log(id)


  return (
<div class="mt-6 bg-gray-50">
                  <div class=" px-10 py-6 mx-auto">
                        
                      
                     <div class="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
                        
		                <a href="#_" class="block transition duration-200 ease-out transform hover:scale-110">
	                        <img class="object-cover w-full shadow-sm h-full" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80" />
	                    </a>

		                <div class="flex items-center justify-start mt-4 mb-4">
                        	<a href="#"class="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4">Django</a>
                        	<a href="#"class="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4">Python</a>
                        	<a href="#"class="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500">web development</a>
                         </div>
                        <div class="mt-2">
                        	
                        	<a href="#"
                                class="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline">Django Authentication with oauth using facebook,twitter and google</a>

                              
                                <div class="flex justify-start items-center mt-2">
                                	<p class="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">3000</p>
                                	<p class="text-sm text-gray-400 font-bold ml-5">Views</p>
                                
                                </div>

                               
                               <div class="font-light text-gray-600 flex items-center border-2 justify-between">
	                              
	                        		<a href="#" class="self-start flex items-center mt-6 mb-6"><img
	                                        src="https://avatars.githubusercontent.com/u/71964085?v=4"
	                                        alt="avatar" class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
	                                    <h1 class="font-bold text-gray-700 hover:underline">By James Amos</h1>
	                                </a>
                                <div className="flex float-right gap-3 px-4">
                                <Link to = {`/blog/${id}/edit` }> <BorderColorSharpIcon className = "self-end hover:bg-green-100 cursor-pointer"/> </Link>
                                <DeleteForeverSharpIcon className = "self-end hover:bg-red-100 cursor-pointer"/>
                                </div>

                        	  </div>
                       </div>
                    
                 <div class="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">

                 	<div>
                        	<p class="mt-2 p-8">If you created a web application and wanted it to grow a user base reall quickly,the easiest way is to avoid bothering them with alot forms. No one likes filling up forms! A web form should and must only be used when necessary,in case a user doesnt have account with any of the social networks.That is the moment you want to implement social login on your application.</p>
                     </div>

                     

				        </div>
				    </div>

		<h2 class="text-2xl mt-4 text-gray-500 font-bold text-center">Related Posts</h2>
		<div class="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
            

            <div class="grid grid-cols-12 col-span-12 gap-7">
                <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <a href="#_" class="block transition duration-200 ease-out transform hover:scale-110">
                        <img class="object-cover w-full shadow-sm h-full" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80" />
                    </a>
                    <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div class="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Flask</span>
                        </div>
                        <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Oauth using facebook with flask,mysql,vuejs and tailwind css</a></h2>
                    <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using facebook.</p> 
                    </div>
                </div>

                <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <a href="#_" class="block transition duration-200 ease-out transform hover:scale-110">
                        <img class="object-cover w-full shadow-sm h-full" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80" />
                    </a>
                    <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div class="bg-red-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Django</span>
                        </div>
                        <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Authenticating users with email verification in Django apps</a></h2>
                         <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your web application by sending secure links to their email box.</p> 
                    </div>
                </div>

                <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <a href="#_" class="block transition duration-200 ease-out transform hover:scale-110">
                        <img class="object-cover w-full shadow-sm h-full" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80" />
                    </a>
                    <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div class="bg-purple-500 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Flask</span>
                        </div>
                        <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#_">Creating user registration and authentication system in flask</a></h2>
                         <p class="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using flask and mysql db.</p> 
                    </div>
                </div>
            </div>

        </div>


			 <div class="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
						        
				<div class="w-full mt-16 md:mt-0 ">
				   <form class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
					   <h3 class="mb-6 text-2xl font-medium text-center">Write a comment</h3>
					   <textarea type="text" name="comment" class="w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" placeholder="Write your comment" rows="5" cols="33"></textarea>
					   <input type="submit" value="Submit comment" name="submit" class=" text-white px-4 py-3 bg-blue-500  rounded-lg" />
				   </form>
			   </div>
		    </div>


	
				
		<div class="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay  px-0 px-8 mx-auto sm:px-12 xl:px-5">
		        
		        <p class="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
		            All comments on this post
		        </p>
		 \
		        <div class="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">

		        	<a href="#" class="flex items-center mt-6 mb-6 mr-6"><img src="https://avatars.githubusercontent.com/u/71964085?v=4" alt="avatar" class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
			        </a>

		            <div><h3 class="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">By James Amos</h3>
		            	<p class="text-sm font-bold text-gray-300">August 22,2021</p>
		            	<p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
		               Please help with how you did the migrations for the blog database fields.I tried mine using exactly what you instructed but its not working!!.</p>
		            </div>
		            
		        </div>
		  
		        <div class="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">

		        	<a href="#" class="flex items-center mt-6 mb-6 mr-6"><img src="https://avatars.githubusercontent.com/u/71964085?v=4" alt="avatar" class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
			        </a>

		            <div><h3 class="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">By James Amos</h3>
		            	<p class="text-sm font-bold text-gray-300">August 22,2021</p>
		            	<p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
		                Especially I dont understand the concepts of multiple models.What really is the difference between the blog model and blogApp model? Am stuck</p>
		            </div>
		        </div>

		    </div>
		  </div>
	  </div>
    
  )
}

export default SinglePage