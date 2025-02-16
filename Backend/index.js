import express from 'express'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
import messageRoute from './routes/message.route.js'
import { app, server } from './SocketIo/server.js'
import path from "path"
configDotenv({
    path:'./.env'
})

app.use(express.json());
app.use(cors());
app.use(cookieParser())

// DB connection start from here
const URI= process.env.MONGODB_URI

try {
       mongoose.connect(URI).then(console.log("DB connected Succesfully"))

} catch (error) {
       console.log("Error while connecting with the database ",error);
       
}
const port= process.env.PORT||5000

// routes
app.use('/api/user',userRoute)
app.use('/api/message',messageRoute)
// code for deployment

if(process.env.NODE_ENV==="production")
{
     const dirPath=path.resolve();

     app.use(express.static("./Frontend/dist"));
     app.get("*",(req,res)=>{
       res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"))
     })
}

server.listen(port, () => {
  console.log(`Server is  listening on port ${port}`)
})