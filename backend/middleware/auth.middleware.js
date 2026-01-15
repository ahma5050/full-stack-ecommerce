import jwt from 'jsonwebtoken'
import User from "../models/auth.model.js";

export const protectRoute=async(req, res, next)=>{
    
    const accessToken=req.cookies.accessToken;
    console.log('toke........', accessToken);
    try{
    if(!accessToken){
        res.status(400).json({message:"un authorized user"});
    }

    try{
    const decoded=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user=await User.findById(decoded.userId);
   if(!user){
    return res.status(400).json({message:"the user is not found"});
   }
   req.user=user;
next();

    }catch(error){
       if(error.name==="TokenExpiredError") {
        res.status(400).json({message:"unauthorized access token expired"})
       }
      throw error
    }
    }catch(error){
        console.log('error occured in protecting route', error.message)
        res.status(500).json({message:"internal server error"});
    }

}

export const adminRoute=async(req, res, next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }else{
        res.status(404).json({message:"access is denaid only admin .."})
    }
}