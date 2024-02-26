import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

 let navigate = useNavigate ()
 const [errorMessage,setErrorMessage] =useState(""); 
 const [isLoading,setisLoading] =useState(false); 

 async function callRegister(callBody){
   setErrorMessage("");
   setisLoading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,callBody)
   .catch(err =>{
     setisLoading(false);    
    setErrorMessage(err.response.data.message);
  })
   console.log(data);
   if(data.message === "success"){
    navigate('/login')
   }
  }
  const validationSchema = Yup.object({          //Validation schema for YUP
    name: Yup.string().min(5,"name is short").max(20,"name is long").required("Name is required"),
      email:Yup.string().email("Email Not Valid").required("Email is Required"),
      password:Yup.string().required('Password Rquired').min(8,"password is short"),
      rePassword:Yup.string().required("Is required").oneOf([Yup.ref('password')]," should match Password"),
      phone:Yup.string().matches(/^01[0125][0-9]{8}/,"Phone Number should start with 01 and contain 9 numbers")
  })

 const registerForm = useFormik({
    initialValues:{
      name: "",
      email:"@gmail.com",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema : validationSchema ,
    onSubmit:callRegister
    
  })
  return <>
    <Helmet>
       <title>Register</title>
    </Helmet>
    <section className='py-5'>
    <div className="container p-5 my-4">
    <div className="row px-md-5 py-4 mx-md-5 ">
    <h2 className='mb-3 fw-semibold'>Register Now : </h2>
    {errorMessage? <div className="alert alert-danger">{errorMessage}</div>:null}
      <form onSubmit={registerForm.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="FullName" className='mb-1'>Full Name</label>
          <input type="text" id='FullName' name='name' value={registerForm.values.name} className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.name && registerForm.touched.name ? <div className='alert alert-danger my-2'> {registerForm.errors.name} </div> :null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="Email" className='mb-1'>Email</label>
          <input type="email" id='Email' name='email' value={registerForm.values.email} className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.email && registerForm.touched.email ? <div className='alert alert-danger my-2'> {registerForm.errors.email} </div> :null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password" className='mb-1'>Password</label>
          <input type="password" id='password' name='password' value={registerForm.values.password} className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.password && registerForm.touched.password ? <div className='alert alert-danger my-2'> {registerForm.errors.password} </div> :null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="rePassword" className='mb-1'>RePassword</label>
          <input type="password" id='rePassword' name='rePassword' value={registerForm.values.rePassword} className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger my-2'> {registerForm.errors.rePassword} </div> :null}        
        </div>
        <div className="form-group mb-4">
          <label htmlFor="phone" className='mb-1'>Phone</label>
          <input type="tel" id='phone' name='phone' value={registerForm.values.phone} className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
          {registerForm.errors.phone && registerForm.touched.phone ? <div className='alert alert-danger my-2'> {registerForm.errors.phone} </div> :null}
        </div>

        <div className="div d-flex justify-content-between">
          <p>Already have account? <Link className="text-decoration-none" to={'/login'}> login Now</Link></p>
        <button className='btn bg-main text-white d-block ms-auto' disabled={!(registerForm.isValid && registerForm.dirty)}>
        {isLoading? <i className='fa fa-spinner fa-spin'></i>: 'Register'}
        </button>
        </div>
      </form>
    </div>
    </div>
    </section>
  </>
}
