import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useConversation from '../../zustand/useConversation.js';
import useSendMessage from '../../context/useSendMessage.js';
import toast from "react-hot-toast"
function Typesend() {
  const [message, setMessage] = useState("");
  const {  loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if(message.trim()==="")
      {
        toast.error("please send valid message")
      }
      else {await sendMessages(message);}
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[9vh]  bg-[#1f0e22] items-center">
        <div className=" w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
          />
        </div>
        <button>
        <IoSend className="text-3xl cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default Typesend
