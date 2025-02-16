
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const signup= async(req,res)=>{
       const {fullname,email,password,confirmPassword}=req.body;
        
       try {
        if([fullname,email,password,confirmPassword].some((field)=>field?.trim()==="")){
         return res.status(400).json({error:"all feilds are required"})
         }
          if(!email.includes('@'))
          {
            return res.status(400).json({error:"provide valid email"})
          }

        const user= await User.findOne({email})
        if(user)
        {
          return res.status(400).json({error:"This user already exists"})
        }
 
        if(password!==confirmPassword)
        {
         return res.status(400).json({error:"Passwords does not match "})
        }

        let hashPassword= await bcrypt.hash(password,10);
        const newUser= new User({
         fullname,
         email,
         password:hashPassword
        })


         await  newUser.save();

        if(newUser)
        {
          createTokenAndSaveCookie(newUser._id,res);
        res.status(200).json({"user":{_id:newUser._id,fullname:newUser.fullname,email:newUser.email},newUser})
          
        }

       } catch (error) {
            console.log("error while registering user ",error);
            res.status(500).json({error:"Internal server error"})
            
       }

}


export const login=async (req,res)=>{
  const {email,password}= req.body;      
  try {
           
           
            if([email,password].some((field)=>field?.trim()===""))
            {
              return res.status(400).json({error:"all fields are required"})
            }
  
          // finding if user exists or not 
          const user=await User.findOne({email})
          if(!user)
          {
            return   res.status(400).json({error:"This user does not exists"});
          }

          
          if(!(await bcrypt.compare(password,user.password)))
          {
            return res.status(400).json({error:"Invalid User Credentials"})
          }
          
           createTokenAndSaveCookie(user._id,res);
          res.status(200).json({message:"user logged in succesfully",user:{
                   _id:user._id,
                   fullname:user.fullname,
                   email:user.email,
                  
                  

          }})
          
        } catch (error) {
          console.log("error while log in  ",error);
          res.status(500).json({error:"Internal server error"})
        }
         
}

export const logout= async(req,res)=>{
      try {
             res.clearCookie("jwt")
             res.status(200).json({message:"User Logout successfully"})
      } catch (error) {
        console.log("error while logging  out user  ",error);
        res.status(500).json({error:"Internal server error"})
      }
}

export const allUsers=async (req,res)=>{
  try{  
        const loggedInUser=req.user._id;
        const filteredUser= await User.find({_id:{$ne: loggedInUser}}).select(" -password ")
        res.status(201).json(filteredUser)
  }
  catch(error)
  {
      console.log("Error while fetching users "+ error);
      
  }
}