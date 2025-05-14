import React from 'react';
import Carousel from '../../Components/Carousel/carousel';
import Category from '../../Components/CategoryBoxes/category';
import './home.css'
import Marquee from '../../Components/Marquee/marquee';
const Home = () => {
  return (
    <div>
      <div className='marq'></div>
      <Marquee/>
      <Carousel />
      <Category/>
    </div>
    
  );
}

export default Home;
