// src/app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Next.js의 Link 컴포넌트 임포트
export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 서버에서 상품 데이터 가져오기
    fetch('http://localhost:3002/products') // 서버의 실제 URL로 변경
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('상품 데이터를 가져오는 중 오류가 발생했습니다:', error));
  }, []);

  return (
    <>
      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/product-details/${product.id}`}>
                {/* 클릭했을 때 해당 상품의 ID를 서버로 전달하고, 서버에서는 이 ID를 기반으로 상세 정보를 가져와 응답할 것임 */}
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="product-image"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>가격: {product.price}원</p>
                  <p>가격: {product.id}원</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
