import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { TokenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';

export default function Login() {
 let navigate = useNavigate ()
 const [errorMessage,setErrorMessage] =useState(""); 
 const [isLoading,setisLoading] =useState(false); 

 let {setToken} = useContext(TokenContext);

 async function callLogin(callBody){
   setErrorMessage("");
   setisLoading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,callBody)
   .catch(err =>{
     setisLoading(false);    
    setErrorMessage(err.response.data.message);
  })
   
   if(data.message ==="success"){
    localStorage.setItem("userToken",data.token)
    setToken(data.token);
    navigate('/')
   }
  }
  const validationSchema = Yup.object({          //Validation schema for YUP
      email:Yup.string().email("Email Not Valid").required("Email is Required"),
      password:Yup.string().required('Password Rquired'),

  })

 const loginForm = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema : validationSchema ,
    onSubmit:callLogin
    
  })
  return <>
  <section className='py-5' >

     <Helmet>
       <title>Login</title>
    </Helmet>
    <div className="container p-5 my-5">
    <div className="row px-md-5 py-5 my-5  mx-md-5 ">
    <h2 className='mb-3 fw-semibold'>Login : </h2>
    {errorMessage? <div className="alert alert-danger">{errorMessage}</div>:null}
      <form onSubmit={loginForm.handleSubmit}>

        <div className="form-group mb-2">
          <label htmlFor="Email" className='mb-1'>Email</label>
          <input type="email" id='Email' name='email' value={loginForm.values.email} className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
          {loginForm.errors.email && loginForm.touched.email ? <div className='alert alert-danger my-2'> {loginForm.errors.email} </div> :null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password" className='mb-1'>Password</label>
          <input type="password" id='password' name='password' value={loginForm.values.password} className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
          {loginForm.errors.password && loginForm.touched.password ? <div className='alert alert-danger my-2'> {loginForm.errors.password} </div> :null}
        </div>
        <div className="div d-flex justify-content-between">
          <p>Don't have an account? <Link className="text-decoration-none" to={'/register'}> register Now</Link></p>
        <button className='btn bg-main text-white '>
        {isLoading? <i className='fa fa-spinner fa-spin'></i>: 'Login'}
        </button>
        </div>
        
      </form>
    </div>
    </div>
  </section>
  </>
}
