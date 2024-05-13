import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io'; // Import IoIosArrowBack

const PaymentPage = ({ initialProduct }) => {
  const { id } = useParams();
  const history = useHistory();
  const [orderName, setOrderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingDetailAddress, setShippingDetailAddress] = useState('');
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  
  const goBack = () => {
    history.goBack();
  };
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

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleReceiverPhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setReceiverPhoneNumber(phoneNumber);
    if (!isValidPhoneNumber(phoneNumber)) {
      // Handle invalid phone number
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

  const handleShippingDetailAddressChange = (e) => {
    setShippingDetailAddress(e.target.value);
  };

  const handleOrderMemoChange = (e) => {
    setOrderMemo(e.target.value);
  };

  const handleSubmitPayment = async () => {
    // 결제 처리 로직
    try {
      // 결제 정보를 생성하고
      // 필요한 정보를 쿼리 문자열로 추가하여 결제 페이지로 이동
      history.push(`/tosspay/`);
    } catch (error) {
      console.error('결제 확인 중 오류 발생:', error);
      history.push('/fail');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

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
    <div className="order_page">
      <div className="product_info">
        <img src={selectedProduct.imageURL} alt="Product" className="product_image" />
        <p>상품 가격: {selectedProduct.price}</p>
       
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
        <h2 className="order_tit">수령인 정보</h2>
        <fieldset>
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
              id="receiverPhoneNumber"
              label="전화번호"
              variant="outlined"
              value={receiverPhoneNumber}
              onChange={handleReceiverPhoneChange}
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
            <TextField
              id="shippingDetailAddress"
              label="상세 주소"
              variant="outlined"
              value={shippingDetailAddress}
              onChange={handleShippingDetailAddressChange}
              fullWidth
            />
          </div>
        </fieldset>
      </div>
      <div className="order_box">
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
         <p style={{ marginTop: '30px' }}>최종 금액: {selectedProduct.price}원</p>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmitPayment}>
              결제하기
            </Button>
          </Stack>
        </fieldset>
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
