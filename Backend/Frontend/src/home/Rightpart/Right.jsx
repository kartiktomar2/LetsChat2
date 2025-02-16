import React, { useEffect } from 'react'
import Chatuser from './Chatuser.jsx'
import Messages from './Messages.jsx'
import Typesend from './Typesend.jsx'
import useConversation from '../../zustand/useConversation.js'
import { useAuth } from '../../context/AuthProvider.jsx'
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const {selectedConversation,setSelectedConversation} = useConversation()
   
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation])
     
  return (
    <div className="w-full bg-[#1a1a2d] text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  )
}

export default Right


const NoChatSelected=()=>{
    // const authUser= JSON.parse(localStorage.getItem("ChatApp"))
      const [authUser]= useAuth()
      // console.log(authUser);
      
     return (
      <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser.user.fullname}
          </span>
          <br />
          No chat selected, please start conversation by selecting anyone from 
          your contacts and if you are not able to see other users please log in again
        </h1>
      </div>
    </div>
     )
}