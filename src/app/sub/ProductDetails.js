import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // 상품의 ID를 기반으로 API 요청을 보냅니다.
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data); // API로부터 받은 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(); // useEffect에서 호출하는 함수를 정의하고 호출합니다.
  }, [productId]); // productId가 변경될 때마다 useEffect가 다시 실행됩니다.

  return (
    <div>
      {/* product가 로드되면 해당 정보를 표시합니다. */}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>가격: {product.price}</p>
          {/* 기타 상세 정보를 여기에 표시합니다. */}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
