import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
  
    const [name, setName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()

        console.log(`name is ${name}`)

        if(name.trim() === "")
        {
          toast.error("name is empty")
          return
        }
        if(email.trim() == "")
        {
          toast.error("email is empty")
          return
        }
        if(password.trim() == "")
        {
          toast.error("password is empty")
          return
        }


        let response = ''
        try {
          response = await axios.post('http://localhost:8000/register', {
            name,
            email,
            password
          });

          toast.success(response.data.message);
      
          console.log(response.data); // Assuming the response contains JSON data
        } catch (error) {
          if (error.response && error.response.status === 400) {
            // Display "Email already exists" message
            console.log(error.response.data.detail);
            // Show the toast message using react-toastify or any other toast library
            toast.error(error.response.data.detail);
        }

        console.log(name , email , password)
    }
  }
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input id="name" onChange={(e)=>setName(e.target.value)}  name="name" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
            
          </div>

          
          <div class="mt-2">
            <input id="email" onChange={(e)=>setEmail(e.target.value)} name="email" type="email"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            
          </div>

          
          <div class="mt-2">
            <input id="password" onChange={(e)=>setPassword(e.target.value)} name="password" type="password"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <button type="submit"  onClick={handleSubmit} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
  )
}

export default Registration