import React from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import Category from '../../Components/CategoryBoxes/Category';
import './Home.css'
import Marquee from '../../Components/Marquee/Marquee';
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
