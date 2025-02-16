import React from 'react'
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
      const {selectedConversation} = useConversation()
    //   console.log(selectedConversation);
        const {onlineUsers}= useSocketContext();
       // updating  online/offline status in right part
        const getOnlineUsersStatus=(userId)=>{
         return  onlineUsers.includes(userId)?"online":"offline";
        }
       console.log(`${getOnlineUsersStatus(selectedConversation._id)}`);
        
    return (
        <div className="relative flex items-center h-[8%] justify-center gap-4 bg-[#1f0e22]   rounded-md">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className='flex space-x-3 items-center justify-center h-[9vh] bg-[#1f0e22]
       '>
            <div>
            <div className={`avatar `}>
                    <div className={`w-12 rounded-full   text-center py-2
                         ring-success  ${getOnlineUsersStatus(selectedConversation._id)==="online"?"ring-offset-green-600":"ring-offset-base-100"}
                          ring ring-offset-2`}>
                      {/* changes in avatar */}
                    
                     <p className="text-xl">{selectedConversation.fullname[0].toUpperCase()}</p>
                     
                    </div>
                </div>
          </div>
          
         
          <div>
                   
                    <h1 className='text-xl  '>{selectedConversation?.fullname}</h1>
                    <span className={`text-sm ${getOnlineUsersStatus(selectedConversation._id)==="online"?"text-green-500":""}` }>{`${getOnlineUsersStatus(selectedConversation._id)}`}</span>
          </div>
          

        </div>
        {/* <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={profile} />
            </div>
          </div>
          <div>
            <h1 className="text-xl">{selectedConversation.fullname}</h1>
            <span className="text-sm">
              {getOnlineUsersStatus(selectedConversation._id)}
            </span>
          </div>
        </div> */}
      </div>
       


        // <div className='flex space-x-3 items-center justify-center h-[9vh] bg-[#1f0e22]
        // hover:bg-gray-700 duration-300'>
        //     <div>
        //     <div className={`avatar `}>
        //             <div className={`w-12 rounded-full   text-center py-2
        //                  ring-success  ${getOnlineUsersStatus(selectedConversation._id)==="online"?"ring-offset-green-600":"ring-offset-base-100"}
        //                   ring ring-offset-2`}>
        //               {/* changes in avatar */}
                    
        //              <p className="text-xl">{selectedConversation.fullname[0].toUpperCase()}</p>
                     
        //             </div>
        //         </div>
        //   </div>
          
         
        //   <div>
                   
        //             <h1 className='text-xl  '>{selectedConversation?.fullname}</h1>
        //             <span className={`text-sm ${getOnlineUsersStatus(selectedConversation._id)==="online"?"text-green-500":""}` }>{`${getOnlineUsersStatus(selectedConversation._id)}`}</span>
        //   </div>
          

        // </div>
    )
}

export default Chatuser
