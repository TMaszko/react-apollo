import React from 'react';


const QuantityCounter = ({quantity , handleIncrement, handleDecrement}) => 
    (<div className="QuantityBtn">
        <div onClick={handleDecrement} className="col-md-2 btn-primary decrement">{'-'}</div>
        <div className="col-md-3 quantity">{quantity}</div>
        <div onClick={handleIncrement} className="col-md-2 increment">{'+'}</div>
    </div>)





export default QuantityCounter