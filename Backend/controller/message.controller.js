import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIo/server.js";
import { Server } from "socket.io";
export const sendMessage=async(req,res)=>{
      // console.log(`Message sent by id:${req.params.id} and message is ${req.body.message} `);
    try {
           
          const {message}= req.body;
          const {id:recieverId}=req.params;
          const senderId= req.user._id;// current logged in user we are able to access it using secure route middleware
          let conversation = await Conversation.findOne({members:{$all:[senderId,recieverId]  }})
          if(!conversation)
          {
            conversation=await Conversation.create({members:[senderId,recieverId]})
          }

          const newMessage=new Message({
             senderId,
             recieverId,
             message
          })

          if(newMessage)
          {
           conversation.messages.push(newMessage._id);
          }

          await Promise.all([conversation.save(),newMessage.save()])// these both will get save at same time 

          const receiverSocketId=getReceiverSocketId(recieverId)
          if(receiverSocketId)
          {
            io.to(receiverSocketId).emit("newMessage",newMessage)
          }

         // first it was this but using this i was not able to fetched sender id of new messages 
      //     res.status(201).json({messages:"Message sent seccessfully",newMessage})
                res.status(201).json(newMessage)


    } catch (error) {
         console.log("Error in sendMessage", error);
         res.status(500).json({error:"Internal Server Error"})
         
    }     
}

export const getMessage=async(req,res)=>{

       try {
            const {id:chatUser}=req.params;
            const senderId= req.user._id 
            let conversation = await Conversation.findOne({
                  members:{$all:[senderId,chatUser]}
            }).populate("messages");

              if(!conversation)
                              {
                            
                              return res.status(201).json([])
                              }
              const messages= conversation.messages;
              res.status(201).json(messages)            

       } catch (error) {
              console.log("error in get Message", error);
              res.status(500).json({error:"Internal Server Error"})

                  
              
       }



      // code written by me is also correct
      // first we have to find sender id and reciever id
      // then we have to fetch their messages from db 
      // try {
      //       const {id:recieverId}= req.params;
      //       const senderId= req.user._id;
      //       const conversation = await Conversation.findOne({members:{$all:[senderId,recieverId]}});
      //       if(!conversation)
      //             {
      //             //   conversation=await Conversation.create({members:[senderId,recieverId]})
      //             return res.status(201).json([])
      //             }
               
            
      //       const completeInfo= await Message.findOne({senderId});

            
      //       const data= completeInfo.messages;
      //       res.status(201).json({message:"Messages Fetched Successfully",data})
      // } catch (error) {
      //          console.log("Error in get Message", error);
      //          res.status(500).json({error:"Internal server error"})
               
      // }
       
}