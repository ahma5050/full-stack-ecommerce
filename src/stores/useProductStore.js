import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/products', productData, {
      headers: { "Content-Type": "multipart/form-data" },
    } );
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success('Product created successfully');
    } catch (error) {
      set({ loading: false });
      toast.error(error.res.data.error);
      console.log('Error occurred while creating product:', error.message);
    }
  },

fetchAllProducts: async()=>{
    set({loading:true});
    try{
const res=await axios.get('/products')
set({products:res.data.products, loading:false})
console.log('Products fetched:',res.data.products);
    }catch(error){
        set({loading:false, error:'error occurred while fetching products'});
        toast.error(error.res?.data.message || 'error is occured while fetching products');
        
    }
}, 

fetchProductsByCategory: async(category)=>{
    set({loading:true});
    try{
const res=await axios.get(`/products/category/${category}`)
set({products:res?.data?.products, loading:false})
console.log(`Products fetched for category ${category}:`,res.data.products);
    }catch(error){
        set({loading:false, error:'error occurred while fetching products by category'});
        toast.error(error.res?.data.message || 'error is occured while fetching products by category');
}
},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
      console.log('Toggle featured response:', response.data);
			// this will update the isFeatured prop of the product
      //if product._id matches productId
      // { ...product } copies that single object from the array
// isFeatured gets replaced
// the new object goes back into the array in the same position

			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},

  deleteProduct:async(productId)=>{
    set({loading:true});
    try{
      const res= await axios.delete(`/products/${productId}`)
      set((prevProducts)=>({
          products:prevProducts.products.filter((product)=>product._id !== productId),
          loading:false,
      }))
      toast.success('Product deleted successfully');

    }catch(error){
      set({loading:false});
      toast.error(error.response?.data?.error || 'Failed to delete product');
  }
},

}));
