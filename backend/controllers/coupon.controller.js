import Coupon from "../models/coupon.model.js"
export const getCoupon=async(req, res)=>{
 try{
const coupon=await Coupon.findOne({userId:req.user._id, isActive:true})
res.json(coupon || unll);

 }catch(error){
    confirm.log(error.message)
    res.status(500).json({message:'internal server error'});
 } 
}

export const validateCoupon=async(req, res)=>{
   try{
const {code}=req.body;
const coupon=await Coupon.findOne({code:code, userId:req.user._id, isActive:true});
if(!coupon){
return res.status(404).json({message:'coupon ot found..'})
}
if(coupon.expirationDate < new Date()){
   coupon.isActive=false;
   await coupon.save();
   return res.status(404).json({message:'coupon is expairdate'})
}
res.json({message:'coupon is valid', code:coupon.code, discountPercentage:coupon.discountPercentage})
   }catch(error){
      console.log(error.message);
      res.status(500).json({message:'internal server error'})
   }
}
