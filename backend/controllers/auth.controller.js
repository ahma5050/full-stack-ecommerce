import { redis } from "../lib/redis.js";
import User from "../models/auth.model.js";
import jwt from 'jsonwebtoken'

const generetToken=(userId)=>{
const accessToken=jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'})
const refrashToken=jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'})
return {accessToken, refrashToken};
}
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    { ex: 7 * 24 * 60 * 60 } // 7 days
  );
};

const setCookies=(res, accesToken, refrashToken)=>{
    res.cookie('accessToken', accesToken, {
    httpOnly:true,
     secure:process.env.NODE_ENV==="production", 
     sameSite:"strict", max:15*60*1000});

     res.cookie('refrashToken', refrashToken, {
    httpOnly:true,
     secure:process.env.NODE_ENV==="production", 
     sameSite:"strict", max:15*60*1000});
}
export const Signup=async(req, res)=>{
const {email, password, name}=req.body;
try{
    const userExist=await User.findOne({email});
    if(userExist){
        return res.status(400).json({sucess:false, message:"user alredy exist"})
    }
 const user=await User.create({name, email, password});
const {accessToken, refrashToken}=generetToken(user._id)
setCookies(res, accessToken, refrashToken);
await storeRefreshToken(user._id, refrashToken);
      return res.status(201).json({
        ...user._doc, password:undefined,
  success: true,
  message: "The user is created successfully",
 
});

    
} catch (error) {
    console.log("error in signup controller", error.message);
    return res.status(500).json({success:false, message:"internal server error"});
}

}
export const Login=async(req, res)=>{
const {email, password}=req.body;
try{
const user= await User.findOne({email});
if(user && await user.comparePassword(password)){
const {accessToken, refrashToken}=generetToken(user._id)
await storeRefreshToken(user._id, refrashToken);
setCookies(res, accessToken, refrashToken);
return res.status(200).json({...user._doc, password:undefined, success:true, message:"the user is loged in successfuly..."})
}else{
  return res.status(400).json({success:false, message:'Invalid email, password'})
}
}catch(error){
  console.log('error is exist during log in...', error.message)
  res.stauts(400).json({message:"internal server error"})
}

}
export const refreshToken=async(req, res)=>{
  const refreshToken=req.cookies.refrashToken;
  const accessToken=req.cookies.accesToken;
  console.log('a..', accessToken)
  console.log('r..', refreshToken)


  try{
  if(!refreshToken){
    return res.status(400).json({success:false, message:'there are no cookies...'})
  }
  const decoded=await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const storedToken=await redis.get(`refresh_token:${decoded.userId}`)
  if(refreshToken!==storedToken){
    return res.status(400).json({success:true, message:"invalid token"})
  }
  const accessToken=jwt.sign({userId:decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'} )
 res.cookie("accessToken", accessToken, {httpOnly:true, secure:process.env.NODE_ENV==='production', maxAge:15*60*100, sameSite:'strict'})
  res.status(200).json({success:true, message:'the token refresh is fuccessfull'})
  }catch(error){
    console.log("the cooki refresh error");
    return res.status(500).json({message:'internal server error'});
  }

}


export const Logout=async(req, res)=>{
try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		  await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const getProfile=async(req, res)=>{
try{
res.json(req.user);
}catch(error){
res.status(500).json({message:'internal server error...'})
}
}


