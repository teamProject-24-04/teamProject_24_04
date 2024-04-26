// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams(); // URL에서 productId 가져오기
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      // 서버에서 상세 정보 데이터 가져오기
      fetch(`http://localhost:3002/product-details/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) =>
          console.error('상세 정보 데이터를 가져오는 중 오류가 발생했습니다:', error),
        );
    }
  }, [productId]);

  // productId가 없는 경우에 대한 처리
  if (!productId) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>가격: {product.price}원</p>
      <p>설명: {product.description}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default ProductDetails;
