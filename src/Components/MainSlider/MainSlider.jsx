import React from 'react';
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    shidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <div className="container py-4 my-5">
      <div className="row pt-4">
        <div className="col-md-8 pe-1">


        <Slider {...settings}>
          <figure>
          <img src={img3} style={{height:'500px' , width:'100%'}} alt="" />
          </figure>
          <figure>
          <img src={img1} style={{height:'500px' , width:'100%'}} alt="" />
          </figure>
          <figure>
          <img src={img2} style={{height:'500px' , width:'100%'}} alt="" />
          </figure>
       </Slider>

        </div>
        <div className="col-md-4 ps-1">
          <img src={img1} style={{height:'250px' , width:'100%'}} alt="" />
          <img src={img2} style={{height:'250px' , width:'100%'}} alt="" />
        </div>
      </div>
    </div>
  );
}


