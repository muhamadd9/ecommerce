import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProduct.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

async function getProducts(){
   return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
}
export default function FeaturedProduct() {
  
  const {addToCart} = useContext(CartContext)

  async function addProductToCart(id){
    let res = await addToCart(id);
    console.log(res);
    if(res.status == "success"){
      toast.success(res.message,{
        position:'bottom-right',
        theme:'dark'
      })
    }
    else{
      toast.error("Failed")
    }
  } 

 let {isError , error , isLoading , isFetching , data} =  useQuery("FeaturedProducts", getProducts ,{
  // cacheTime:2000
  // refetchInterval:1000
  // refetchOnMount: 
  refetchOnWindowFocus:false,
  refetchOnReconnect:false ,
  
 })  
//  console.log(data)

  // const [product,setProduct] =useState([]);
  // const [isLoading,setIsLoading] =useState(false);
  // const [error,setError] =useState(null);

  // async function getProducts(){
  //   setIsLoading(true);
  //   await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
  //     console.log(res);
  //     setProduct(res.data.data); 
  //     setIsLoading(false); 
  //     setError(null);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //     setError(err.response.data.message)
  //   });
  // }

  // useEffect(() => {
  //   getProducts();
  // },[])

  return <>
  <div className="section">
      {
        isLoading && (
        <Loader/>
        )
      }
      {
        isError&& (
          <div className="alert alert-danger">
            {error}
          </div>
        )
      }
      {
        data?.data.data && (
          <div className="container px-5 px-md-0">
          <h3 className='fw-bold'>Featured Products</h3>
          <div className="row">
            {data.data.data.map((product) => (
              
          <div key={product.id} className={`col-lg-2 col-md-3 col-sm-6 mb-3 ${styles.items}`}>
            <div className="item py-2">
            <Link to={`/product-details/${product.id}`}>
            <div className={`${styles.itemImage} mb-3`}>
           <img src={product.imageCover} className="img-fluid " alt={product.title} />
           </div>
          <h4 className='fs-6 text-main fw-bold mb-2'>{product.category.name}</h4>
          <h4 className='fs-6 fw-bold mb-2'>{(product.title).split(' ').slice(0,4).join(' ')}</h4>
          <div className="d-flex justify-content-between mb-2">
          <h5 className='h6'>{product.price} EGP</h5>
          <h5 className='h6'><i className='fa fa-star rating-color'></i>{product.ratingsAverage}</h5>
          </div>
            </Link>
          <button onClick={() => addProductToCart(product.id)} className='btn btn-success bg-main w-100 mb-1'>
            Add To Cart
          </button>
            </div>
          </div>
            ))}
          </div>
          </div>
        )
        
      }
    
  </div>
  </>
}
 