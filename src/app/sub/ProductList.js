import React, { useState, useEffect } from 'react';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    // 서버에서 상품 데이터 가져오기
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('상품 데이터를 가져오는 중 오류가 발생했습니다:', error));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newCategories) => {
    setSelectedCategory(newCategories);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory.length === 0 || selectedCategory.includes(product.category)),
  );

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
      <ToggleButtonGroup
        value={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="카테고리"
        className="toggle-button-group">
        <ToggleButton value="고기">고기</ToggleButton>
        <ToggleButton value="양념">양념</ToggleButton>
        <ToggleButton value="숯">숯</ToggleButton>
        <ToggleButton value="도구">바베큐 도구</ToggleButton>
      </ToggleButtonGroup>
      <div style={{ marginBottom: '20px' }} />
      <div className="product-list">
        {/* 각 상품을 클릭했을 때 해당 상품의 상세 정보 페이지로 이동할 수 있도록 Link 컴포넌트 사용 */}
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-link">
            <div className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>가격: {product.price}원</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
