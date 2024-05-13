import { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

export default function Page() {
  useEffect(() => {
    const handleClick = async () => {
      const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);

      await tossPayments.requestPayment('카드', {
        amount: 10000, // 결제 금액 (예: 10000원)
        orderId: 'your-order-id', // 주문 ID (고유한 값으로 대체해야 함)
        orderName: '상품 이름', // 상품 이름
        successUrl: `${window.location.origin}/api/tosspayments`,
        failUrl: `${window.location.origin}/api/tosspayments/fail`,
      });
    };

    // Check if window object is defined (client-side)
    if (typeof window !== 'undefined') {
      handleClick(); // 페이지 로드시 결제창을 열도록 호출
    }
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return <div>Loading...</div>; // 페이지 로드 중임을 표시하는 로딩 메시지
}
