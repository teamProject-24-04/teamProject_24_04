import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showImages, setShowImages] = useState(true);
  const imagesRef = useRef(null);
  const [cart, setCart] = useState([]); // State to hold the items in the cart
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/product-details?id=${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  console.log('Product:', product);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  // 카트에 담기
  // addToCart 함수 수정
  const addToCart = async () => {
    try {
      // 장바구니에 추가할 상품 정보
      const newCartItem = {
        productId: product.id,
        quantity: 1,
        product_name: product.name, // 상품 이름 추가
        price: product.price, // 가격 추가
        imageURL: product.imageURL, // 이미지 URL 추가
      };

      // 장바구니에 이미 있는 상품인지 확인
      const existingCartItemIndex = cart.findIndex((item) => item.productId === product.id);

      if (existingCartItemIndex !== -1) {
        // 이미 장바구니에 있는 경우: 수량 증가
        const updatedCart = [...cart];
        updatedCart[existingCartItemIndex].quantity++;
        setCart(updatedCart);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price); // 총 가격 업데이트
      } else {
        // 장바구니에 없는 경우: 새로운 상품 추가
        const response = await axios.post('/api/cartadd', newCartItem);
        console.log(response.data.message); // 상품 추가 성공 메시지 확인
        setCart([...cart, newCartItem]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price); // 총 가격 업데이트
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // 상품을 장바구니에 추가하는 동안 오류가 발생한 경우 처리
    }
  };

  return (
    <div className="product-details">
      <div className="product-card">
        <img
          src={product.imageURL}
          alt={product.name}
          className="product-detailimg"
          style={{ maxWidth: '100%' }}
        />
      </div>
      <div className="detail-font" style={{ marginTop: '20px' }}>
        <h2>{product.name}</h2>
        <p>가격: {product.price}원</p>
      </div>

      {showImages && product.detailImageURL && (
        <div ref={imagesRef} style={{ marginTop: '50px' }}>
          {Array.isArray(product.detailImageURL) ? (
            product.detailImageURL.map((detailImageUrl, index) => (
              <img key={index} src={detailImageUrl} alt={`Detail Image ${index + 1}`} />
            ))
          ) : (
            <img src={product.detailImageURL} alt="Detail Image" />
          )}
        </div>
      )}

      <Stack spacing={2} direction="column" alignItems="center">
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999,
            backgroundColor: 'white',
          }}>
          <Stack spacing={2} direction="row">
            {/* Add to cart button */}
            <Link to="/CartPage">
              <Button
                variant="outlined"
                style={{ width: '180px', height: '40px' }}
                onClick={addToCart}>
                장바구니
              </Button>
            </Link>
            {/* Link to the payment page */}
            <Link to={`/PaymentPage/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" style={{ width: '180px', height: '40px' }}>
                구매하기
              </Button>
            </Link>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default ProductDetails;
