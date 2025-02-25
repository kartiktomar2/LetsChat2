import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from '../context/AuthProvider.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'



function Signup() {

     
     const [authUser,setAuthUser]= useAuth()

    
    // seetting view or hide password functionality
    const [visible, setVisible] = useState("password")
    const handleClick = () => {
        if (visible === "password") {
            setVisible("text")
        }
        else {
            setVisible("password")
        }
    }
     


    // fetching response from the form and storing data in  localstorage 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
             const userInfo={
                fullname:data.fullname,
                email:data.email,
                password:data.password,
                confirmPassword:data.confirmPassword
             }
               await  axios.post("/api/user/signup",userInfo)
             .then((response)=>{
                       
                       toast.success("Signed Up succesfully")
                       localStorage.setItem("ChatApp",JSON.stringify(response.data))
                       console.log(response.data);
                       
                       setAuthUser(response.data)
             })
             .catch((error)=>{
                
                
                if(error.response)
                {
                    toast.error("Error: "+error.response.data.error)
                    
                }
             })
      }





        const password = watch("password","")
        const confirmPassword= watch("confirmPassword","")
      const   validatePasswordMatch=(value) =>{
           return  value===password || "password do not match "
      }
    return (
        <div className='bg-slate-900 h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}
                className='border border-white px-6 py-2 rounded-md space-y-3 w-96'>
                <h1 className='text-2xl text-center font-bold text-white'>Let's
                    <span className='text-green-500 font-semibold'> Chat</span></h1>
                <h2 className='text-xl font-bold text-white'>SignUp</h2>
                <br />
                {/* for username */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                    <input type="input" required placeholder="fullname"
                        {...register("fullname", { required: true })}
                        pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
                </label>
                

                {/* email */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" placeholder="Enter Your Email"
                       {...register("email", { required: true })}
                        required />
                </label>
                

                {/* password */}
                <label className="input validator" >
                {
                       visible==="password"?
                        (<svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={handleClick}><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>):<svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"  xml:space="preserve" onClick={handleClick}><path  d="M1303.413 1025.017V663.449c0-153.889-125.904-281.803-279.793-281.597-153.895.206-279.033 125.47-279.033 279.412v82.191c0 34.753-28.173 62.926-62.926 62.926s-62.926-28.173-62.926-62.926v-82.191c0-54.682 10.724-107.763 31.873-157.766 20.415-48.266 49.627-91.6 86.825-128.799 37.2-37.199 80.534-66.411 128.799-86.825C916.236 266.724 969.316 256 1023.999 256c54.683 0 107.763 10.724 157.767 31.874 48.265 20.414 91.6 49.627 128.799 86.825 37.198 37.198 66.41 80.532 86.826 128.799 21.15 50.003 31.874 103.082 31.874 157.766v363.752h-125.852z"/><path  d="M1553.511 1792H494.489c-22.091 0-40-17.909-40-40V961.791c0-22.091 17.909-40 40-40h1059.022c22.091 0 40 17.909 40 40V1752c0 22.091-17.908 40-40 40z"/><g><path  d="M1077.454 1377.325v172.107H970.546v-172.107c-35.556-19.074-59.728-56.609-59.728-99.783 0-62.511 50.671-113.182 113.182-113.182s113.182 50.671 113.182 113.182c0 43.173-24.172 80.709-59.728 99.783z"/></g></svg>

                        }
                    <input type={visible} required placeholder="Password"
                        {...register("password", { required: true })}
                        minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                </label>
               
                {/* confirm password */}
                <label className="input validator">
                {
                       visible==="password"?
                        (<svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={handleClick}><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>):<svg className="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"  xml:space="preserve" onClick={handleClick}><path  d="M1303.413 1025.017V663.449c0-153.889-125.904-281.803-279.793-281.597-153.895.206-279.033 125.47-279.033 279.412v82.191c0 34.753-28.173 62.926-62.926 62.926s-62.926-28.173-62.926-62.926v-82.191c0-54.682 10.724-107.763 31.873-157.766 20.415-48.266 49.627-91.6 86.825-128.799 37.2-37.199 80.534-66.411 128.799-86.825C916.236 266.724 969.316 256 1023.999 256c54.683 0 107.763 10.724 157.767 31.874 48.265 20.414 91.6 49.627 128.799 86.825 37.198 37.198 66.41 80.532 86.826 128.799 21.15 50.003 31.874 103.082 31.874 157.766v363.752h-125.852z"/><path  d="M1553.511 1792H494.489c-22.091 0-40-17.909-40-40V961.791c0-22.091 17.909-40 40-40h1059.022c22.091 0 40 17.909 40 40V1752c0 22.091-17.908 40-40 40z"/><g><path  d="M1077.454 1377.325v172.107H970.546v-172.107c-35.556-19.074-59.728-56.609-59.728-99.783 0-62.511 50.671-113.182 113.182-113.182s113.182 50.671 113.182 113.182c0 43.173-24.172 80.709-59.728 99.783z"/></g></svg>

                        }
                    <input type={visible} required placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true,validate:validatePasswordMatch })}
                        minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                </label>
                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}

                {/* text and button */}
                <div className='flex justify-between mr-3 text-white'>
                    <p>Have an account? <Link to='/login' className='text-blue-500 underline cursor-pointer'>Login</Link></p>
                    <input type="submit" value="SignUp" className='text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer' />
                </div>
            </form>
        </div>
    )
}

export default Signup
