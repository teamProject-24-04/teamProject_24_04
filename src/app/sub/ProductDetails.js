import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 훅 사용
import axios from 'axios';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Next.js에서 query parameter 가져오기
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // 서버에서 상세 정보 데이터 가져오기
      axios
        .get(`/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error('상세 정보 데이터를 가져오는 중 오류가 발생했습니다:', error);
        });
    }
  }, [id]);

  // productId가 없는 경우에 대한 처리
  if (!id) {
    return <div>Loading...</div>;
  }

  // 상품 정보가 없을 경우
  if (!product) {
    return (
      <div>
        <h2>상품 정보 없음</h2>
        <p>해당 상품의 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 상품 정보가 있는 경우
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
