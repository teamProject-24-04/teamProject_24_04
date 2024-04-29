const express = require('express');
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3002;

// CORS middleware 설정
app.use(cors());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teamProject_24_04',
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 데이터베이스에 연결 중 오류 발생:', err);
    return;
  }
  console.log('MySQL 데이터베이스에 연결됨');
});

// Puppeteer 브라우저 인스턴스 생성
let browser;

// 상품 목록 및 상세 정보 가져오기
app.get('/products', async (req, res) => {
  try {
    // Puppeteer를 사용하여 웹 크롤링 수행
    if (!browser) {
      browser = await puppeteer.launch();
    }

    // 카테고리별 상품 데이터를 담을 배열
    const allProducts = [];

    // 카테고리 URL 배열
    const categoryUrls = [
      'https://m.bbqtown.co.kr/goods/goods_list.php?cateCd=080001',

      // 다른 카테고리 URL들을 추가할 수 있음
    ];

    // 각 카테고리에서 상품 정보를 가져옴
    for (const categoryUrl of categoryUrls) {
      const page = await browser.newPage();
      await page.goto(categoryUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }); // 타임아웃 시간 설정

      // 카테고리 코드를 추출합니다.
      const categoryCode = getCategoryCodeFromUrl(categoryUrl);

      // 상품 정보를 가져오기 위한 CSS 선택자를 지정합니다.
      const productSelector = '.goods_prd_item2';

      // 상품 요소들을 선택합니다.
      const productElements = await page.$$(productSelector);

      // 카테고리별 상품 데이터를 담을 배열
      const products = [];

      // 각 상품의 정보를 추출합니다.
      for (const productElement of productElements) {
        const nameElement = await productElement.$('.prd_name');
        const name = await page.evaluate((element) => element.textContent.trim(), nameElement);

        const priceElement = await productElement.$('.price .c_price');
        const price = await page.evaluate((element) => element.textContent.trim(), priceElement);

        const imageElement = await productElement.$('.goods_prd_img .img_box img');
        let imageURL = await page.evaluate((element) => element.getAttribute('src'), imageElement);

        // 이미지 URL이 상대 경로인 경우 절대 경로로 변경합니다.
        if (!imageURL.startsWith('http')) {
          imageURL = new URL(imageURL, categoryUrl).href;
        }

        // 상품 정보를 배열에 추가합니다.
        products.push({ name, price, imageURL, categoryCode });
      }

      // 현재 카테고리의 상품 데이터를 전체 상품 데이터 배열에 추가합니다.
      allProducts.push(...products);

      // 페이지를 닫습니다.
      await page.close();
    }

    // 상품 데이터베이스에 삽입
    for (const product of allProducts) {
      const { name, price, imageURL, categoryCode } = product;
      // 이미 존재하는 상품인지 확인
      const existingProductQuery = `SELECT * FROM products WHERE name = ${mysql.escape(name)} AND price = ${mysql.escape(price)} AND categoryCode = ${mysql.escape(categoryCode)}`;
      connection.query(existingProductQuery, (err, result) => {
        if (err) {
          console.error('상품 중복 확인 중 오류 발생:', err);
          return;
        }
        if (result.length === 0) {
          // 존재하지 않는 상품일 경우에만 삽입
          const insertProductQuery = `INSERT INTO products (name, price, imageURL, categoryCode) VALUES (${mysql.escape(name)}, ${mysql.escape(price)}, ${mysql.escape(imageURL)}, ${mysql.escape(categoryCode)})`;
          connection.query(insertProductQuery, (err, insertResult) => {
            if (err) {
              console.error('상품 데이터베이스에 삽입 중 오류 발생:', err);
              return;
            }
            console.log('상품 데이터베이스에 상품 삽입됨:', insertResult);

            const productId = insertResult.insertId; // 삽입된 상품의 ID
            // 상품 객체에 ID 추가
            product.id = productId;

            // 모든 상품의 삽입이 완료되면 클라이언트에 응답을 보냄
            if (allProducts.every((product) => product.id)) {
              res.json(allProducts);
            }
          });
        } else {
          // 이미 존재하는 상품일 경우에도 상품 객체에 ID 추가
          const existingProductId = result[0].id;
          product.id = existingProductId;

          // 모든 상품의 삽입이 완료되면 클라이언트에 응답을 보냄
          if (allProducts.every((product) => product.id)) {
            res.json(allProducts);
          }
        }
      });
    }

    // 클라이언트에 상품 데이터 응답
    res.json(allProducts);
  } catch (error) {
    console.error('웹 스크래핑 중 오류 발생:', error);
    res.status(500).json({ error: '웹 스크래핑 중 오류 발생' });
  }
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

// URL에서 카테고리 코드를 추출하여 반환하는 함수
function getCategoryCodeFromUrl(url) {
  // URL에서 카테고리 코드를 추출하기 위한 정규식
  const regex = /cateCd=(\d+)/;
  // 정규식을 사용하여 URL에서 카테고리 코드 추출
  const match = url.match(regex);
  // 추출된 카테고리 코드 반환
  return match ? match[1] : null;
}
