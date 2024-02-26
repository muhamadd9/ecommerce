import React from 'react';
import styles from './SubCategories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import backGround from '../../Assets/images/light-patten.svg'
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function SubCategories() {

  async function getSubCategories(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
   }
 
   let {isError , error , isLoading , isFetching , data } =  useQuery("FeaturedProducts", getSubCategories ,{
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
        <h2 className='fw-semibold'>Sub Categories</h2>
        <div className="row my-4 gy-4">

        {data?.data.data.map((cat)=>(
          <div className="col-md-4 text-center">
              <div className={`${styles.item} py-3`}>
                <h4 className='fw-semibold my-2 '>{cat.name}</h4>
              </div>
            </div>
        ))}
        </div>
      </div>
    </section>
  </>
}
