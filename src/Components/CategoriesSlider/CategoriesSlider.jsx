import React, { useEffect, useState } from 'react';
import styles from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 8,
    slidesToScroll: 3
  };
  const [categories,setCategories] =useState([]) 
  async function getCategories(){
   let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  //  console.log(data.data);
   setCategories(data.data)
  }

  useEffect(()=>{
    getCategories()
  },[])
  return <>
    <div className="container my-5">
      <h3 className="fw-semibold">Show Popular Categories</h3>
      <Slider {...settings} responsive={[
        {
        breakpoint : 900,
        settings :{
          slidesToShow :4,
          slidesToScroll:2,
        }
        }
      ]}>
      {categories?.map(cat => <div>
        <div className="item px-1">
          <img src={cat.image} className='w-100 ' height={`200`} alt="" />
          <h5>{cat.name}</h5>
        </div>
      </div> )}

      </Slider>
    
    </div>
  </>
}
