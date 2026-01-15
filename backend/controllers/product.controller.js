import { redis } from "../lib/redis.js";
import { Product } from "../models/product.model.js"


export const getallProducts=async(req, res)=>{
    try{
const products=await Product.find({});
res.satus(200).json({products});
    }catch(error){
console.log('error ocoured in get all product', error.message)
res.status(500).json({message:'internal server error'})
    }
}

export const getFeaturedProduct=async(req, res)=>{
    try{
let featuredProduct=await redis.get('featured_products');
if(featuredProduct){
    return res.status(200).json(JSON.parse(featuredProduct));
}
featuredProduct=await Product.find({isfeature:true}).lean();
if(!featuredProduct){
    return res.status(404).json({message:"no features products..."})
}
await redis.set("feature_products", JSON.stringify(featuredProduct))
res.satus(200).json(featuredProduct);

    }catch(error){
console.log('error is occured in getFeaturesProduct ..', error.message)
res.satus(500).json('internal server error...')
    }
}

export const createProduct=async(req, res)=>{
    try{
const {name, description, price, image, category}=req.body;
let cloudinaryResponse=null;
if(image){
    cloudinaryResponse=await cloudinary.uploader.upload(image, {folder:'products'})
}
const products=await products.create({name, description, price, image:cloudinaryResponse ?.secure_url ? cloudinaryResponse?.secure_url:"", category})
res.status(200).json(products)
    }catch(error){
        console.log('error is created on product controller')
        res.status(500).json({message:"internal server error..."})
    }
}

export const deleteProduct=async(req, res)=>{
    try{
const product=await Product.findById(req.params.id)
if(!product){
    return res.status(400).json({message:'there is no product found'});
}
const publicid = product.image.split('/').pop().split('.')[0];
try{
await cloudinary.uploader.deystroy(`product/${publicid}`);
console.log('the image  is deleted from cloudinary');
}catch(error){
console.log('the errror ocured from cloudinary');
}
await Product.findOneAndDelete(req.params.id);
res.status(200).json({message:"the product is deleted successfully.."})
    }catch(error){

    }
}

export const getRecommendationProducts=async(req, res)=>{
   try{
const products=await Product.aggregate([{$sample:{size:3}}, {$project:{_id:1, name:1, description:1, image:1, price:1}}])
res.json(products);
   }catch(error){
console.log('error occured get recomendations products', error.message);
   } 
}

export const getProductByCategory=async(req, res)=>{
    const {category} = req.params;
    try{
const products=await Product.findById({category});
res.status(200).json(products);
    }catch(error){
        console.log('error is occured in category products...')
        res.status(500).json({message:'inernal server error....'})
    }

}

export const toggleFeaturedProduct=async(req, res)=>{
    try{
    const product=await Product.findById(req.params.id);
    if(product){
product.isFeatured=!product.isFeatured;
const updetedProduct = await product.save()
await updateFeaturedProductsCache();
res.satus(200).json(updetedProduct);
    }else{
        res.status(400).json({message:'product not found...'})
    }

}catch(error){
    console.log('error created on featured toggle product...')
    res.satus(500).json({message:"internal error..."})
}
}

async function updateFeaturedProductsCache(){
try{
const featuredProducts=await Product.find({isFeatured:true}).lean();
 await redis.set('featured_products', JSON.stringify(featuredProducts));
}catch(error){
console.log('error occured in featuredProducts...')
}
}
