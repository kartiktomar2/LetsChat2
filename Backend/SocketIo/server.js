import express from "express"
import http from "http"
import { Server } from "socket.io";
const app= express();
const server = http.createServer(app)
const io= new Server(server,{
     cors:{
      origin:"http://localhost:3001",
      methods:["GET","POST"]
    }}
  )

  export const getReceiverSocketId=(receiverId)=>{
      return users[receiverId]
  }




  const users={}
// used  to listen events on server side
io.on("connection",(socket)=>{
    // socket represent here an individual client that has connected to socket io
      console.log(`a user connected ${socket.id}`);
      const userId= socket.handshake.query.userId
       if(userId)
       {
           users[userId]=socket.id
       }
       io.emit("getOnlineUsers", Object.keys(users))
      socket.on("disconnect",()=>{
        console.log(`a user disconnected ${socket.id}`);
        delete users[userId]
        io.emit("getOnlineUsers", Object.keys(users))
        
      })
})
export {app,io,server} 