import React from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  return <>
    <div  className={`d-flex justify-content-center align-items-center bg-dark vh-100 w-100 position-fixed start-0 end-0 top-0 bottom-0 ${styles.loading}`}> 
    <span className={`${styles.loader}`}></span>
    </div>
  </>
}
