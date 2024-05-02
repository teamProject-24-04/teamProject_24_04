// ProductPage.js
'use client';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

const ProductPage = () => {
  return (
    <div>
      <h1></h1>
      <ProductList />
    </div>
  );
};

export default ProductPage;
