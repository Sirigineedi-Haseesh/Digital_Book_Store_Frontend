import React from 'react';
import './marquee.css';

const Marquee = () => {
  return (
    <div className="marquee">
      <p>
        BUY 3 GET EXTRA <span className='span'>10%</span> OFF! <span className="gap"></span> 
        BUY 5 GET EXTRA <span className='span'>15%</span> OFF! <span className="gap"></span> 
        BUY 10 GET EXTRA <span className='span'>25%</span> OFF! <span className="gap"></span> 
        BUY 20 GET EXTRA <span className='span'>30%</span> OFF!
        
        
      </p>
    </div>
  );
};

export default Marquee;
