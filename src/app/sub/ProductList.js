import React, { useState, useEffect } from 'react';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Link import 추가
import axios from 'axios';
import './Product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const filteredProducts = products.filter((product) => {
    const isMatchingSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingCategory =
      selectedCategory === '' ||
      product.categoryCode === selectedCategory ||
      selectedCategory.includes(product.categoryCode);
    return isMatchingSearchTerm && isMatchingCategory;
  });

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
        className="toggle-button-group"
        multiple>
        <ToggleButton value="080001" style={{ width: '100px', height: '50px' }}>
          바베큐도구
        </ToggleButton>
        <ToggleButton value="079" style={{ width: '100px', height: '50px' }}>
          시즈닝
        </ToggleButton>
        <ToggleButton value="092" style={{ width: '100px', height: '50px' }}>
          훈화도구
        </ToggleButton>
        <ToggleButton value="078001" style={{ width: '100px', height: '50px' }}>
          화로대
        </ToggleButton>
      </ToggleButtonGroup>
      <div style={{ marginBottom: '20px' }} />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Link to={`/product-details/${product.id}`} key={product.id} className="product-link">
            {' '}
            {/* Link로 감싸기 */}
            <div className="product-card">
              <img
                src={product.imageURL}
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
