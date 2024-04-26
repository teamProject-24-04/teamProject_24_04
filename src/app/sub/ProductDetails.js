import React, { useState, useEffect } from 'react';

const ProductDetails = ({ match }) => {
  const productId = match.params.productId; // URL에서 productId 가져오기
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 서버에서 상세 정보 데이터 가져오기
    fetch(`http://localhost:3002/product-details/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error('상세 정보 데이터를 가져오는 중 오류가 발생했습니다:', error),
      );
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
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
