import React, { useContext } from 'react';
import styles from './ProductDetails.module.css';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  const {addToCart} = useContext(CartContext)

  async function addProductToCart(id){
    let res = await addToCart(id);
    console.log(res);
    if(res.status=="success"){
      toast.success(res.message,{
        position:'bottom-right',
        theme:'dark'
      })
    }
    else{
      toast.error("Failed")
    }
  } 

  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    shidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

 let product =  useParams();
 async function getProductDetails(){
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${product.id}`
    );
  }
  
  const {isError,error ,data ,isLoading} =useQuery('productDetails' ,getProductDetails);
  console.log(data);
  return <>
  <Helmet>
       <title>Product Details</title>
    </Helmet>
    <section className='py-5'>
      {
        isLoading && <Loader/>
      }
    <div className="container my-md-5 py-md-5 ">
      {/* <h2 className='text-main fw-semibold'>Product Details : </h2>   */}
      {
      isError && 
      <div className='alert -alert-danger'>{error.message}</div>
      }

      {
        data?.data.data && <div className="row align-items-center  my-lg-5 position-relative">
        <div className="col-lg-3 mb-5 mb-lg-0">
        <Slider {...settings}>
        {data.data.data.images.map((image)=>(
          <figure>
          <img className='img-fluid' src={image} alt={data.data.data.title} />
          </figure>
        ))}
       </Slider>

         
        </div>
        <div className="col-lg-9 ps-4 ">
          <div className="close position-absolute top-0 end-0 p-4">
            <Link to={"/"}><i className='fa-solid fa-x fa-xl text-main'></i></Link>
          </div>
          <h3 className='fw-bold'>{data.data.data.title}</h3>
          <p className='text-muted'>{data.data.data.description}</p>
          <div className="d-flex justify-content-between  align-items-end mb-2 ">
            <div className="price">
            <h3 className='h6'>{data.data.data.category.name}</h3>
            <h4 className='h6 fw-semibold'>{data.data.data.price} EGP</h4>
            </div>
            <h5 className='h6 fw-semibold'><i className='fa fa-star rating-color'></i>{data.data.data.ratingsAverage}</h5>
            </div>
            <button onClick={()=>addProductToCart(data.data.data.id)} className='btn btn-success bg-main w-100 mb-1 mt-3 fw-semibold'>
            Add To Cart
          </button>
        </div>
      </div>

      }
  
      </div>

    </section>
  </>
}
