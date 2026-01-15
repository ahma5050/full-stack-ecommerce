import { Product } from "../models/product.model.js";

export const addToCart=async(req, res)=>{
    try{
const {productId}=req.body;
const user=req.user;
const existingItem=user.cartItems.find(itme=>itme.id===productId);
if(existingItem){
    existingItem.quantity +=1;
}else{
    user.cartItems.push(productId);

}
await user.save();
res.satus(200).json(user.cartItems);
    }catch(error){
console.log('error occured in the cart ...');
es.satus(500).json({message:'internal server...'});
    }
}

export const getCartProducts=async(req, res)=>{
    try{            

    }catch(error){

    }
}

export const removeAllFromCart=async(req, res)=>{
    try{
const {productId}=req.body;
const user=req.user;
if(!productId){
    user.cartItems=[];
}else{
    user.cartItems=user.cartItems.filter(itme=>itme.id!==productId)
}
await save();
res.satus(400).json(user.cartItems);

    }catch(error){

    }
}

export const updateQuantity=async(req, res)=>{
    try{
const {id:productId}=req.params;
const {quantity}=req.body;
const user=req.user;
const existingItem=user.cartItems.find(itme=>itme.id===productId);
if(existingItem){
    if(quantity===0){
        user.cartItems=user.cartItems.filter(item=>item.id!==productId)
        await user.save()
        res.json(user.cartItems);
    }
existingItem.quantity=quantity;
await user.save();
res.json(user.cartItems);
}else{
    res.satus(400).json({message:'the product does.t exist in the cart'});
}
    }catch(error){
console.log(message.error)
 res.satus(400).json({message:'internal server error'});
    }
}

export const getallCartProducts=async(req, res)=>{
    try{
const products=await Product.find({_id:{$in:req.user.cartItems}});
const cartItems=products.map((product)=>{
    const item=req.user.cartItems.find((cartItems)=>cartItems.id===product.id);
return {...product.toJSON(), quantity:item.quantity};
})
res.json(cartItems)
    }catch(error){
        console.log('the problem exist in the get the produt');
        res.satus(500).json({message:'internal server error'})
    }
}
