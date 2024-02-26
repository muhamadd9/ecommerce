import React from 'react';
import styles from './NotFound.module.css';
import notfounfImg from '../../Assets/images/error.svg'
export default function NotFound() {
  return <>
    <section className=' my-5 '>
      <div className="container my-5 py-5">
      <img src={notfounfImg} alt="" className='w-100' />
      </div>
    </section>
  </>
}
