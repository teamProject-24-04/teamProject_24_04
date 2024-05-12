import https from 'https';

export default async function handler(req, res) {
  try {
    const { amount, orderId } = req.body;

    const apiKey = 'test_sk_KNbdOvk5rkj2MPN2BldvVn07xlzm:'; // 여기에 API 키를 넣으세요
    const encodedApiKey = Buffer.from(apiKey).toString('base64'); // API 키를 Base64로 인코딩합니다.

    const data = JSON.stringify({
      paymentKey: encodedApiKey, // Base64로 인코딩된 API 키를 사용합니다.
      amount,
      orderId,
      // 기타 결제 관련 정보
    });

    const options = {
      hostname: 'api.tosspayments.com',
      port: 443,
      path: '/v1/payments',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Basic ${encodedApiKey}` // Authorization 헤더에도 Base64로 인코딩된 API 키를 추가합니다.
      },
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          resolve(responseData);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(data);
      req.end();
    });

    res.status(200).json({ message: 'Payment successful', paymentDetails: JSON.parse(response) });
  } catch (error) {
    console.error('결제 확인 중 오류 발생:', error);
    res.status(500).json({ error: '결제 확인 중 오류 발생' });
  }
}
