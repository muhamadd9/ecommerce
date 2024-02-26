import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import backGround from '../../Assets/images/light-patten.svg'
import { Helmet } from 'react-helmet';


export default function AllOrders() {
  const[orders,setOrders]= useState([])
  const token  = localStorage.getItem("userToken"); 
  const {id} = jwtDecode(token); 
  
  async function GetOrders(){
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      if(data?.length){
        setOrders(data); 
        console.log(data);
      }
      else{
         setOrders(null);
       }


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    GetOrders()
  },[])
  return <>
  <Helmet>
       <title>All Orders</title>
    </Helmet>
    <section className='py-5' style={{backgroundImage:`url(${backGround})`}}>
        <div className="container p-5">
          <h2 className='fw-semibold'>MyOrders</h2>

          {orders? orders.map((order)=> (
            <div className="row my-3 p-3 border border-2 rounded-3">
             <div className="details d-flex  justify-content-between">
              <div className="main">
              <h3 className='h6 fw-semibold'>Payment Method :  {order.paymentMethodType}</h3>
              <h3 className='h6 fw-semibold '>Total Order Price :  <span className='text-main'>{order.totalOrderPrice} EGP</span></h3>
              </div>
              <div className="secondary">
                
              {order.shippingAddress &&<h3 className='h6 fw-semibold'>Delivered To :  {order.shippingAddress.city}</h3>}
              </div>
             </div>
              {order.cartItems.map((item)=> (
                <div className='col-md-2  p-0 m-0 my-3 my-md-1 ' >
                <div className="item m-md-1 ">
                <img src={item.product.imageCover} className='img-fluid mb-1' alt="" />
                  <h4 className='fs-6 ps-2 text-main fw-bold mb-2'>{item.product.category.name}</h4>
                  <h4 className='fs-6 ps-2 fw-bold mb-2'>{(item.product.title).split(' ').slice(0,4).join(' ')}</h4>
                </div>
                </div>
              ))}
            </div>
          )):null}
        </div>
    </section>
  </>
}
