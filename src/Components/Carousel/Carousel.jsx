import React, { useEffect } from 'react';
import './Carousel.css';
import temp1 from '../../assets/temp1.png';
import temp2 from '../../assets/temp2.png';

const Carousel = () => {
  useEffect(() => {
    let myIndex = 0;
    let timeoutId;

    const carousel = () => {
      const slides = document.getElementsByClassName('mySlides');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      myIndex++;
      if (myIndex > slides.length) { myIndex = 1; }
      slides[myIndex - 1].style.display = 'block';
      timeoutId = setTimeout(carousel, 5000); 
    };
    carousel();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="carousel-content" style={{ maxWidth: '500px' }}>
      <img className="mySlides" src={temp1} style={{ width: '100vw', height:'' }} alt="temp1" />
      <img className="mySlides" src={temp2} style={{ width: '100vw' }} alt="temp2" />
    </div>
  );
};

export default Carousel;
