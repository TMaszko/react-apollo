import React, {Component} from 'react';




const Slider = ({images})  => 
    <div className="col-md-12 ProductCardSlider__img">
    {images.map((img, i) => <img key={'ProductCardSlider__img'+i} className='img-responsive col-md-2 ProductCard__img' src={img.src} alt={img.alt}/>)}
    </div>
export default Slider 