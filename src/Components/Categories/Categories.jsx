import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import backGround from '../../Assets/images/light-patten.svg'
import { Link } from 'react-router-dom';

export default function Categories() { 

  async function getCategories(){
   return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {isError , error , isLoading , isFetching , data } =  useQuery("FeaturedProducts", getCategories ,{
    refetchOnWindowFocus:false,
    refetchOnReconnect:false ,
   })  
  return <>
   <Helmet>
       <title>Categories</title>
    </Helmet>
    <section className='py-5 ' style={{backgroundImage:`url(${backGround})`}}>
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
      <div className="container p-5 my-5">
        <h2 className='fw-semibold'>Categories</h2>
        <Link to={`/subcategories`} className='text-decoration-none text-black'><p>click <span className='text-main'>here</span> for SubCategories</p></Link>
        <div className="row my-4 gy-4">

        {data?.data.data.map((cat)=>(
          <div className="col-md-4 text-center">
              <div className={`${styles.item} py-3`}>
                <img src={cat.image} style={{height:'350px' ,width:'280px'}} className='img-fluid mb-2' alt={cat.name} />
                <h4 className='fw-semibold my-2 '>{cat.name}</h4>
              </div>
            </div>
        ))}
        </div>
      </div>
    </section>
  </>
}
