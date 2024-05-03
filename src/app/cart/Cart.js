// pages/cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  // useState와 useEffect 훅을 직접 사용할 수 있습니다
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옵니다
    axios
      .get('/api/cartData')
      .then((response) => {
        setData(response.data);
        setLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정합니다
      })
      .catch((error) => {
        console.error('카트 데이터를 불러오는 중 에러 발생:', error);
        setLoading(false); // 에러가 발생한 경우 로딩 상태를 false로 설정합니다
      });
  }, []); // 마운트될 때 한 번만 실행되도록 빈 의존성 배열을 전달합니다

  return (
    <div>
      {/* 로딩 상태에 따른 조건부 렌더링 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {/* 카트 데이터를 렌더링합니다 */}
          {data && data.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      )}
    </div>
  );
};

export default Cart;
