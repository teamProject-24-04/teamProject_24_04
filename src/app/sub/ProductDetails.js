import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CartPage from './CartPage'; // CartPage 컴포넌트를 import
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showImages, setShowImages] = useState(true);
  const imagesRef = useRef(null);
  const [cart, setCart] = useState([]); // State to hold the items in the cart
  const [review, setReview] = useState('');
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0); // setTotalPrice 함수 추

  const goBack = () => {
    history.goBack();
  };

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

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      // 서버로 리뷰 데이터 전송
      const response = await axios.post('/api/product/review', {
        productId: id,
        review: review,
      });
      console.log('Review submitted:', response.data);
      // 성공 시 리뷰 입력 창 초기화
      setReview('');
      // 여기에서 필요한 추가 작업을 수행할 수 있습니다. 예를 들어, 사용자에게 성공 메시지를 표시하거나, 리뷰 목록을 업데이트할 수 있습니다.
    } catch (error) {
      console.error('Error submitting review:', error);
      // 실패 시 에러 메시지 표시 또는 기타 처리
    }
  };
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
    <>
    <div
      style={{
        position: 'fixed',
        left: '20px',
        zIndex: '999',
        width: '100%',
        background: 'white',
      }}>
      <IoIosArrowBack style={{ fontSize: '30px', cursor: 'pointer' }} onClick={goBack} />
    </div>
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
        <p>가격: {product.price}</p>
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

      <Box mt={4}>
        <TextField
          label="리뷰 작성"
          multiline
          rows={4}
          value={review}
          onChange={handleReviewChange}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSubmitReview}
          style={{ marginTop: '10px' }}
        >
          리뷰 제출
        </Button>
      </Box>

      <Stack spacing={2} direction="column" alignItems="center">
        <div
          style={{
            position: 'fixed',
            bottom: 60,
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
    </>
  );
};

export default ProductDetails;
