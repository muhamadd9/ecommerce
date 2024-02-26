import React, { useContext } from 'react';
import styles from './Home.module.css';
import { counterContext } from '../../Context/Counter';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import Loader from '../Loader/Loader';
import backGround from '../../Assets/images/light-patten.svg'


export default function Home() {
 let {counter,increase} = useContext(counterContext);
//  console.log(counter);
  return <>
   <Helmet>
       <title>Home</title>
    </Helmet>
    <section className='home' style={{backgroundImage:`url(${backGround})`}}>
    <MainSlider/>
    <CategoriesSlider/>
    <FeaturedProduct/>
    </section>
  </> 
}
