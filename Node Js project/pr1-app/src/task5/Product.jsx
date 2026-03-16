import React from 'react';

function Product({ title, price }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{price} тг</p>
    </div>
  )
}

export default Product
