import React, { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {PlusCircle, ShoppingBasket, BarChart} from 'lucide-react'
import CreateProductForm from '../components/CreateProductForm';
import ProductsList from '../components/ProductsList';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { useProductStore } from '../stores/useProductStore';
const tabs = [

  {id:'create', lable:'Create Product', icon:PlusCircle},
  {id:'products', lable:'Products', icon:ShoppingBasket},
  {id:'analytics', lable:'Analytics', icon:BarChart},
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const {fetchAllProducts} = useProductStore();
  useEffect(()=>{
    fetchAllProducts()
  },[fetchAllProducts])
  return (
    <div className='min-h-screen relative overflow-hidden border border-red-400'>
      <div className='relative z-10 container mx-auto px-4 py-16'>
        <motion.h1
        initial={{opacity:0, y:-20}}
        animate={{opacity:1, y:0}}
        transition={{duiration:0.8}}
        >
          AdminDashbord
        </motion.h1>
        <div className='flex justify-center mt-8 gap-4'>
          {tabs.map((tab) => (
            <button key={tab.id}
                onClick={()=>setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            >
              <tab.icon className='w-5 h-5'/>
              {tab.lable}
            </button> 
          ))}
        </div>
        {activeTab === 'create' && <CreateProductForm />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>
    </div>
  )    
}

export default AdminPage
