import React from 'react';
import styles from './Footer.module.css';
import payment from '../../Assets/images/pay.png'
import google from '../../Assets/images/play.jpg'
import app from '../../Assets/images/app.jpg'

export default function Footer() {
  return <>
  <footer className='bg-black text-white py-5 '>
    <div className="container  py-3">
      <div className="row ">
        <h2 className='h3 fw-semibold mb-2'>Get the FrechCart App</h2>
        <h5 className='h6'>We will send you a link, open it in your phone to downlowad the app</h5>
        <div className="row py-3 px-1 m-0 ">
          <div className="col-md-10">
          <input type="text"className=' form-control' placeholder='Email...' />
          </div>
          <div className="col-md-2">
          <button className='btn bg-main text-white my-3 my-md-0'>Share App Link</button>
          </div>
        </div>
        <div className="row my-2  m-0 d-flex justify-content-between">
          <div className="col-md-6  p-2">
            <h5 >Payment Patterns</h5> 
            <img src={payment} alt="" />
          </div>
          <div className="col-md-6 p-2">
            <h5>Get Delivaries with FreshCart</h5>
            <img src={google} alt="" className='px-md-2' />
            <img src={app} alt="" />
          </div>
        </div>
      </div>
    </div>
  </footer>
  </>
}
