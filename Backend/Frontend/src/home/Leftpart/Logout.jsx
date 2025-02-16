import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios"
import toast from 'react-hot-toast';
function Logout() {

    const[ loading,setLoading]= useState(false);

    const handleClick= async()=>{
      setLoading(true)
            try{
                     await axios.post("/api/user/logout")
                     localStorage.removeItem("ChatApp")
                     setLoading(false)
                     toast.success("Logged out Succesfully")
                     
                     setTimeout(()=>window.location.reload(),500)
            }
            catch(error)
            {
              console.log("error in log out ", error);
              toast.error("error in log out")
              
            }
    }
  return (
    <div className='h-[10vh]'>
        <BiLogOutCircle  className='text-5xl text-white hover:bg-slate-700 duration-300  cursor-pointer rounded-full p-2 m-3' onClick={handleClick}/>
    </div>
  )
}

export default Logout
