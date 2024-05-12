import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // useHistory 추가
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const PaymentPage = ({ initialProduct }) => {
  const { id } = useParams();
  const history = useHistory(); // useHistory 사용
  const [orderName, setOrderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(''); // 새로운 상태 변수
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingDetailAddress, setShippingDetailAddress] = useState('');
  const [orderMemo, setOrderMemo] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const [showNewShippingAddress, setShowNewShippingAddress] = useState(false);
  const memberInfoString = localStorage.getItem('member');
  
  useEffect(() => {
    if (!selectedProduct) {
      fetchProduct();
    }
  }, []);
 

    const storedLoginId = localStorage.getItem('loginId');
    const storedName = localStorage.getItem('name');
    const storedNickname = localStorage.getItem('nickname');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedAddress = localStorage.getItem('address');
    const storedRoadAddress = localStorage.getItem('roadAddress');
    const storedJibunAddress = localStorage.getItem('jibunAddress');
    const storedLatitude = localStorage.getItem('latitude');
    const storedLongitude = localStorage.getItem('longitude');
    const storedDetailAddress = localStorage.getItem('detailAddress');


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

  // 전화번호의 유효성을 검사하는 함수
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  // 전화번호 입력 이벤트 핸들러 함수
  const handleReceiverPhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setReceiverPhoneNumber(phoneNumber);
    // 전화번호의 유효성을 검사하고 필요한 처리를 수행합니다.
    if (!isValidPhoneNumber(phoneNumber)) {
      // 예: 유효하지 않은 전화번호에 대한 처리
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
    try {
      // 클라이언트 키
      const clientKey = 'test_ck_P9BRQmyarYPKP7a7XJnpVJ07KzLN';
  
      // Toss Payments API를 사용하여 결제 인텐트를 생성합니다.
      const response = await axios.post('/api/tosspayment', {
        amount: selectedProduct.price, // Toss Payments는 원 단위로 금액을 요구합니다.
        orderId: selectedProduct.id, // 필요한 경우 주문 ID 또는 식별자를 포함합니다.
        clientKey: clientKey, // 클라이언트 키를 요청에 포함합니다.
        // Toss Payments API에 필요한 기타 매개변수를 추가합니다.
      });
  
      // Toss Payments API로부터의 성공적인 응답을 처리합니다.
      console.log('Toss payment response:', response);
  
      // 위 코드를 아래와 같이 변경하여 직접 HTTPS 요청을 보내도록 합니다.
      const paymentResponse = await axios.post('/api/tosspayment', response.data);
      console.log('Payment response:', paymentResponse);
  
    } catch (error) {
      console.error('결제 확인 중 오류 발생:', error);
      // 결제 실패를 처리합니다.
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
    <div className="order_page">
      <div className="product_info">
        <img src={selectedProduct.imageURL} alt="Product" className="product_image" />
        <p>상품 가격: {selectedProduct.price}원</p>
        <p>상품 가격: {selectedProduct.id}원</p>
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
              value={storedName}
              onChange={handleOrderNameChange}
              fullWidth
            />
          </div>
        </fieldset>
      </div>
      <div className="order_box">
        <h2 className="order_tit">주문자 정보</h2>
        <fieldset>
          <div className="table_box">
            <TextField
              id="receiverName"
              label="수령인"
              variant="outlined"
              value={storedName}
              onChange={handleReceiverNameChange}
              fullWidth
            />
            <TextField
              id="receiverPhoneNumber"
              label="전화번호"
              variant="outlined"
              value={storedPhoneNumber}
              onChange={handleReceiverPhoneChange}
              fullWidth
            />
            <TextField
              id="shippingAddress"
              label="배송 주소"
              variant="outlined"
              value={storedName}
              onChange={handleShippingAddressChange}
              fullWidth
            />
            <TextField
              id="shippingDetailAddress"
              label="상세 주소"
              variant="outlined"
              value={storedDetailAddress}
              onChange={handleShippingDetailAddressChange}
              fullWidth
            />
          </div>
        </fieldset>
      </div>
      {/* 새로운 배송 정보 입력란 */}
      <div className="order_box">
        <h2 className="order_tit">배송 정보 </h2>
        <fieldset>
          <div className="table_box">
            <TextField
              id="newReceiverPhoneNumber"
              label="새로운 전화번호"
              variant="outlined"
              value={receiverPhoneNumber}
              onChange={handleReceiverPhoneChange}
              fullWidth
            />
            <TextField
              id="newShippingAddress"
              label="새로운 배송 주소"
              variant="outlined"
              value={shippingAddress}
              onChange={handleShippingAddressChange}
              fullWidth
            />
            <TextField
              id="newShippingDetailAddress"
              label="새로운 상세 주소"
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
  );
};

export default PaymentPage;
