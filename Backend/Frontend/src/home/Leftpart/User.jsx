import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

function User({user}) {

  const {selectedConversation,setSelectedConversation}= useConversation()
  const isSelected=selectedConversation?._id===user._id;
  const {socket,onlineUsers}= useSocketContext()
  const isOnline= onlineUsers?.includes(user._id)
  // console.log(isOnline);
  
  // console.log(`avatar-${isOnline?"online":""}`);
  
  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-slate-700":""}`} onClick={()=>setSelectedConversation(user)} > 
          <div className='flex space-x-4 px-6 py-3 hover:scale-105 duration-300 cursor-pointer'>
                <div className={`avatar  `}>
                    <div className={`w-12 rounded-full   text-center pt-2
                      ring-success ${isOnline?"ring-offset-green-600":"ring-offset-base-100"}  
                      ring ring-offset-2 `}>
                      {/* changes in avatar */}
                    
                     <p className="text-xl">{user.fullname[0].toUpperCase()}</p>
                     
                    </div>
                </div>
                   <div>
                    <h1 className='font-bold'>{user.fullname}</h1>
                    <span className={`${isOnline?"text-green-500 font-bold":""}`}>{`${isOnline?"online":"offline"} `}</span>
                   </div>
            </div>
    </div>
  )
}

export default User
