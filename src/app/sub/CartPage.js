import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data.cartItems);
        calculateTotalPrice(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    if (cartItems.length === 0) {
      setTotalPrice(0); // 장바구니가 비어 있으면 총 가격을 0으로 설정
      return;
    }

    let total = 0;
    for (const item of cartItems) {
      const price = parseFloat(item.price.replace('원', '').replace(',', '')); // 가격에서 '원'과 ','를 제거하고 수치형으로 변환
      total += price * item.quantity;
    }
    setTotalPrice(total);
  };
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data.cartItems);
      calculateTotalPrice(response.data.cartItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };
  const removeFromCart = async (productId) => {
    try {
      console.log('Product ID:', productId);
      await axios.delete(`/api/cartdelete?productId=${productId}`);
      // 장바구니 아이템이 삭제된 후에만 장바구니 다시 불러오기
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleSubmitPayment = async () => {
    try {
      // 결제 정보를 생성하고
      // 필요한 정보를 쿼리 문자열로 추가하여 결제 페이지로 이동
      history.push(`/tosspay/`);
    } catch (error) {
      console.error('결제 확인 중 오류 발생:', error);
      history.push('/fail');
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
      <div className="cart-container">
        <div className="cart-content">
          <div className="cartbar">
            <h2>장바구니</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {cart.length === 0 ? (
                <p>장바구니가 비어 있습니다.</p>
              ) : (
                <div>
                  {cart.map((item, index) => (
                    <div key={index} style={{ marginBottom: '20px', display: 'flex' }}>
                      <img
                        src={item.imageURL}
                        alt={item.product_name}
                        style={{ width: '80px', height: '80px', marginRight: '20px' }}
                      />
                      <div>
                        <p>{item.product_name}</p>
                        <p>{item.price.toLocaleString()}</p>
                        <p>수량: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.product_id)}>삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-actions">
            <button onClick={handleSubmitPayment}>결제하기</button>
          </div>
          <div className="total-price">
            <p>총 가격: {totalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
