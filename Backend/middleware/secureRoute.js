import jwt from "jsonwebtoken"
import User from "../models/user.model.js";



const secureRoute=async(req,res,next)=>{
      const token=await req.cookies.jwt;

      try {
        if(!token)
        {
          return res.status(401).json({error:"Please Provide Token"})
        }
  
        const decodedToken= jwt.verify(token,process.env.JWT_TOKEN);
        if(!decodedToken)
        {

            return res.status(401).json({error:"Invalid Token"})
        } 
        
        
         const user= await User.findById(decodedToken.userId).select(" -password ")
          if(!user)
          {
            return res.status(401).json({error:"No user found"})
          }
           req.user= user
           next()
      } catch (error) {
            console.log("Error is secure route "+ error );
            return res.status(500).json({error:"Internal Server Error"})
            
      }
      
}

export default secureRoute