import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from '../../context/useGetAllUsers.jsx';
import { all } from 'axios';
import useConversation from '../../zustand/useConversation.js';
import toast from 'react-hot-toast';


function Search() {
     const [search,setSearch]= useState("")
      const [allUsers]=useGetAllUsers()
      
      const {setSelectedConversation}= useConversation()
     const handleSubmit=(e)=>{
         e.preventDefault();
         if(!search) return ;
         const conversation=allUsers.find(
          (user)=>user.fullname?.toLowerCase().includes(search.trim().toLowerCase())
          
        )
        if(conversation)
        {
          setSelectedConversation(conversation);
          setSearch("")
        }
        else
        {
          toast.error("User not found")
          setSearch("")
        }
     }
       
   
  return (
    <div className='h-[10vh] bg-slate-950'>
      <div className='px-6 py-4'>
       <form onSubmit={handleSubmit}>
      <div className=' flex space-x-3  '>
      <label className="border-[1px] border-gray-700 rounded-lg p-3 bg-slate-900 w-[80%] ">
  
  <input type="search" className="grow  outline-0  border-0 w-[100%] " placeholder="Search" 
          value={search}
          onChange={(e)=>setSearch(e.target.value)}/>

    </label>
   <button className='  '>
   <FaSearch  className='text-5xl p-2 hover:bg-gray-600  rounded-full duration-300 '/>
   </button>
      </div>
       </form>
    </div>
    </div>
  )
}

export default Search
