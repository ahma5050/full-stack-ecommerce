
import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession=async(req, res)=>{
    
 const { products, couponCode } = req.body;
 try{
if(!Array.isArray(products) || products.length===0){
    return res.status(400).json({message:'invalid or null products'})
}
let totalAmount=0;
const lineItems=products.map((product)=>{
  amount=Math.round(product.price*100);
  totalAmount+=amount*product.quantity;
  return {
    price_data:{
    currency:'usd',
    product_data:{
      name:product.name,
      image:[product.image],
    },
    unit_amont:amount,
    },
    quantity:product.quantity || 1,
  }
})

  let coupon=null;
  if(couponCode){
  coupon = await Coupon.findOne({code:couponCode, userId:req.user._id, isActive:true})
  if(coupon){
  totalAmount-=Math.round((totalAmount*coupon.discountPercentage)/100);
  }
 }

 const sesstion=await stripe.checkout.sesstion.create({
  payment_method_types:['card'],
  line_Items:lineItems,
  mode:'payment',
  success_url:`${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
  disconnect:coupon ? [{coupon:await createStripeCoupon(coupon.discountPercentage),}] : [],
  metadata:{
    userId:req.user._id.toString(),
    couponCode:couponCode || "",
    products:JSON.stringify(products.map((p)=>({
id:p._id,
quantity:p.quantity,
price:p.price
    })))
  }
 })

 if(totalAmount >= 2000){
await createNewCopoun(req.user._id)
 }
  res.status(200).json({id:sesstion.id, totalAmount:totalAmount/100});


  }catch(error){

  }

  
}

async function createNewCopoun(userId){
  await Coupon.findByIdAndDelete(userId);
  const coupon=new Coupon({
    userId:userId,
    discountPercentage:10,
    expirationDate:new Date(Date.now() + 30*24*60*60*1000),
    code:"GIFT"+Math.random().toString(36).substring(2, 8).toUpperCase(),

  })
  await coupon.save();
  return coupon;
}

async function createStripeCoupon(discountPercentage){
  const coupon= await stripe.coupon.create({
    percent_off:discountPercentage,
    duration:'once'
  })
  return coupon;
}

export const createCheckoutsuccess=async(req, res)=>{
  const {sesstionId}=req.boy;
  try{
  const session=await stripe.checkout.session.retrieve(sesstionId);
  if(session.payment_status==='paid'){
    if(session.metadata.couponCode){
    await Coupon.findOneAndUpdate({
      code:session.metadata.couponCode, userId:session.metadata.userId,

    }, {isActive:false})
    }
  }

const products=JSON.parse(session.metadata.product);
const newOrder=new Order({
  user:session.metadata.userId,
  products:products.map((p)=>({
id:p._id,
quantity:p.quantity,
price:p.price,
  totalAmount:session.amount_total/100,
  srtipeSessionId:sesstionId
})),

})

await newOrder.save();
res.status(200).json({message:'payment susccesful, the order is created and coupon is deactiveted'})
  }catch(error){
    console.log('the payment error')
    res.status(500).json({message:'internal server error..'})
  }

}