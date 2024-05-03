// ProductPage.js
'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import ProductList from './ProductList';
//ddddd
// ProductDetails 컴포넌트를 동적으로 로드합니다.
const DynamicProductDetails = dynamic(() => import('./ProductDetails'), { ssr: false });

const ProductPage = () => {
  return (
    <div>
      <ProductList />
      <DynamicProductDetails />
    </div>
  );
};

export default ProductPage;
