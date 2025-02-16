import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'
import toast from "react-hot-toast"
function Login() {

      const [authUser,setAuthUser]= useAuth();



    const [visible,setVisible]= useState("password")
            const handleClick=()=>{
                if(visible==="password")
                {
                    setVisible("text")
                }
                else{
                    setVisible("password")
                }
            }
            const {
                    register,
                    handleSubmit,
                    watch,
                    formState: { errors },
                  } = useForm()

                  const onSubmit = async(data) => {
                    const userInfo={
                       
                       email:data.email,
                       password:data.password,
                       
                    }
                    await axios.post("/api/user/login",userInfo)
                    .then((response)=>{
                        toast.success('Logged in succesfully');
                              localStorage.setItem("ChatApp",JSON.stringify(response.data))
                              setAuthUser(response.data)
                    })
                    .catch((error)=>{
                       
                       
                       if(error.response)
                       {
                           toast.error("Error: "+error.response.data.error)
                          
                       }
                    })
             }     

    return (
        <div className='bg-slate-900 h-screen flex items-center justify-center'>
            <form
             onSubmit={handleSubmit(onSubmit)}
             className='border border-white px-6 py-2 rounded-md space-y-3 w-96'>
                <h1 className='text-2xl text-center font-bold text-white'>Let's<span className='text-green-500 font-semibold'> Chat</span></h1>
                <h2 className='text-xl font-bold text-white'>Log In</h2>
                <br />
               

                {/* email */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    required />
                </label>


                {/* password */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={handleClick}><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                    <input type={visible} required placeholder="Password"
                    {...register("password", { required: true })}
                    minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                </label>

                
                {/* text and button */}
                <div className='flex justify-between mr-3 text-white'>
                    <p>New User? <Link to='/signup'  className='text-blue-500 underline cursor-pointer'>Sign up</Link ></p>
                    <input type="submit" value="Log In"  className='text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer'/>
                </div>
            </form>
        </div>
    )
}

export default Login
