import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>가격: {product.price}원</p>
      <p>설명: {product.description}</p>
      {/* Add more details here as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductDetails;
