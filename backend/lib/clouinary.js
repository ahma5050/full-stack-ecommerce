import {v2 as clodinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();
clodinary.config({
    cloud_name:process.env.CLOUDINAY_NAME,
    api_key:process.env.CLOUDINAY_API_KEY,
    api_secret:process.env.CLOUDINAY_SECRET
});




