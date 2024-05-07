import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const PaymentPage = ({ initialProduct }) => {
  const { id } = useParams();
  const [orderName, setOrderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedProduct) {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product-details?id=${id}`);
      setSelectedProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleOrderNameChange = (e) => {
    setOrderName(e.target.value);
  };

  const handleReceiverNameChange = (e) => {
    setReceiverName(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleOrderMemoChange = (e) => {
    setOrderMemo(e.target.value);
  };

  const handleSubmitPayment = () => {
    console.log('Payment submitted');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const handleAddressChange = (address) => {
    setShippingAddress(address);
    // 여기서 주소를 이용하여 좌표를 가져올 수 있도록 구현하면 됩니다.
  };

  return (
    <div className="order_page">
      <div className="product_info">
        <img src={selectedProduct.imageURL} alt="Product" className="product_image" />
        <p>상품 가격: {selectedProduct.price}원</p>
      </div>
      <div className="order_box">
        <h2 className="order_tit">주문 고객</h2>
        <fieldset>
          <legend>주문 고객 정보</legend>
          <div className="table_box">
            <TextField
              id="orderName"
              label="주문자"
              variant="outlined"
              value={orderName}
              onChange={handleOrderNameChange}
              fullWidth
            />
          </div>
        </fieldset>
      </div>
      <div className="order_box">
        <h2 className="order_tit">배송 정보</h2>
        <fieldset>
          <legend>배송 정보 입력</legend>
          <div className="table_box">
            <TextField
              id="receiverName"
              label="수령인"
              variant="outlined"
              value={receiverName}
              onChange={handleReceiverNameChange}
              fullWidth
            />
            <TextField
              id="shippingAddress"
              label="배송 주소"
              variant="outlined"
              value={shippingAddress}
              onChange={handleShippingAddressChange}
              fullWidth
            />
            {/* 주소 입력 기능 추가 */}
            <AddressFinder handleAddressChange={handleAddressChange} />
          </div>
        </fieldset>
      </div>
      <div className="order_box">
        <h2 className="order_tit">결제</h2>
        <fieldset>
          <legend>추가 정보</legend>
          <TextField
            id="orderMemo"
            label="남기실 말씀"
            variant="outlined"
            value={orderMemo}
            onChange={handleOrderMemoChange}
            fullWidth
          />
          <p>최종 금액: {selectedProduct.price}</p>
        </fieldset>
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleSubmitPayment}>
          결제하기
        </Button>
      </Stack>
    </div>
  );
};

// 주소 입력 컴포넌트
const AddressFinder = ({ handleAddressChange }) => {
  // 주소 입력 상태
  const [address, setAddress] = useState('');

  // 주소 입력 핸들러
  const handleAddressInputChange = (e) => {
    setAddress(e.target.value);
  };

  // 주소 입력 완료 핸들러
  const handleAddressInputComplete = () => {
    // 여기서 주소를 이용하여 좌표를 가져오고, 부모 컴포넌트로 주소 전달
    // 주소를 이용하여 좌표를 가져오는 비동기 함수를 호출하고, 좌표를 가져온 후 handleAddressChange를 호출하여 부모 컴포넌트로 주소 전달
  };

  return (
    <div>
      <TextField
        id="shippingAddress"
        label="배송 주소"
        variant="outlined"
        value={address}
        onChange={handleAddressInputChange}
        fullWidth
      />
      <Button variant="outlined" onClick={handleAddressInputComplete}>
        주소 입력 완료
      </Button>
    </div>
  );
};

export default PaymentPage;
