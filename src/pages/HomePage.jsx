import React from 'react'
import { href } from 'react-router-dom'
import CategoryItem from '../components/CategoryItem'

const catagories=[
  {href:'/jeans',name:'Jeans', imageUrl:'/jeans.jpg'},
  {href:'/tshirts', name:'T-sherts', imageUrl:'/tshirts.jpg'},
  {href:'/shoses', name:'shoses', imageUrl:'/shoes.jpg'},
  {href:'/glasses', name:'glasses', imageUrl:'/glasses.png'},
  {href:'/jackets', name:'jackets', imageUrl:'/jackets.jpg'},
  {href:'/suits', name:'Suits', imageUrl:'/suits.jpg'},
  {href:'/bags', name:'Bags', imageUrl:'/bags.jpg'},
]
const HomePage = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
    <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      <h1 className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-4'>Explore Our Categories</h1>
      <p className='text-center text-lg text-gray-300 mb-8'>Discover the latest trends in fashion and accessories</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {catagories.map((category) => (
          <CategoryItem category={category} key={category.name} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default HomePage
