import React, { useState, useEffect } from 'react';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import './Product.css';
import axios from 'axios';
import { IoMdCart } from 'react-icons/io';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmAddToCart = async () => {
    try {
      // 여기에 장바구니에 상품을 추가하는 로직을 추가할 수 있습니다.
      console.log('장바구니에 상품을 추가합니다:', selectedProduct);
      // 장바구니에 상품을 추가한 후 장바구니 페이지로 이동합니다.
      const response = await axios.post('/api/addToCart', selectedProduct);
      console.log('장바구니에 상품 추가 완료:', response.data);
      // 장바구니 페이지로 이동합니다.
      router.push('/cart');
    } catch (error) {
      console.error('장바구니에 상품을 추가하는 중 에러 발생:', error);
    }
  };

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
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.imageURL}
              alt={product.name}
              className="product-image"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
            <div className="product-info">
              <Link href={`/product-details/${product.id}`}>
                <h3>{product.name}</h3>
                <p>가격: {product.price}원</p>
              </Link>
              <div>
                <button onClick={() => handleAddToCart(product)}>
                  <IoMdCart className="cart" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 확인 모달 */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <p>장바구니에 담으시겠습니까?</p>
            <button onClick={handleConfirmAddToCart}>예</button>
            <button onClick={() => setSelectedProduct(null)}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
