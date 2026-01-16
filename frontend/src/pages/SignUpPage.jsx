import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
const SignUpPage = () => {
    const loading=true;
    const [formData, setFormDat]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <div>
      signup page
    </div>
  )
}

export default SignUpPage
