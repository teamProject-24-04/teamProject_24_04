// ProductList.js

import React, { useState, useEffect } from 'react';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link'; // Next.js의 Link 컴포넌트 임포트
import './Product.css';
import axios from 'axios';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data); // 수정된 부분: setArticles -> setProducts
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newCategories) => {
    setSelectedCategory(newCategories);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory.length === 0 || selectedCategory.includes(product.category)),
      )
    : [];

  return (
    <div>
      <div className="search-container">
        <TextField
          id="standard-basic"
          label="검색.."
          variant="standard"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          InputProps={{
            endAdornment: <FiSearch className="search-icon" />,
          }}
        />
      </div>
      {/* ToggleButtonGroup 내의 ToggleButton 클릭 시 handleCategoryChange 함수 호출하여 선택된 카테고리를 변경 */}
      <ToggleButtonGroup
        value={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="카테고리"
        className="toggle-button-group">
        {/* 각 카테고리 코드를 value로 설정 */}
        <ToggleButton value="080001">바베큐 고기</ToggleButton>
        <ToggleButton value="080002">시즈닝</ToggleButton>
        <ToggleButton value="080003">숯</ToggleButton>
        <ToggleButton value="080004">바베큐 도구</ToggleButton>
      </ToggleButtonGroup>
      <div style={{ marginBottom: '20px' }} />
      <div className="product-list">
        {/* 각 상품을 클릭했을 때 해당 상품의 상세 정보 페이지로 이동할 수 있도록 Link 컴포넌트 사용 */}
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
