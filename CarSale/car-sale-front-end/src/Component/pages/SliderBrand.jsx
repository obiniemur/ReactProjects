import React from "react";

const SliderBrand = (props) => {
  const {brandImg} = props;
  
  return (
    
      <div id={`slide1`} className="carousel-item relative w-full">
        <img src={brandImg} className="w-full max-h-[800px]" />
        
      </div>
      
    
  );
};

export default SliderBrand;
