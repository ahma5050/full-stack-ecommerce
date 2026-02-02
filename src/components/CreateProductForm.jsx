import { motion } from 'framer-motion'
import { Loader, PlusCircle, Upload, Check  } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useProductStore } from '../stores/useProductStore';


const categories = ["jeans", "T-shirts", "shoes", "glasses", "jackets", "bag", "suits"];
const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description:'',
    category: '',
    price: '',
    image: '',
  });

  const {createProduct, loading} = useProductStore();
  console.log(newProduct);
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(newProduct);
  }
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Store the file object directly
    setNewProduct({ ...newProduct, image: file });
  }
};


  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='bg-gray-800 shadow-lg rounded-lg p-8 mt-8 max-w-xl mx-auto'
    >
      <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>CreateProductForm</h2>
      <form onSubmit={handleSubmit} clas sName='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-300'>ProductName</label>
          <input id='name' name='name'type='text' placeholder='Product Name' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          required
          />
        </div>   
        < div>
        <label htmlFor='description' className='block text-sm font-medium text-gray-300 mt-4'>Description</label>
        <textarea id='description' name='description' rows='4' placeholder='Product Description' value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          required />
        </div>
        <div>
          <lable htmlFor='price' className='block text-sm font-medium text-gray-300 mt-4'>Price</lable>
          <input id='price' name='price' step='0.01' type='number' placeholder='Product Price' value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          required />
        </div>
        <div>
          <label htmlFor='category' className='block text-sm font-medium text-gray-300 mt-4'>Category</label>
          <select id='category' name='category' value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          className='mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          required >
            <option value='' disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>   
            ))}
          </select>
        </div>
        <div className='mt-4 flex items-center'>
  <input 
    type='file' 
    id='image' 
    name='image' 
    accept='image/*'
    className='hidden'
    onChange={handleImageChange}
  />
  <label 
    htmlFor='image' 
    className='cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
  >
    <Upload className='w-5 h-5 inline-block mr-2' />
    Upload Image
  </label>
  {newProduct.image && (
    <span className='ml-3 text-sm text-gray-400 truncate max-w-xs'>
      {newProduct.image && <h1 className='text-green-400 font-bold flex'>Image Uploaded . . . </h1>}
    </span>
  )}
</div>

<button
					type='submit'
					className='w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
      </form>
    </motion.div>
  )
}

export default CreateProductForm
